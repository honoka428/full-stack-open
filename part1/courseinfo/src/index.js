import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name= {props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part name= {props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part name= {props.parts[2].name} exercise={props.parts[2].exercises}/>

    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.one + props.two + props.three}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total one={course.parts[0].exercises} two={course.parts[1].exercises} three={course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))