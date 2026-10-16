import { useState } from "react";

const Button = ({ onClick, text }) => (
  <button onClick={() => onClick(text)}>{text}</button>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all === 0 ? "" : (good - bad) / all;
  const positive = all === 0 ? "" : (good / all) * 100 + "%";

  const increaseGoodByOne = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    console.log("good: ", updatedGood);
  };

  const increaseNeutralByOne = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    console.log("neutral: ", updatedNeutral);
  };

  const increaseBadByOne = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    console.log("bad: ", updatedBad);
  };

  if (all === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button text="good" onClick={increaseGoodByOne} />
        <Button text="neutral" onClick={increaseNeutralByOne} />
        <Button text="bad" onClick={increaseBadByOne} />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increaseGoodByOne} />
      <Button text="neutral" onClick={increaseNeutralByOne} />
      <Button text="bad" onClick={increaseBadByOne} />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
