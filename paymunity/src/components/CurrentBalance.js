import React from 'react';

class CurrentBalance extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount = async () => {
    this.props.loadCurrentBalance();
  }

  render() {
    return (
      <div>
        <center>
        <p>{this.props.balance} DAI</p>
        </center>
      </div>
    );
  }
}
export default CurrentBalance;