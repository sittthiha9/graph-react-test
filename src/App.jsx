import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputValues, setInputValues] = useState('');
    const [times, setTimes] = useState([]);
    const [values, setValues] = useState([]);
    const [total, setTotal] = useState(0);

    const handleInputChange = (event) => {
        setInputValues(event.target.value);
    };

    const generateTimeValues = () => {
        let formattedInput = inputValues.trim();
        // Remove square brackets if present
        if (formattedInput.startsWith('[') && formattedInput.endsWith(']')) {
            formattedInput = formattedInput.slice(1, -1);
        }

        const inputValues = formattedInput.split(',').map(v => v.trim());
        let hours = 0, minutes = 0;
        let sum = 0;
        let newTimes = [], newValues = [];

        inputValues.forEach(value => {
            if (value !== 'null') {
                const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                newTimes.push(timeString);
                newValues.push(value);
                sum += isNaN(value) ? 0 : Number(value);
            }

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
        const textToCopy = times.join('\n');
        navigator.clipboard.writeText(textToCopy);
        alert('Times copied to clipboard!');
    };

    const copyValuesToClipboard = () => {
        const textToCopy = values.join('\n');
        navigator.clipboard.writeText(textToCopy);
        alert('Values copied to clipboard!');
    };

    return (
        <div className="App">
            <textarea
                value={inputValues}
                onChange={handleInputChange}
                placeholder="Enter values separated by commas or in an array format"
            />
            <button onClick={generateTimeValues}>Generate Time Values</button>
            <button onClick={copyTimesToClipboard}>Copy Times</button>
            <button onClick={copyValuesToClipboard}>Copy Values</button>
            <div>
                <h2>Times:</h2>
                {times.map((time, index) => <div key={index}>{time}</div>)}
            </div>
            <div>
                <h2>Values:</h2>
                {values.map((value, index) => <div key={index}>{value}</div>)}
            </div>
            <div>Total: {total}</div>
        </div>
    );
}

export default App;
