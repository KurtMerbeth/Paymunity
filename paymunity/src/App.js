import React, {Component} from 'react';

import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Welcome from "./components/Welcome"

class App extends Component {

  constructor() {
    super();
      this.state = {
        isLoggedIn: false,
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
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div class="header">
        </div>
        <div class="body">
          <br /> 
          {<Welcome walletConnect={this.walletConnect} />}
        </div>
      </div>
    );
  }
}


export default App;