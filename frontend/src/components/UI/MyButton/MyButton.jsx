import React from 'react';
import styles from './MyButton.module.css';


export default function MyButton({ children, ...props }) {
  return (
    <button
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
}
