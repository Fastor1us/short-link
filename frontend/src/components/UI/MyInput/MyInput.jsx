import React from 'react';
import styles from './MyInput.module.css';


export default function MyInput({ children, className, ...props }) {
  return (
    <input
      className={`${styles.input} ${className ? className : ''}`}
      {...props}
    />
  )
}
