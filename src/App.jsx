import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import "./Calculator.css";

const buttons = [
  { value: "1" }, { value: "2" }, { value: "3" },
  { value: "4" }, { value: "5" }, { value: "6" },
  { value: "7" }, { value: "8" }, { value: "9" },
  { value: "0" }, { value: "+" }, { value: "-" },
  { value: "*" }, { value: "/" }, { value: "." },
];

const App = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const appendValue = (value) => {
    if (["+", "*", "/"].includes(value) && display === "") return;
    if (value === "=" || value === "clear") return;

    setDisplay((prev) => prev + value);
    if (result !== "") setResult("");
  };

  const calculateValue = () => {
    if (display === "") return;
    try {
      const calculatedResult = eval(display); // demo only
      setResult(calculatedResult);
    } catch {
      setResult("invalid input");
      setDisplay("");
    }
  };

  const clearValue = () => {
    setDisplay("");
    setResult("");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      // numbers & operators
      if (buttons.some((btn) => btn.value === key)) {
        const button = document.querySelector(`.calc-number[data-key="${key}"]`);
        if (button) {
          button.classList.add("pressed");
          setTimeout(() => button.classList.remove("pressed"), 150);
        }
        appendValue(key);
        return;
      }

      // Enter → "="
      if (key === "Enter") {
        const eqBtn = document.querySelector(`.calc-number.equals[data-key="="]`);
        if (eqBtn) {
          eqBtn.classList.add("pressed");
          setTimeout(() => eqBtn.classList.remove("pressed"), 150);
        }
        calculateValue();
        e.preventDefault();
        return;
      }

      // Escape → "clear"
      if (key === "Escape") {
        const clrBtn = document.querySelector(`.calc-number.clear[data-key="clear"]`);
        if (clrBtn) {
          clrBtn.classList.add("pressed");
          setTimeout(() => clrBtn.classList.remove("pressed"), 150);
        }
        clearValue();
        e.preventDefault();
        return;
      }

      // Backspace → delete last char
      if (key === "Backspace") {
        setDisplay((prev) => prev.slice(0, -1));
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, result]);

  return (
    <div className="bg-full">
      <div className="center">
        <h1 id="font-head">Mukesh's calculator</h1>

        <div className="color">
          <label htmlFor="display"></label>
          <input
            type="text"
            id="display"
            className="input-color"
            value={display}
            placeholder="Display :"
            
            readOnly
          />
        </div>

        <div className="color">
          <label htmlFor="result"></label>
          <input
            type="text"
            id="result"
            className="input-color"
            value={result}
            placeholder="Result :"
            readOnly
          />
        </div>

        <div className="calc-container">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              value={btn.value}
              dataKey={btn.value}
              className="calc-number effect-btn"
              onClick={appendValue}
            />
          ))}

          {/* Now styled same as before: calc-number + equals/clear */}
          <Button
            value="="
            dataKey="="
            className="calc-number equals effect-btn"
            onClick={calculateValue}
          />
          <Button
            value="clear"
            dataKey="clear"
            className="calc-number clear effect-btn"
            onClick={clearValue}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
