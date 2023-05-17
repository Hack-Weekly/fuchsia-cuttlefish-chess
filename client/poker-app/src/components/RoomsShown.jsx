import React from 'react'
import EachRoom from './EachRoom'


const randomSet1 = {
    name: "Welcome All",
    currentPlayers: 5,
    max: 8,
    gameid: 1234,
}

const randomSet2 = {
    name: "Second Room",
    currentPlayers: 2,
    max: 6,
    gameid: 5678,
}

export default function RoomsShown() {
  return (
    <div>

        <EachRoom
            name={randomSet1.name}
            currentPlayers={randomSet1.currentPlayers}
            max={randomSet1.max}
            gameid={randomSet1.gameid}
        />
        <EachRoom
            name={randomSet1.name}
            currentPlayers={randomSet1.currentPlayers}
            max={randomSet1.max}
            gameid={randomSet1.gameid}
        />
        <EachRoom
            name={randomSet2.name}
            currentPlayers={randomSet2.currentPlayers}
            max={randomSet2.max}
            gameid={randomSet2.gameid}
        />
        <EachRoom
            name={randomSet2.name}
            currentPlayers={randomSet2.currentPlayers}
            max={randomSet2.max}
            gameid={randomSet2.gameid}
        />
        <EachRoom
            name={randomSet1.name}
            currentPlayers={randomSet1.currentPlayers}
            max={randomSet1.max}
            gameid={randomSet1.gameid}
        />
    </div>
  )
}
