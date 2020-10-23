import React, { Component } from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Header extends Component {
    render() {
        return (
            <Wrapper>
                <p>This is the Header. Do we even need this? </p>
            </Wrapper>
        )
    }
}

export default Header;