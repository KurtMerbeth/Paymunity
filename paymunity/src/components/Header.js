import React from 'react';
import logo from '../media/paymunity.png';
import '../App.css';

class Header extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div class="header">
      <center>
          <img src={logo} alt="logo" />
      </center>
      </div>
    );
  }
}
export default Header;