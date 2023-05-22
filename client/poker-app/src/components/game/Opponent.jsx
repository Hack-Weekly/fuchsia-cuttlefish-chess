import styled from 'styled-components';
import SecretCard from './SecretCard';


function Opponent({status, chips, betAmount}) {

  return (
    <OpponentContainer>
        <OpponentHand>
            {status!=="fold" && <SecretCard/>}
            {status==="fold" && <EmptyHand/>}
        </OpponentHand>
        <OpponentInfo>
            <OpponentChips>
                ${chips}
            </OpponentChips>
            <StatusTag status={status}>{status}</StatusTag>
        </OpponentInfo>
        <OpponentBet>
                {(status==="bet" || status==="call") && "+$"+betAmount}
            </OpponentBet>
    </OpponentContainer>
  )
}

export default Opponent

const OpponentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const OpponentHand = styled.div`
display: flex;
margin-bottom: 15px;
`
const EmptyHand = styled.div`
height: 55px
`;

const OpponentInfo = styled.div`
padding: 5px;
background-color: rgba(167, 167, 167, 0.6);
border-radius: 10px;
`

const OpponentChips = styled.div`
color: black;
`

const OpponentBet = styled.div`
color: green;
`

const StatusTag = styled.div`
color: ${props => props.status==="fold" ? "black" : props => props.status==="waiting" ? "yellow" : props => props.status==="bet" ? "blue" : "green"};
`