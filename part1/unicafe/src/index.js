import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css';

const Statistics = ({name, stats}) =>
  <div>
    <h1>{name}</h1>
    <p>{stats[0].name} {stats[0].clicks}</p>
    <p>{stats[1].name} {stats[1].clicks}</p>
    <p>{stats[2].name} {stats[2].clicks}</p>
    <p>{stats[3].name} {stats[3].clicks}</p>
    <p>{stats[4].name} {stats[4].clicks}</p>
    <p>{stats[5].name} {stats[5].clicks}</p>
  </div>

function App() {
  const [clicks, setClicks] = useState({ left: 0, middle: 0, right: 0, all: 0 })
  const handleLeftClick = () => { setClicks({...clicks, left: clicks.left + 1, all: clicks.all + 1 }) }
  const handleMiddleClick = () => { setClicks({...clicks, middle: clicks.middle + 1, all: clicks.all + 1 }) }
  const handleRightClick = () => { setClicks({...clicks, right: clicks.right + 1, all: clicks.all + 1 }) }

  const statistics = {
    name: 'statistics',
    stats: [
      {
        name: 'good',
        clicks: clicks.left
      },
      {
        name: 'neutral',
        clicks: clicks.middle
      },      
      {
        name: 'bad',
        clicks: clicks.right
      },      
      {
        name: 'all',
        clicks: clicks.all
      },      
      {
        name: 'average',
        clicks: ((1 * clicks.left) + 0 + (-1 * clicks.middle)) / clicks.all
      },
      {
        name: 'positive',
        clicks: clicks.right / clicks.all + '%'
      }
    ]
  }

  return (
    <div>
      <div>
        <h1> give feedback </h1>
        <div>
          <button onClick={handleLeftClick}>good</button> 
          <button onClick={handleMiddleClick}>neutral</button> 
          <button onClick={handleRightClick}>bad</button> 

        </div>
      </div>

      <Statistics name={statistics.name} stats={statistics.stats}/>

    </div>      
  );

}

ReactDOM.render(<App />, document.getElementById('root'))