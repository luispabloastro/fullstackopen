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

const Statistics = (props) => {

  if (!(props.good || props.neutral || props.bad)) {
    return <p>No feedback given</p>
    
  }

  return(
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {(props.good-props.bad)/(props.good + props.neutral + props.bad)}</p>
      <p>positive {(props.good)/(props.good + props.neutral + props.bad)*100} %</p>
    </div>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
	    <Header/>
      <button onClick={()=> setGood(good +1)}>good</button>
      <button onClick={()=> setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=> setBad(bad+1)}>bad</button>
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
     
    </div>
  )
}

export default App