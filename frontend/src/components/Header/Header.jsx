import React from 'react';
import logoSVG from '../../assets/images/logo.svg';
import styles from './Header.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { QUERY_PARAM } from '../../utils/constants';


export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParam = searchParams.get(QUERY_PARAM);

  return (
    <header>
      <div className={styles.header}>
        <Link to={`/${urlParam ? ('?' + QUERY_PARAM + '=' + urlParam) : ''}`}>
          <img
            src={logoSVG}
            alt="logo"
            className={styles.logo}
          />
        </Link>
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
