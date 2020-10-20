import React, { Component } from 'react'

import styled from 'styled-components'

const Wrapper = styled.a.attrs({
    className: 'settings',
})``


class Settings extends Component {
    render() {
        return (
            <Wrapper>
                Settings! 
            </Wrapper>
        )
    }
}

export default Settings