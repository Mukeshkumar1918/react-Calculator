
import React, { useState } from 'react';
import Button from './components/Button';
import './Calculator.css'

const App = () => {
    
    const [display, setDisplay] = useState('');
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
            
        } catch {
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

    window.onkeydown = function(e) {
        const key = e.key;  
        console.log(key);
        if ((key >= '0' && key <= '9') || ['+', '-', '*', '/'].includes(key)) {
            appendValue(key);
        }

        if (key === 'Enter') {
            calculateValue();
            return false;
        } 
        
        if( key === 'Escape') {
            clearValue();            
            return false;
        }

        if (key === 'Backspace') {
            setDisplay(prev => prev.slice(0, -1));
            return false;
        }
    }

    return (
        <div>
            <h1>Mukesh's calculator</h1>
            {/* <span id="display">{display}</span> */}
            <div className="color">
                Display: 
                <input type="text" value={display} />
            </div>
            <div className="color">
                Result: <span id="result">{result}</span>
            </div>

            <div className="calc-container">
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