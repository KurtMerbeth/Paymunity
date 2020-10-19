import React from 'react';

class Login extends React.Component {

  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div>
        <center>
          <h5> Login: </h5>
            <button onClick={this.props.walletConnect}>Connect Wallet</button>
        </center>
      </div>
    );
  }
}
export default Login;
