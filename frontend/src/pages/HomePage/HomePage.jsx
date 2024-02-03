import React, { useEffect, useState } from 'react';
import { shortLinkApi } from '../../utils/api/shortLinkApi';
import styles from './HomePage.module.css';
import MyInput from '../../components/UI/MyInput/MyInput';
import MyButton from '../../components/UI/MyButton/MyButton';
import logoSVG from '../../assets/images/logo.svg';


export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [getShortLink, { data, isLoading, isError, error }] =
    shortLinkApi.useCreateLinkMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    getShortLink(inputValue);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (data) setShortLink(window.location.hostname + '/' + data.payload)
  }, [data]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
  }

  return (
    <section className={styles.container}>
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <MyInput
          placeholder='Введите ссылку которую нужно сократить'
          onChange={handleInputChange}
        />
        <MyButton disabled={inputValue === ''}>
          Сократить
        </MyButton>
      </form>
      {isLoading && <p>Загрузка...</p>}
      {data && (
        <div className={styles.shortLinkContainer}>
          <a
            href={data.payload}
            target="_blank"
            className={styles.shortLink}
          >
            &#128279; {shortLink}
          </a>
          <MyButton
            onClick={handleCopyToClipboard}
            style={{ width: '30%' }}
          >
            Копировать
          </MyButton>
        </div>
      )}
      {isError &&
        <div className={styles.error}>
          {error?.data?.message || 'произошла ошибка'}
        </div>
      }
    </section>
  );
}
