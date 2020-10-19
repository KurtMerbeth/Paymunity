import React from 'react';

class Test extends React.Component {

  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div>
        <center>
          <br /> <br /> <br /> <br />
          <hr></hr>
          <h5> for testing only</h5>
            <button onClick={this.props.test} >TEST</button>
            <p></p>
            <button onClick={this.props.metamaskButton}>Metamask</button>
        </center>
      </div>
    );
  }
}
export default Test;
