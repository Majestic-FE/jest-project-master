import React from "react";

const Input = ({ onConsole }) => {
  const [value, setValue] = React.useState("");
  const outputValue = () => {
    if (value) {
      onConsole(value);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={value}
        onChange={onChange}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default Input;
