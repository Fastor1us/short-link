import React from 'react';
import styles from './Footer.module.css';
import packageJson from '../../../../package.json';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <a
          href="https://github.com/Fastor1us/short-link"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </p>
      <p>
        2024 &nbsp;
        <a
          href="mailto:o-kir@ro.ru"
          className={styles.link}
        >
          {packageJson.author}
        </a>
      </p>
    </footer>
  );
}
