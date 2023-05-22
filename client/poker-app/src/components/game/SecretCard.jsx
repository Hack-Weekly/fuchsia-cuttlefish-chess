import styled from 'styled-components';


function SecretCard({top}) {

  return (
    <CardContainer top={false}>
      <CardContainer top={true}>
    </CardContainer>
    </CardContainer>
  )
}

export default SecretCard

const CardContainer = styled.div`
position: ${props => props.top===true ? "absolute" : "relative"}; 

z-index: ${props => props.top===true ? "3" : "1"}; 
margin-left: ${props => props.top===true ? "10px" : "0"};
margin-top: ${props => props.top===true ? "5px" : "0"};

height: 42px;
width: 30px;
display: grid;

border-radius: 5px;
background-color: white;
grid-template-columns: 15% 70% 15%;
grid-template-rows: 10% 80% 10%;
padding: 5px;
background-color: #000000;
opacity: 1;
background-image:  linear-gradient(30deg, #ff0000 12%, transparent 12.5%, transparent 87%, #ff0000 87.5%, #ff0000), linear-gradient(150deg, #ff0000 12%, transparent 12.5%, transparent 87%, #ff0000 87.5%, #ff0000), linear-gradient(30deg, #ff0000 12%, transparent 12.5%, transparent 87%, #ff0000 87.5%, #ff0000), linear-gradient(150deg, #ff0000 12%, transparent 12.5%, transparent 87%, #ff0000 87.5%, #ff0000), linear-gradient(60deg, #ff000077 25%, transparent 25.5%, transparent 75%, #ff000077 75%, #ff000077), linear-gradient(60deg, #ff000077 25%, transparent 25.5%, transparent 75%, #ff000077 75%, #ff000077);
background-size: 24px 42px;
background-position: 0 0, 0 0, 12px 21px, 12px 21px, 0 0, 12px 21px;
border: solid;
border-color: white;
`