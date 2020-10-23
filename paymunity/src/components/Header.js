import React, { Component } from 'react'
import logo from '../media/logo.png'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Header extends Component {
    render() {
        return (
            <Wrapper>
                <center>
                    <img src={logo} width="261" height="84" alt="logo :)" />
                </center>
            </Wrapper>
        )
    }
}

export default Header;