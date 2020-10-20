import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../media/paymunity.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="localhost:3000">
                <img src={logo} width="261" height="84" alt="logo :)" />
            </Wrapper>
        )
    }
}

export default Logo