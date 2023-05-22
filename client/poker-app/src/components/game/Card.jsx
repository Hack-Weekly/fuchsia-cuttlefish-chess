import styled from 'styled-components';
import {BsSuitHeartFill, BsSuitDiamondFill, BsSuitSpadeFill, BsSuitClubFill} from 'react-icons/bs'


function Card({suit, rank}) {

  return (
    <CardContainer>
        <CornerContainer>
            <Rank suit={suit}>
                {rank===1 && 'A'}
                {rank>1 && rank<11 && rank}
                {rank===11 && 'J'}
                {rank===12 && 'Q'}
                {rank===13 && 'K'}
            </Rank>
            <Suit suit={suit}>
                {suit==='H'&&<BsSuitHeartFill size={13}/>}
                {suit==='D'&&<BsSuitDiamondFill size={13}/>}
                {suit==='S'&&<BsSuitSpadeFill size={13}/>}
                {suit==='C'&&<BsSuitClubFill size={13}/>}
            </Suit>
        </CornerContainer>

        <CenterContainer>
            <LargeSuit suit={suit}>
                {suit==='H'&&<BsSuitHeartFill size={35}/>}
                {suit==='D'&&<BsSuitDiamondFill size={35}/>}
                {suit==='S'&&<BsSuitSpadeFill size={35}/>}
                {suit==='C'&&<BsSuitClubFill size={35}/>}
            </LargeSuit>
        </CenterContainer>

        <BottomCorner>
            <Rank suit={suit}>
                {rank===1 && 'A'}
                {rank>1 && rank<11 && rank}
                {rank===11 && 'J'}
                {rank===12 && 'Q'}
                {rank===13 && 'K'}
            </Rank>
            <Suit suit={suit}>
                {suit==='H'&&<BsSuitHeartFill size={13}/>}
                {suit==='D'&&<BsSuitDiamondFill size={13}/>}
                {suit==='S'&&<BsSuitSpadeFill size={13}/>}
                {suit==='C'&&<BsSuitClubFill size={13}/>}
            </Suit>
        </BottomCorner>
    </CardContainer>
  )
}

export default Card

const CardContainer = styled.div`
height: 105px;
width: 75px;
display: grid;

border-radius: 5px;
background-color: white;
grid-template-columns: 15% 70% 15%;
grid-template-rows: 10% 80% 10%;
padding: 5px;
`

const CornerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const CenterContainer = styled.div`
grid-column: 2/3;
grid-row: 2/3;
display: flex;
flex-direction: column;
font-size: 25px;
align-items: center;
justify-content: center;
`
const Rank = styled.div`
color: ${props => props.suit===('H' || 'D') ? 'red' : 'black'};
height: 15px;
`
const Suit = styled.div`
color: ${props => props.suit===('H' || 'D') ? 'red' : 'black'};
height: 15px;
`
const LargeSuit = styled.div`
color: ${props => props.suit===('H' || 'D') ? 'red' : 'black'};
height: 25px;
`

const BottomCorner = styled.div`
grid-column: 3/4;
grid-row: 3/4;
-moz-transform: scale(-1, -1);
-webkit-transform: scale(-1, -1);
-o-transform: scale(-1, -1);
-ms-transform: scale(-1, -1);
transform: scale(-1, -1);
`