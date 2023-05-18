import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'


function EachRoom({name, currentPlayers, max, gameid, roomNum}) {

  const [pCount, setPCount] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
        name: name,
        currentPlayers: currentPlayers,
        max: max,
        gameid: gameid,
    })
    setPCount(currentPlayers);
  }, [])

  //FROM server /game {name, currentplayers, max, gameid}
  return (
    <RowHolder>
        <RoomName>Room Name</RoomName>
        <PlayerCounts>{pCount} / {data && data.max ? (<span>{data.max}</span>) : ("Loading")}</PlayerCounts>
        {pCount === 8 ? (<Full>Full</Full>) : (
            <JoinLink to={`/room${roomNum}`}>
                <Join>
                    Join
                </Join>
            </JoinLink>
        )}
    </RowHolder>
  )
}

export default EachRoom

const RoomName = styled.div`
width: 35%`

const PlayerCounts = styled.div`
width: 35%`

const RowHolder = styled.div`
display: flex;
justify-contents: center;
align-items: center;
margin: 1rem;`

const Full = styled.button`
width: 70%;
margin: 0 12px;
background-color: red;
`
const Join = styled(Full)`
background-color: green;
width: 100%;
`

const JoinLink = styled(Link)`
color:white;
text-decoration: none;
&:hover,
&:focus{
   color: blue;
}
&:active{
   color: red;
};`