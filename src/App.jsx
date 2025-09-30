
import React, { useState } from 'react';
import Button from './assets/Button';
import './Calculator.css'

const App = () => {
    
    const [display, setDisplay] = useState('');
    // State for the result of the last calculation
    const [result, setResult] = useState('');

   
    const appendValue = (value) => {
        
        if (['+', '*', '/'].includes(value) && display === '') {
            return;
        }

        
        if (value === '=' || value === 'clear') {
            return; 
        }

        
        setDisplay(prev => prev + value);
        
        if (result !== '') {
            setResult(''); 
        }
    };

   
    const calculateValue = () => {
        if (display === '') return;
        try {
            const calculatedResult = eval(display);
            setResult(calculatedResult);
            
            setDisplay(String(calculatedResult)); 
        } catch (error) {
            setResult('Error');
            setDisplay('');
        }
    };

    
    const clearValue = () => {
        setDisplay('');
        setResult('');
    };

    
    const buttons = [
        { value: '0' }, { value: '1' }, { value: '2' },
        { value: '3' }, { value: '4' }, { value: '5' },
        { value: '6' }, { value: '7' }, { value: '8' },
        { value: '9' }, { value: '+' }, { value: '-' },
        { value: '*' }, { value: '/' }, 
    ];

    return (
        <div>
            <h1>Mukesh's calculator</h1>
            
            {/* Display Area */}
            <div className="color">
                Display: <span id="display">{display}</span>
            </div>
            <div className="color">
                Result: <span id="result">{result}</span>
            </div>

            {/* Keypad */}
            <div className="calc-container">
                {/* Render numeric and operator buttons */}
                {buttons.map((btn, index) => (
                    <Button 
                        key={index}
                        value={btn.value}
                        onClick={appendValue}
                    />
                ))}
                
               
                <Button 
                    value="=" 
                    onClick={calculateValue} 
                    className="equals" 
                />
                <Button 
                    value="clear" 
                    onClick={clearValue} 
                    className="clear" 
                />
            </div>
        </div>
    );
};

export default App;