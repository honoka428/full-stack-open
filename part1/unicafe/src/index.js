import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css';

function App() {
  const [clicks, setClicks] = useState({
    left: 0, middle: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      middle: clicks.middle, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }
  const handleMiddleClick = () => {
    const newClicks = { 
      left: clicks.left, 
      middle: clicks.middle + 1,       
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      middle: clicks.middle, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
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

      <div>
      <h1> statistics </h1>
      <p> good {clicks.left}</p>
      <p> neutral {clicks.middle}</p>
      <p> bad {clicks.right}</p>

      </div> 
    </div>      
  );

}

ReactDOM.render(<App />, document.getElementById('root'))