import React from 'react';
import styles from './MyButton.module.css';


export default function MyButton({ children, className, ...props }) {
  return (
    <button
      className={`${styles.button} ${className ? className : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
