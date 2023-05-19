import styled from 'styled-components';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';


function CommunityCards(cards) {

  return (
    <CardsContainer>
        {cards.cards.card1.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card1.suit} rank={cards.cards.card1.rank}/>}
        {cards.cards.card2.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card2.suit} rank={cards.cards.card2.rank}/>}
        {cards.cards.card3.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card3.suit} rank={cards.cards.card3.rank}/>}
        {cards.cards.card4.suit === "" ? <CardPlaceholder/> : <Card suit={cards.cards.card4.suit} rank={cards.cards.card4.rank}/>}
        {cards.cards.card5.suit === "" ? <CardPlaceholder/> :<Card suit={cards.cards.card5.suit} rank={cards.cards.card5.rank}/>}
    </CardsContainer>
  )
}

export default CommunityCards

const CardsContainer = styled.div`
display: flex;
gap: 5px
`