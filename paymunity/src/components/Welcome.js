 
import React from 'react';

class Welcome extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount = () => {
    this.props.walletConnect();
  }
  render() {
    return (
      <div>
        <center>
          <h5> Welcome </h5>
            
        </center>
      </div>
    );
  }
}
export default Welcome;