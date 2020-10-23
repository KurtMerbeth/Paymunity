 
import React from 'react';
import Web3 from 'web3'

import styled from 'styled-components'

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin: 0 30px;
`

const Label = styled.label`
  margin: 5px;
`

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`



class Pay extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        recipient: '', 
        amount: ''
      }
  }

  handleChangeRecipientAddress = async event => {
    const recipient = event.target.value
    this.setState({ recipient})
  }

  handleChangeAmount = async event => {
    const amount = event.target.value
    this.setState({ amount})
  }


  sendTransaction = async (event) => {

    event.preventDefault()
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
    
    const { recipient, amount } = this.state

    return (
      <Wrapper>
        <center>
          <Title>Send Moneyz</Title>

          <Label>Address: </Label>
          <InputText
            name='recipient'
            type="text"
            value={recipient}
            onChange={this.handleChangeRecipientAddress}
          />

          <Label>Amount: </Label>
          <InputText
            name='amount'
            type="number"
            value={amount}
            onChange={this.handleChangeAmount}
          /> 

          <Button onClick={this.sendTransaction}>Send</Button>
        </center>
      </Wrapper>
    );
  }
}
export default Pay;