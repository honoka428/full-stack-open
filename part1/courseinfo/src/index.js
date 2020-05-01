import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <div> <h1>{name}</h1></div>

const Part = ({name, exercises}) => <div><p>{name}</p><p>{exercises}</p></div>

const Content = ({parts}) => {
  return (
    <div>
      <Part name= {parts[0].name} exercises={parts[0].exercises}/>
      <Part name= {parts[1].name} exercises={parts[1].exercises}/>
      <Part name= {parts[2].name} exercises={parts[2].exercises}/>
    </div>
  )
}

const Total = ({one, two, three}) => <div><p> Number of exercises {one + two + three} </p> </div>

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