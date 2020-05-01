import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css';

// Statistic component
const Statistic =({text, value}) => {
  return (
    <p>{text}: {value}</p>
  )
}
// Statistics component
const Statistics = ({name, stats, count}) => {
  if (count !== 0) {
    return ( 
      <div>
        <h1>{name}</h1>
        <Statistic text={stats[0].name} value={stats[0].clicks}/>
        <Statistic text={stats[1].name} value={stats[1].clicks}/>
        <Statistic text={stats[2].name} value={stats[2].clicks}/>
        <Statistic text={stats[3].name} value={stats[3].clicks}/>
        <Statistic text={stats[4].name} value={stats[4].clicks}/>
        <Statistic text={stats[5].name} value={stats[5].clicks}/>
      </div>
    )    
  }
  else {
    return (
      <div> 
        <h1>statistics</h1>
        <p>No feedback given</p>      
      </div>
    )
  }
}

// Button component
const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

function App() {
  // Hook
  const [clicks, setClicks] = useState({ left: 0, middle: 0, right: 0, all: 0 })
  
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
          <Button name="good" handleClick={() => { setClicks({...clicks, left: clicks.left + 1, all: clicks.all + 1 }) }}/>
          <Button name="neutral" handleClick={() => { setClicks({...clicks, middle: clicks.middle + 1, all: clicks.all + 1 }) }}/>
          <Button name="bad" handleClick={() => { setClicks({...clicks, right: clicks.right + 1, all: clicks.all + 1 }) }}/>
        </div>
      </div>

      <Statistics name={statistics.name} stats={statistics.stats} count={clicks.all}/>

    </div>      
  );

}

ReactDOM.render(<App />, document.getElementById('root'))