import React from 'react';
import Web3 from "web3";

class UserMain extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        recipient: 'recipient address 0x12345...',
        amount: 0.00
      }
  }
  
  recipientHandler = (event) => {
    this.setState({recipient: event.target.value})
  }
  amountHandler = (event) => {
    this.setState({amount: event.target.value})
  }

  onClickHandlerSend = async (event) => {
    event.preventDefault();
    this.props.sendButton(this.state);
  }


  render() {
    return (
      <div>
        <center>
            <button onClick={this.props.showUserMenu}>User menu</button>
            <br />
            <br />
            recipient: <p> <input type="text" name="recipient" value={this.state.recipient} onChange={this.recipientHandler} /> </p>
            amount: <p> <input type="text" name="amount" value={this.state.amount} onChange={this.amountHandler} /> </p>
            <br />
            <button onClick={this.onClickHandlerSend}>send</button>
            <p>
                account: {this.props.account}
                <br />
                balance: {this.props.balance} ETH
            </p>
        </center>
      </div>
    );
  }
}
export default UserMain;
