import React, { Component } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Footer extends Component {
    render() {
        return (
            <Wrapper>
                <p>Made with 💖 in Hanover, Germany. </p>
            </Wrapper>
        )
    }
}

export default Footer;