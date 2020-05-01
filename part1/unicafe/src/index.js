import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css';

function App() {
  const [clicks, setClicks] = useState({
    left: 0, middle: 0, right: 0, all: 0
  })

  const handleLeftClick = () => { setClicks({...clicks, left: clicks.left + 1, all: clicks.all + 1 }) }
  const handleMiddleClick = () => { setClicks({...clicks, middle: clicks.middle + 1, all: clicks.all + 1 }) }
  const handleRightClick = () => { setClicks({...clicks, right: clicks.right + 1, all: clicks.all + 1 }) }

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

      <div>
        <h1> statistics </h1>
        <p> good {clicks.left}</p>
        <p> neutral {clicks.middle}</p>
        <p> bad {clicks.right}</p>
        <p> all {clicks.all}</p>
        <p> average {((1 * clicks.left) + 0 + (-1 * clicks.middle)) / clicks.all} </p>
        <p> positive {clicks.right / clicks.all}% </p>
      </div> 
    </div>      
  );

}

ReactDOM.render(<App />, document.getElementById('root'))