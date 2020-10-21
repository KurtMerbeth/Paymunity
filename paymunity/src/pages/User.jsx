import React, { Component } from 'react'

import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`


class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      account: 'undefined', 
      balance: 'undefined'
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

    const account = this.props.account
    const balance = this.props.balance

    this.setState({
      account: account, 
      balance: balance
    })
  }

  render() {
    const { account, balance} = this.state

    return (
      <Wrapper>
          Hier ist der User Bereich! 
        <p>Account: {account}</p>
        <p>Balance: {balance}</p>
      </Wrapper>

    )
  }

}

export default User