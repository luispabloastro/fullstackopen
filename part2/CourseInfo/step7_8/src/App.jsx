const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  return(
    <h4>total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</h4>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => {
  return(
    <div>
      {parts.map((part) => 
        (<Part key={part.id} part = {part}/>

        ))}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/> 
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/> 
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}



export default App