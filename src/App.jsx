import React, { useState } from 'react';
import './App.css';

function App() {
    const [inputValues, setInputValues] = useState('');
    const [timeValues, setTimeValues] = useState([]);
    const [total, setTotal] = useState(0);

    const handleInputChange = (event) => {
        setInputValues(event.target.value);
    };

    const generateTimeValues = () => {
        const values = inputValues.split(',').map(v => v.trim());
        let hours = 0, minutes = 0;
        let sum = 0;

        const newTimeValues = [];
        values.forEach(value => {
            if (value !== 'null') {
                const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                newTimeValues.push(`${timeString}: ${value}`);
                sum += isNaN(value) ? 0 : Number(value);
            }

            minutes += 5;
            if (minutes >= 60) {
                hours++;
                minutes -= 60;
            }
        });

        setTimeValues(newTimeValues);
        setTotal(sum);
    };

    const copyToClipboard = () => {
        const textToCopy = timeValues.join('\n') + `\nTotal: ${total}`;
        navigator.clipboard.writeText(textToCopy);
        alert('Copied to clipboard!');
    };

    return (
        <div className="App">
            <textarea
                value={inputValues}
                onChange={handleInputChange}
                placeholder="Enter values separated by commas"
            />
            <button onClick={generateTimeValues}>Generate Time Values</button>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <div>
                {timeValues.map((timeValue, index) => (
                    <div key={index}>{timeValue}</div>
                ))}
            </div>
            <div>Total: {total}</div>
        </div>
    );
}

export default App;