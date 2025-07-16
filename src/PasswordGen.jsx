import React, { useCallback, useEffect, useState } from 'react';
import './PasswordGen.css';

const PasswordGen = () => {
  const [password, setPassword] = useState("12345678");
  const [length, setLength] = useState(10);
  const [useNumber, setUseNumber] = useState(false);
  const [useChar, setUseChar] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumber) characters += "0123456789";
    if (useChar) characters += "@#$%^&*()";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(newPassword);
    setCopied(false);
  }, [length, useNumber, useChar]);

  useEffect(() => {
    generatePassword();
  }, [length, useNumber, useChar, generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      alert("text copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="password-container">
      <h1 className="title">Password Generator</h1>

      <div className="password-output">{password}</div>
      <button className="copy-button" onClick={copyToClipboard}>
        {copied ? "Copied!" : "Copy Password"}
      </button>

      <div className="controls">
        <div className="control">
          <label>Password Length ({length})</label>
          <input
            type="range"
            min={5}
            max={50}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="number"
            checked={useNumber}
            onChange={() => setUseNumber(prev => !prev)}
          />
          <label htmlFor="number">Include Numbers</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="special"
            checked={useChar}
            onChange={() => setUseChar(prev => !prev)}
          />
          <label htmlFor="special">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGen;
