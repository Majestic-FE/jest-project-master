/**
 * atoms CheckBox 実際にProjectで使用しているCheckBox
 */

import React, { memo, useEffect } from "react";
// style
import "./index.scss";

const CheckBox = memo((props) => {
  const defaultChecked = !!props.checked;
  const value = props.value || defaultChecked;

  const onChangeHandler = (e) => {
    e.stopPropagation();
    props.onChange(props.name, Number(!props.value));
  };

  useEffect(() => {}, []);

  return (
    <div className="checkBox" onClick={onChangeHandler}>
      <input
        type="checkbox"
        className={`${props.className ? props.className : ""}`}
        checked={props.checked ? "checked" : ""}
        value={props.value}
        readOnly
      />

      {props.label && <span>{props.label}</span>}
    </div>
  );
});

export default CheckBox;
