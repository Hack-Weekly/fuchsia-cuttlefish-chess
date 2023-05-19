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

const randomSet3 = {
    name: "Second Room",
    currentPlayers: 8,
    max: 8,
    gameid: 6969,
}

export default function RoomsShown() {
  return (
    <div>
        <EachRoom
            name={randomSet1.name}
            currentPlayers={randomSet1.currentPlayers}
            max={randomSet1.max}
            gameid={randomSet1.gameid}
            roomNum={1}
            
        />
        <EachRoom
            name={randomSet1.name}
            currentPlayers={randomSet1.currentPlayers}
            max={randomSet1.max}
            gameid={randomSet1.gameid}
            roomNum={2}
        />
        <EachRoom
            name={randomSet2.name}
            currentPlayers={randomSet2.currentPlayers}
            max={randomSet2.max}
            gameid={randomSet2.gameid}
            roomNum={3}
        />
        <EachRoom
            name={randomSet2.name}
            currentPlayers={randomSet2.currentPlayers}
            max={randomSet2.max}
            gameid={randomSet2.gameid}
            roomNum={4}
        />
        <EachRoom
            name={randomSet3.name}
            currentPlayers={randomSet3.currentPlayers}
            max={randomSet3.max}
            gameid={randomSet3.gameid}
            roomNum={5}
            
        />
    </div>
  )
}
