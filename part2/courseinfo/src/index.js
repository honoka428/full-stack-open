import React from 'react'
import ReactDOM from 'react-dom'

const Header = (name) => <div> <h1>{name.name}</h1></div>

const Part = (part) => <div><p>{part.part.name}   {part.part.exercises}</p></div>

const Sum = (course) => {

  const exercisesArr = course.course.parts.map((part)=> part.exercises)
  const reducer = (arrayToAdd, currSum) => arrayToAdd + currSum

  return(
    <p style={{fontWeight: 'bold'}}>Total of {exercisesArr.reduce(reducer)} exercises</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <div>
        <ul style={{margin: 0, padding: 0}}>
          {
            course.parts.map((part) =>
              <Part part={part} key={part.id}/>
            )
          }
        </ul>
        <Sum course={course}/>
      </div>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))