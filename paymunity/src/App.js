import React, {Component} from 'react';

import Web3 from "web3";
import { DAI_ADDRESS, ERC20ABI } from "./utils/const";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Header from "./components/Header"
import Welcome from "./components/Welcome"
import Pay from "./components/Pay"
import CurrentBalance from './components/CurrentBalance'

import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {

  constructor() {
    super();
      this.state = {
        isLoggedIn: false,
        showLogin: true,
        showPay: false,
        showCurrentBalance: false,
        daiToken: 'undefined',
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
    const provider = await new WalletConnectProvider({
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
    await this.setState({web3: await new Web3(provider)});

    await this.state.web3.eth.getAccounts((error, accounts) => {
      if (accounts.length === 0) {
        console.log("no active accounts");
        // there is no active accounts
      } else {
        // after login, setState account, isLoggedIn and load actual balance
        console.log("account found");
        this.setState({account: accounts[0], isLoggedIn: true});
        console.log("account: "+this.state.account);
        this.afterLogin();
      }
    });
  }

  initDai = async () => {
    this.setState({daiToken: new this.state.web3.eth.Contract(ERC20ABI, DAI_ADDRESS)});
  }

  afterLogin = () => {
    this.initDai();
    this.setState({showLogin: false, showPay: true, showCurrentBalance: true});
  }

  loadCurrentBalance = async () => {
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


  render() {
    return (
      <div className="App">
        <div class="header">
          <Header />
        </div>
        <div class="body">
          <br /> 
          {(!this.state.isLoggedIn && this.state.showLogin) && <Welcome walletConnect={this.walletConnect} />}
          {(this.state.isLoggedIn && this.state.showPay) && <Pay transferDai={this.transferDai} balance={this.state.balance}/>}
          {(this.state.isLoggedIn && this.state.showCurrentBalance) && <CurrentBalance loadCurrentBalance={this.loadCurrentBalance} balance={this.state.balance} />}
        </div>
      </div>
    );
  }
}


export default App;