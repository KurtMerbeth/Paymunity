import React from 'react';
import Web3 from "web3";

class UserMain extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        recipient: '',
        amount: 0.00,
        addressInfo: '',
        amountInfo: ''
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
    if(Web3.utils.isAddress(this.state.recipient) && (this.state.amount > 0 && this.state.amount < this.props.balance)) {
      this.setState({addressInfo: '', amountInfo: ''})
      this.props.sendButton(this.state);
    } else {
      if(!Web3.utils.isAddress(this.state.recipient)) this.setState({addressInfo: 'address invalid'});
      if(this.state.amount <= 0) this.setState({amountInfo: 'amount too low'});
      if(this.state.amount > this.props.balance) this.setState({amountInfo: 'unsifficient funds'});
    }
    
    
  }


  render() {
    return (
      <div>
        <center>
            <br />
            <br />
            recipient: <input type="text" name="recipient" value={this.state.recipient} onChange={this.recipientHandler} /> 
            <br />
            {this.state.addressInfo}
            <br />
            amount: <input type="text" name="amount" value={this.state.amount} onChange={this.amountHandler} /> 
            <br />
            {this.state.amountInfo}
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
