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
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClicks = () => {
    
      setGood(good+1)
    
  }
  const neutralClicks = () => {
    
      setNeutral(neutral+1)
    
  }
  const badClicks = () => {
    
      setBad(bad+1)
    
  }

  return (
    <div>
	    <Header/>
      <Button handleClick={goodClicks} text="good"/>
      <Button handleClick={neutralClicks} text="neutral"/>
      <Button handleClick={badClicks} text="bad"/>
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
     
    </div>
  )
}

export default App