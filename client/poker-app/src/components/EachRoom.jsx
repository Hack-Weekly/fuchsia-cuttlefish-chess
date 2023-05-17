import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

{/* 
 const fetchRepos = async () => {
            try {
                const promises = githubAccounts.map((account) =>
                    fetch(repoBaseURL + account + "/repos").then((response) => response.json())
                );
                const responses = await Promise.all(promises);
                console.log(responses)
                const data = responses.flatMap((d) => d);
                const results = data.flatMap((entry: any) => {
                    const entryProject = new Project(entry["name"],
                    entry["description"], entry["html_url"],
                    `https://github.com/`, [``]);
                    console.log(entryProject.getProjectDescription())
                    return entryProject
                });
                console.log(results);
                setResults(results);
            } catch (error) {
                console.log("Error: " + error)
            }
        };
        fetchRepos();
    }, [])
    return(


      setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return ( <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
            <ProjectsCardContainer>
                {projects.map((project) => {
                    return <Card project={project}></Card>
                })}
            </ProjectsCardContainer>
        )}
      </div>)
}
*/}

function EachRoom({name, currentPlayers, max, gameid}) {
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
        {pCount === 8 ? (<Full>Full</Full>) : (<Join>Join</Join>)}
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
width: 30%;
margin: 0 12px;
background-color: red;
`
const Join = styled(Full)`
background-color: green;
`