import React from 'react';


class UserMenu extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        account: 'undefined'
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
            <button onClick={this.props.showUserMain}>User main</button>
            <br />
            <p>
                account: {this.props.account}
                <br />
                balance: {this.props.balance}
            </p>
        </center>
      </div>
    );
  }
}
export default UserMenu;
