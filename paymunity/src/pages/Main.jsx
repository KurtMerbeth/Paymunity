import React, { Component } from 'react'

import Connect from './Connect'

import styled from 'styled-components'


const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

class Main extends Component {

  render() {

    return (
      <Wrapper>
        <Connect/>
      </Wrapper>

    )
  }

}

export default Main

