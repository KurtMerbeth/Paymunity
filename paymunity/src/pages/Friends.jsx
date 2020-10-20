import React, { Component } from 'react'
import styled from 'styled-components'


const Wrapper = styled.a.attrs({
    className: 'friends-list',
})``



class Friends extends Component {
    render() {
        return (
            <Wrapper>
                Friends List! 
            </Wrapper>
        )
    }
}

export default Friends