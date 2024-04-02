import React from "react";
import styles from './Input.module.css'

const Input = ({ id, type, value, onChange, name, placeholder, label, max }) => {
  return (
    <div className={styles.inputcontainer}>
      <input
        className={styles.input}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      <label htmlFor={id} id={styles.ph1} className={styles.placeholder}>
        {label}
      </label>
    </div>
  );
};

export default Input;
