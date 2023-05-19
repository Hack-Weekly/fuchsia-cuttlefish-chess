import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { TiArrowBackOutline } from 'react-icons/ti'

function InsideRoom() {
  return (
    <GameContainer>
        <QuitLink to={`/`}><TiArrowBackOutline size={20}/>Leave Table</QuitLink>
        <FeltContainer>
            <OpenentContainer column="1/2" row="2/4">Oponent 1</OpenentContainer>
            <OpenentContainer column="2/3" row="1/3">Oponent 2</OpenentContainer>
            <OpenentContainer column="3/5" row="1/2">Oponent 3</OpenentContainer>
            <OpenentContainer column="5/7" row="1/2">Oponent 4</OpenentContainer>
            <OpenentContainer column="7/8" row="1/3">Oponent 5</OpenentContainer>
            <OpenentContainer column="8/9" row="2/4">Oponent 6</OpenentContainer>
            <PlayerContainer>Player</PlayerContainer>
        </FeltContainer>
    </GameContainer>
  )
}

const GameContainer = styled.div`
width: 100%;
height: 100;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const FeltContainer = styled.div`
width: 1000px;
height 600px;
background-color: #285c24;
border-radius: 1000px 1000px 180px 180px;
display: grid;
grid-template-columns: repeat(8, 1fr);
grid-template-rows: repeat(3, 1fr) 30%;
`;

const OpenentContainer = styled.div`
grid-column: ${props => props.column};
grid-row: ${props => props.row};
border: solid;
background-color: rgba(248, 20, 20, 0.43);
display: flex;
align-items: center;
justify-content: center;
`

const PlayerContainer = styled.div`
grid-column: 1/9;
grid-row: 4/5;
background-color: rgba(20, 248, 25, 0.43);
border: solid;
display: flex;
align-items: center;
justify-content: center;
`

const QuitLink  = styled(Link)`
align-self: start;
justify-selft: start;
display: flex;
align-items: center;
color: black;
`

export default InsideRoom