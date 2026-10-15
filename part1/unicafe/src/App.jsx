import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistics = ({ text, count }) => (
  <p>
    {text} {count}
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGoodByOne} text={"good"}></Button>
      <Button onClick={increaseNeutralByOne} text={"neutral"}></Button>
      <Button onClick={increaseBadByOne} text={"bad"}></Button>
      <h1>statistics</h1>
      <Statistics count={good} text={"good"}></Statistics>
      <Statistics count={neutral} text={"neutral"}></Statistics>
      <Statistics count={bad} text={"bad"}></Statistics>
    </div>
  );
};

export default App;
