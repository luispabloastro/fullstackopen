import { useState } from 'react'


const Header = () => {
  return(
    <div><h2>Give feedback</h2></div>
  )
}

const Content = () => {
  return(
    <div><h2>Statistics</h2></div>
  )
}


const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
  )


const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)


const Statistics = (props) => {

  if (!(props.good || props.neutral || props.bad)) {
    return <p>No feedback given</p>
    
  }

  return(
    <tbody>
      <StatisticsLine text="good" value={props.good}/>
      <StatisticsLine text="neutral" value={props.neutral}/>
      <StatisticsLine text="bad" value={props.bad}/>
      <StatisticsLine text="all" value={props.good + props.neutral + props.bad}/>
      <StatisticsLine text="average" value={(props.good-props.bad)/(props.good + props.neutral + props.bad)}/>
      <StatisticsLine text="positive" value={(props.good)/(props.good + props.neutral + props.bad)*100 + " %"}/>
    </tbody>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const goodClicks = () => {
    
      setGood(good+1)
    
  }
  const neutralClicks = () => {
    
      setNeutral(neutral+1)
    
  }
  const badClicks = () => {
    
      setBad(bad+1)
    
  }

const randomString = () => {
  const randomIndex = Math.floor(Math.random()*anecdotes.length)
  setSelected(randomIndex)
}


  return (
    <div>
	    <Header/>
      <Button handleClick={goodClicks} text="good"/>
      <Button handleClick={neutralClicks} text="neutral"/>
      <Button handleClick={badClicks} text="bad"/>
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <p>{anecdotes[selected]}</p>
      <button onClick={randomString}>next anecdote</button>
    </div>
  )
}

export default App