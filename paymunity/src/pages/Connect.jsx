import React, { Component } from 'react'
import {DAI_ADDRESS, ERC20ABI, PMT_ADDRESS, PMT_ABI} from '../utils/const'
import Biconomy from "@biconomy/mexa";
import events from "events";
import {toBuffer} from "ethereumjs-util";
import abi from "ethereumjs-abi";

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import UserMain from '../components/UserMain'
import Login from '../components/Login'
import Test from '../components/Test'

import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Connect extends Component {

    constructor() {
        super();
          this.state = {
            isLoggedIn: false,
            test: true,
            web3: 'undefined',
            biconomy: 'undefined',
            daiToken: 'undefined',
            account: 'undefined',
            balance: 'undefined'
          }
        this.getBalance = this.getBalance.bind(this);
      }
    
      /*
       * Web3 Login with
       * WalletConnect
       */
    
      walletConnect = async () => {
        console.log("walletConnect();")
        const provider = new WalletConnectProvider({
          infuraId: "15119f0f05bd45cd859eb838c7041e43", // Required
          rpc: {
            3: "https://ropsten-rpc.linkpool.io/"
          },
          qrcodeModalOptions: {
            mobileLinks: [
              "rainbow",
              "metamask",
              "argent",
              "trust",
              "imtoken",
              "pillar"
            ]
          }
        });
    
        await provider.enable();
        const biconomy = new Biconomy(provider,{apiKey: "W7sBykeYY.01629976-02e3-467a-aae8-343dcd1df9a4"})
        await this.setState({web3: new Web3(biconomy)});
        biconomy.onEvent(biconomy.READY, async () => {

          await this.state.web3.eth.getAccounts((error, accounts) => {
            if (accounts.length === 0) {
              console.log("no active accounts");
              // there is no active accounts
              this.setState({account: accounts[0]})
            } else {
              // after login, setState account, isLoggedIn and load actual balance
              console.log("account found");
              this.setState({account: accounts[0]});
              console.log("account: "+this.props.account);
              this.afterLogin();
            }
          });
        }).onEvent(biconomy.ERROR, (error, message) => {
          // Handle error while initializing mexa
          console.log("biconomy error:")
          console.log(message)
        });

      }
      afterLogin = async () => {
        await this.initDai();
        await this.getBalance();
        this.setState({isLoggedIn: true});
      }


      initDai = async () => {
        this.setState({daiToken: new this.state.web3.eth.Contract(PMT_ABI, PMT_ADDRESS)});
      }

      /*
       * load actual balance (DAI) in wei and convert in DAI
       * save balance in eth to state
       */
      getBalance = async () => {
        let balance = '0.00';
        console.log("loadBalance();")
        await this.state.daiToken.methods.balanceOf(this.state.account).call(function(err, res) {
          if (err) {
              console.log("An error occured", err);
              balance = 'error';
              return
          }
          balance = res;
          console.log("The balance is: ",balance)
          
      })
      this.setState({balance: Math.floor(Web3.utils.fromWei(balance, 'ether')*10000)/10000})
      console.log(this.state.balance)
       /* // get eth balance
        this.state.web3.eth.getBalance(this.state.account)
        .then((_balance) => {
          this.setState({balance: Math.floor(Web3.utils.fromWei(_balance, 'ether')*10000)/10000});
          console.log("balance: "+this.state.balance)
       }) */
     }
     
     metaTransferDai = async (recipient, amount) => {
      let functionSignature = this.state.daiToken.methods.transfer(recipient, Web3.utils.toWei(amount)).encodeABI();
      this.executeMetaTransaciton(this.state.account, functionSignature, this.state.daiToken, PMT_ADDRESS, "4")
      /*result.on("transactionHash", (hash)=>{
        console.log("transaction hash: "+hash)
      }).once("confirmation", (confirmation, recipet) => {
        console.log("confirmation: "+confirmation+" recipet: "+recipet)
      }).on("error", (error)=>{
        console.log(error);
      })   */
     }

     transferDai = async (recipient, amount) => {
      console.log("transferDai()");
      console.log("to: "+recipient);
      console.log("amount: "+amount);
      const wei = Web3.utils.toWei(amount);
      console.log("in Wei: "+wei )
      this.state.daiToken.methods.transfer(recipient, wei).send({from: this.state.account}, function(err, res) {
        if (err) {
            console.log("An error occured", err);
            return
        }
        console.log("Hash of the transaction: " + res)
    })
     }


     /*
      * Biconomy Meta Transactions
      * Begin:
      */

     getSignatureParameters = async (signature) => {
      if (!this.state.web3.utils.isHexStrict(signature)) {
        throw new Error(
          'Given value "'.concat(signature, '" is not a valid hex string.')
        );
      }
      var r = signature.slice(0, 66);
      var s = "0x".concat(signature.slice(66, 130));
      var v = "0x".concat(signature.slice(130, 132));
      v = this.state.web3.utils.hexToNumber(v);
      if (![27, 28].includes(v)) v += 27;
      return {
        r: r,
        s: s,
        v: v
      };
    };
    
    constructMetaTransactionMessage = async (nonce, chainId, functionSignature, contractAddress) => {
      return abi.soliditySHA3(
          ["uint256","address","uint256","bytes"],
          [nonce, contractAddress, chainId, toBuffer(functionSignature)]
      );
    }

      executeMetaTransaciton = async (userAddress, functionSignature, contract, contractAddress, chainId) => {
          var eventEmitter = new events.EventEmitter();
          if(contract && userAddress && functionSignature, chainId, contractAddress) {
            let nonce = await this.state.daiToken.methods.getNonce(userAddress).call();
            let messageToSign = this.constructMetaTransactionMessage(nonce, chainId, functionSignature, contractAddress);

            const signature = await this.state.web3.eth.personal.sign(
              "0x" + messageToSign.toString("hex"),
              userAddress
            );

            console.info(`User signature is ${signature}`);
            let { r, s, v } = this.getSignatureParameters(signature);

            console.log("before transaction listener");
            // No need to calculate gas limit or gas price here
            /*let transactionListener = */contract.methods.executeMetaTransaction(userAddress, functionSignature, r, s, v).send({
                from: userAddress
            });
/*
            transactionListener.on("transactionHash", (hash)=>{
              eventEmitter.emit("transactionHash", hash);
            }).once("confirmation", (confirmation, recipet) => {
              eventEmitter.emit("confirmation", confirmation, recipet);
            }).on("error", error => {
              eventEmitter.emit("error", error);
            });

            return eventEmitter;
          */          } else {
            console.log("All params userAddress, functionSignature, chainId, contract address and contract object are mandatory");
          }
        }

        

      /*
      * Biconomy Meta Transactions
      * END
      */


      /*
       * UserMain sendButton magic
       */
      sendButton = async (sendData) => {
         console.log("sendButton();"); 
         console.log("recipient: "+sendData.recipient);
         console.log("amount: "+sendData.amount);
        this.metaTransferDai(sendData.recipient, sendData.amount);
         /*
      this.state.web3.eth.sendTransaction({
          from: this.state.account,
          to: sendData.recipient,
          value: Web3.utils.toWei(sendData.amount)
      })
      .on('transactionHash', function(hash){
          console.log(("transactionHash: "));
          console.log(hash);
      })
      .on('receipt', function(receipt){
        console.log(("receipt: "));
        console.log(receipt);
      })
      .on('confirmation', function(confirmationNumber, receipt){ 
        console.log("confirmation");
        console.log("confirmationNumber: "+confirmationNumber);
        console.log("receipt: "+receipt)
      })
      .on('error', console.error); // If a out of gas error, the second parameter is the receipt.
    */
    
      }






    
      /*
       * for testing only:
       * metamask button for browser connection
       */
      metamaskButton = async () => {
        if (typeof web3 !== 'undefined') {
          console.log("web3 !== undefined");
          window.web3 = new Web3(window.web3.currentProvider)
    
      // Metamask connection
        if (window.web3.currentProvider.isMetaMask === true) {
     
          await window.ethereum.enable();
          const biconomy = new Biconomy(window.ethereum,{apiKey: "W7sBykeYY.01629976-02e3-467a-aae8-343dcd1df9a4"})
          await this.setState({web3: new Web3(biconomy)});
      

         // await this.setState({web3: window.web3});
          console.log("web3: ");
          console.log(this.state.web3);
          window.web3.eth.getAccounts((error, accounts) => {
            if (accounts.length === 0) {
              console.log("no active accounts");
              // there is no active accounts in MetaMask
              this.setState({account: accounts[0]})
            } else {
              // it's ok
              console.log("ok");
              this.setState({account: accounts[0]});
              console.log(this.state.account);
              this.afterLogin();
            }
          });
    
          // for other providers
        } else {
          console.log("other web3 provider");
          // Another web3 provider
        }
        } else {
        alert("Please install browser wallet. e.g. metamask")
        console.log("no web3 provider");
        // No web 3 provider
        }
      }

  render() {

    return (
      <Wrapper>
        {!this.state.isLoggedIn && <Login walletConnect={this.walletConnect} />}
        {this.state.isLoggedIn && <UserMain sendButton={this.sendButton} web3={this.state.web3} account={this.state.account} balance={this.state.balance}/>}
        {this.state.test && <Test metamaskButton={this.metamaskButton} />}
      </Wrapper>

    )
  }

}

export default Connect

