import styled from 'styled-components';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';


function PlayerCards(cards) {

  return (
    <CardsContainer>
        {cards.cards.card1.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card1.suit} rank={cards.cards.card1.rank}/>}
        {cards.cards.card2.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card2.suit} rank={cards.cards.card2.rank}/>}
    </CardsContainer>
  )
}

export default PlayerCards

const CardsContainer = styled.div`
display: flex;
gap: 5px
`