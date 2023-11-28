import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValues, setInputValues] = useState("");
  const [times, setTimes] = useState([]);
  const [values, setValues] = useState([]);
  const [total, setTotal] = useState(0);
  const [appendPercent, setAppendPercent] = useState(false);

  const handleInputChange = (event) => {
    setInputValues(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAppendPercent(event.target.checked);
  };

  const generateTimeValues = () => {
    let formattedInput = inputValues.trim();
    // Remove square brackets if present
    if (formattedInput.startsWith("[") && formattedInput.endsWith("]")) {
      formattedInput = formattedInput.slice(1, -1);
    }

    const parsedValues = formattedInput.split(",").map((v) => v.trim());
    let hours = 0,
      minutes = 0;
    let sum = 0;
    let newTimes = [],
      newValues = [];

    parsedValues.forEach((value) => {
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      newTimes.push(timeString);

      // Replace 'null' with '0'
      const finalValue = value === "null" ? "0" : value;
      const formattedValue = appendPercent ? `${finalValue}%` : finalValue;
      newValues.push(formattedValue);

      sum += isNaN(finalValue) ? 0 : Number(finalValue);

      minutes += 5;
      if (minutes >= 60) {
        hours++;
        minutes -= 60;
      }
    });

    setTimes(newTimes);
    setValues(newValues);
    setTotal(sum);
  };

  const copyTimesToClipboard = () => {
    const textToCopy = times.join("\n");
    navigator.clipboard.writeText(textToCopy);
    alert("Times copied to clipboard!");
  };

  const copyValuesToClipboard = () => {
    const textToCopy = values.join("\n");
    navigator.clipboard.writeText(textToCopy);
    alert("Values copied to clipboard!");
  };

  return (
    <div className="App">
      <div style={{marginBottom: 10}}>Total: {total}</div>
      <textarea
        value={inputValues}
        onChange={handleInputChange}
        placeholder="Enter values separated by commas or in an array format"
      />
      <div>
        <input
          type="checkbox"
          id="appendPercent"
          checked={appendPercent}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="appendPercent">Append % to values</label>
      </div>
      <button onClick={generateTimeValues}>Generate Time Values</button>
      <button onClick={copyTimesToClipboard}>Copy Times</button>
      <button onClick={copyValuesToClipboard}>Copy Values</button>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <h2>Times:</h2>
          {times.map((time, index) => (
            <div key={index}>{time}</div>
          ))}
        </div>
        <div>
          <h2>Values:</h2>
          {values.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
