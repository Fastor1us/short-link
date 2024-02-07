import React, { forwardRef } from 'react';
import styles from './MyInput.module.css';


const MyInput = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`${styles.input} ${className ? className : ''}`}
      {...props}
    />
  );
});

export default MyInput;
