import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RoomsShown from './components/RoomsShown'
import styled from 'styled-components'

function App() {
  

  return (
    <>
      <MainContent>
        <RN>Room Name</RN>
        <P>Players</P>
        <RoomsHolder><RoomsShown /></RoomsHolder>
      </MainContent>
    </>
  )
}
export default App

const RN = styled.div`
margin: 1rem;
font-size: 1.25em;
font-weight: 600;
`

const P = styled(RN)`
`

const MainContent = styled.div`
background: black;
display: grid;
grid-template-columns: 35% 35% 30%;
grid-template-rows: 20% 80%;
min-width: 500px;
min-height: 400px;
`

const RoomsHolder = styled.div`
grid-column: 1 / 4;
grid-row: 2 / 3;
`