import React, { useState } from "react"

const Button = ({ text, value, setValue }) => {
  return (
    <button
      onClick={() => {
        setValue(value + 1)
      }}
    >
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Feedback = ({ good, neutral, bad, setGood, setNeutral, setBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" value={good} setValue={setGood} />
      <Button text="neutral" value={neutral} setValue={setNeutral} />
      <Button text="bad" value={bad} setValue={setBad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback give</p>
      </div>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + " %"} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setBad={setBad}
        setNeutral={setNeutral}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
