import React, { Component } from 'react'

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
            account: 'undefined',
            balance: 'undefined'
          }
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
        await this.setState({web3: new Web3(provider)});
    
        await this.state.web3.eth.getAccounts((error, accounts) => {
          if (accounts.length === 0) {
            console.log("no active accounts");
            // there is no active accounts
            this.setState({account: accounts[0]})
          } else {
            // after login, setState account, isLoggedIn and load actual balance
            console.log("account found");
            this.setState({account: accounts[0], isLoggedIn: true});
            console.log("account: "+this.props.account);
            this.loadBalance();
          }
        });
      }
    
      /*
       * load actual balance (eth) in wei and convert in eth
       * save balance in eth to state
       */
      loadBalance = async () => {
        console.log("loadBalance();")
        this.state.web3.eth.getBalance(this.state.account)
        .then((_balance) => {
          this.setState({balance: Math.floor(Web3.utils.fromWei(_balance, 'ether')*10000)/10000});
          console.log("balance: "+this.state.balance)
       })
     }
    
      /*
       * UserMain sendButton magic
       */
      sendButton = async (sendData) => {
         console.log("sendButton();"); 
         console.log("recipient: "+sendData.recipient);
         console.log("amount"+sendData.amount);
    
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
          await this.setState({web3: window.web3});
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
              this.setState({account: accounts[0], isLoggedIn: true});
              console.log(this.state.account);
              this.loadBalance();
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

