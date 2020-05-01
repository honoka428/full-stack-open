import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
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
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total one={parts[0].exercises} two={parts[1].exercises} three={parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))