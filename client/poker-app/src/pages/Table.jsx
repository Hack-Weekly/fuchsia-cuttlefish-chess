import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { TiArrowBackOutline } from 'react-icons/ti'
import CommunityCards from '../components/game/CommunityCards';
import { useEffect, useState } from 'react';
import PlayerCards from '../components/game/PlayerCards';
import Opponent from '../components/game/Opponent';
import PlayerButton from '../components/game/PlayerButton';

function InsideRoom() {

  const [ws, setWs] = useState(null);
  const [communityCards, setCommunityCards] = useState(preFlop);
  const [playerCards, setPlayerCards] = useState(preDeal);
  const [pot, setPot] = useState(0);
  const [playerCash, setPlayerCash] = useState(0);

  // TESTING
  function buttonMethod() {
    ws.send("action")
  }

  const reset = ()=>{
    setPlayerCards(preDeal);
    setCommunityCards(preFlop)
  }
  const deal = ()=>{
    setPlayerCards(postDeal);
  }
  const dealFlop = ()=>{
    setCommunityCards(flop);
  }
  const dealTurn = ()=>{
    setCommunityCards(turn);
  }
  const dealRiver = ()=>{
    setCommunityCards(river);
  }
  useEffect(() => {
    const wsInstance = new WebSocket("ws://localhost:3000");

    wsInstance.onopen = () => {
      console.log('Connected to the WebSocket server.');
    };

    wsInstance.onclose = (event) => {
      console.log('Disconnected from the WebSocket server.');
      if(event.code === 1000) {
        alert("Poker Table is full!")
      }
    };

    wsInstance.onmessage = (event) => {
      let jsonObj = JSON.parse(event.data);
      let objPot = jsonObj.pot;
      const objRiver = {
        card1 : {suit:"", rank:0},
        card2 : {suit:"", rank:0},
        card3 : {suit:"", rank:0},
        card4 : {suit:"", rank:0},
        card5 : {suit:"", rank:0},
      };
      for (let i = 1; i <= jsonObj.river.length; i++) {
        console.log((jsonObj.river[i]))
        if (jsonObj.river[i].suit !== "") {
          objRiver[`card${i}`].suit = jsonObj.river[i].suit;
          objRiver[`card${i}`].rank = jsonObj.river[i].rank;
        }
      }
      // jsonObj.river.forEach(card => {
      //   if (card.suit !== "") {
      //     objRiver.push(card);
      //   } else {
      //     objRiver.push({suit:"", rank:0})
      //   }
      // })
      // objRiver = {
      //   card1 : {suit:"S", rank:2},
      //   card2 : {suit:"S", rank:3},
      //   card3 : {suit:"C", rank:5},
      //   card4 : {suit:"", rank:0},
      //   card5 : {suit:"", rank:0},
      // };
      let objPlayer;
      jsonObj.players.forEach(el => {
        if (el.hand[0] !== null && el.hand[1] !== null) {
          setPlayerCards(el.hand)
          setPlayerCards({
            card1: {suit:"C", rank:12},
            card2: {suit:"C", rank:12}
          })
        }
      })
      objPlayer = {
          card1: {suit:"C", rank:12},
          card2: {suit:"C", rank:11}
      };

      console.log("objPot is ", objPot);
      console.log("objPlayer is ", objPlayer);
      console.log("objRiver is ", objRiver);

      setPot(objPot);
      setPlayerCards(objPlayer);
      setCommunityCards(objRiver);

      // console.log(jsonObj);
      // setCommunityCards(jsonObj.river);
      // setCommunityCards({
      //   cards: {
      //     card1: {suit:"C", rank:12},
      //     card2: {suit:"C", rank:12},
      //     card3: {suit:"S", rank:2},
      //     card4: {suit:"S", rank:3},
      //     card5: {suit:"S", rank:4},
      //   }
      // });
      // jsonObj.players.forEach(el => {
      //   setPlayerCards({
      //     cards: {
      //       card1: {suit:"C", rank:12},
      //       card2: {suit:"C", rank:12}
      //     }
      //   })
        // if (el.hand[0] !== null && el.hand[1] !== null) {
        //   setPlayerCards(el.hand)
        //   setPlayerCards({
        //     cards: {
        //       card1: {suit:"C", rank:12},
        //       card2: {suit:"C", rank:12}
        //     }
        //   })
        // }
      // })
      // setPot(jsonObj.pot);
    }

    wsInstance.onerror = (error) => {
      console.error('WebSocket encountered an error:', error);
    };

    return () => {
      if (wsInstance) {
        wsInstance.close();
        console.log('WebSocket connection closed.');
      }
    };
  }, []);

  const opponentStatus = {
    fold:"fold",
    waiting:"waiting",
    thinking:"thinking",
    bet:"bet",
    raise:"raise",
    call:"call"
  }

  const opponentChips = 5000;

  const betAmount = 50;

  //TESTING


  return (
    <GameContainer>
        <QuitLink to={`/`}><TiArrowBackOutline size={20}/>Leave Table</QuitLink>
        <FeltContainer>
            <OponentContainer column="1/2" row="2/4"><Opponent status={opponentStatus.fold} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <OponentContainer column="2/3" row="1/3"><Opponent status={opponentStatus.fold} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <OponentContainer column="3/5" row="1/2"><Opponent status={opponentStatus.bet} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <OponentContainer column="5/7" row="1/2"><Opponent status={opponentStatus.call} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <OponentContainer column="7/8" row="1/3"><Opponent status={opponentStatus.thinking} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <OponentContainer column="8/9" row="2/4"><Opponent status={opponentStatus.waiting} chips={opponentChips} betAmount={betAmount}/></OponentContainer>
            <RiverContainer>
              <CommunityCards cards = {communityCards}/>
              <Pot>${pot}</Pot>
            </RiverContainer>
            <PlayerContainer>
              <CardsAndControls>
                <PlayerCards cards = {playerCards}/>
                <PlayerControls>
                  <PlayerButton type={"Raise"}/>
                  <PlayerButton type={"Call"}/>
                  <PlayerButton type={"Fold"}/>
                </PlayerControls>
              </CardsAndControls>
              <PlayerCash>${playerCash}</PlayerCash>
            </PlayerContainer>
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

const OponentContainer = styled.div`
grid-column: ${props => props.column};
grid-row: ${props => props.row};
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const RiverContainer = styled.div`
grid-column: 3/7;
grid-row: 2/4;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
`

const Pot = styled.div`
`
const PlayerCash = styled.div`
`

const PlayerContainer = styled.div`
grid-column: 1/9;
grid-row: 4/5;
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5px;
`

const CardsAndControls = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 5px;
`

const PlayerControls = styled.div`
grid-column: 3/4;
grid-row: 1/2;
display: flex;
flex-direction: column;
gap: 5px;
`

const TestButtons = styled.div`
display: flex;
gap: 5px;
`

const QuitLink  = styled(Link)`
align-self: start;
justify-selft: start;
display: flex;
align-items: center;
text-decoration: none;
`

export default InsideRoom

const preDeal = {
  card1 : {suit:"", rank:0},
  card2 : {suit:"", rank:0},
}
const postDeal = {
  card1 : {suit:"", rank:0},
  card2 : {suit:"", rank:0},
}

const preFlop = {
  card1 : {suit:"", rank:0},
  card2 : {suit:"", rank:0},
  card3 : {suit:"", rank:0},
  card4 : {suit:"", rank:0},
  card5 : {suit:"", rank:0},
}

const flop = {
  card1 : {suit:"H", rank:1},
  card2 : {suit:"C", rank:12},
  card3 : {suit:"S", rank:13},
  card4 : {suit:"", rank:0},
  card5 : {suit:"", rank:0},
}

const turn = {
  card1 : {suit:"H", rank:1},
  card2 : {suit:"C", rank:12},
  card3 : {suit:"S", rank:13},
  card4 : {suit:"D", rank:11},
  card5 : {suit:"", rank:0},
}

const river = {
  card1 : {suit:"H", rank:1},
  card2 : {suit:"C", rank:12},
  card3 : {suit:"S", rank:13},
  card4 : {suit:"D", rank:11},
  card5 : {suit:"H", rank:2},
}