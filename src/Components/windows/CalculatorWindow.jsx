import React, { useState } from "react";
import { Button } from "react95";
import BaseWindow from "./BaseWindow";

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

function CalculatorWindow({ onClose, onMinimize }) {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);
    if (prev !== null && !waitingForOperand) {
      const result = calculate(prev, current, operator);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOperator(op);
    setWaitingForOperand(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "−":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (operator === null || prev === null) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, operator);
    setDisplay(String(parseFloat(result.toFixed(10))));
    setPrev(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handlePlusMinus = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const handleClick = (btn) => {
    if (btn >= "0" && btn <= "9") handleNumber(btn);
    else if (btn === ".") handleDot();
    else if (btn === "C") handleClear();
    else if (btn === "±") handlePlusMinus();
    else if (btn === "%") handlePercent();
    else if (btn === "=") handleEquals();
    else handleOperator(btn);
  };

  const isOperator = (btn) => ["÷", "×", "−", "+"].includes(btn);

  return (
    <BaseWindow
      title="🧮 Calculator"
      onClose={onClose}
      onMinimize={onMinimize}
      width="240px"
      top="100px"
      left="300px"
    >
      {/* Display */}
      <div
        style={{
          background: "#c8e6c9",
          border: "2px inset #808080",
          padding: "8px 12px",
          fontSize: "24px",
          textAlign: "right",
          marginBottom: "8px",
          fontFamily: '"Courier New", monospace',
          minHeight: "44px",
          overflow: "hidden",
          wordBreak: "break-all",
        }}
      >
        {display}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {BUTTONS.map((row, i) => (
          <div key={i} style={{ display: "flex", gap: "4px" }}>
            {row.map((btn) => (
              <Button
                key={btn}
                onClick={() => handleClick(btn)}
                style={{
                  flex: btn === "0" ? 2 : 1,
                  padding: "8px 0",
                  fontWeight: "bold",
                  fontSize: "14px",
                  background:
                    btn === "="
                      ? "#000080"
                      : isOperator(btn)
                        ? "#c0c0c0"
                        : btn === "C"
                          ? "#cc0000"
                          : undefined,
                  color:
                    btn === "=" ? "white" : btn === "C" ? "white" : undefined,
                }}
              >
                {btn}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </BaseWindow>
  );
}

export default CalculatorWindow;
