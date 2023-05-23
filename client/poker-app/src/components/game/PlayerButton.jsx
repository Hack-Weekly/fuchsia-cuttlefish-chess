import styled from 'styled-components';


function PlayerButton({type}) {

  return (
    <ButtonContainer>
        {type}
    </ButtonContainer>
  )
}

export default PlayerButton

const ButtonContainer = styled.button`
width: 75px;
border-radius: 5px;
padding: 5px;
`