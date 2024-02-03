import React from 'react';
import styles from './MyInput.module.css';


export default function MyInput({ children, ...props }) {
  return (
    <input
      className={styles.input}
      {...props}
    />
  )
}
