import React from 'react';
import logoSVG from '../../assets/images/logo.svg';
import styles from './Header.module.css';


export default function Header() {

  return (
    <header>
      <div className={styles.header}>
        <img
          src={logoSVG}
          alt="logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>
          Короткая Ссылка
        </h1>
      </div>
      <p className={styles.description}>
        Помогите клиентам быстро найти вашу страницу в интернете.
        Благодаря короткой ссылке клиентам не придётся видеть длинные
        url-адреса, занимающие много места.
      </p>
    </header>
  );
}
