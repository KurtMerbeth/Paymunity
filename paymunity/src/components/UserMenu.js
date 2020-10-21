import React from 'react';


class UserMenu extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        accountAddress: 'undefined', 
        accountBalance: 'undefined'
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

  handleChangeAccount = async event => {
    const account = event.target.value
    this.setState({account})
  }

  componentDidMount = async () => {

    const accountAddress = this.props.account
    const accountBalance = this.props.accountBalance

    this.setState({
      accountAddress: accountAddress, 
      accountBalance: accountBalance
    })
  }


  render() {

    const {accountAddress, accountBalance} = this.state

    return (
      <div>
        <center>
            {/*<button onClick={this.props.showUserMain}>User main</button>
            <br />
            <p>
                Address: {accountAddress}
                <br />
                Balance: {accountBalance}
            </p>*/}
            Hallo hier ist das User Menu. 
        </center>
      </div>
    );
  }
}
export default UserMenu;
