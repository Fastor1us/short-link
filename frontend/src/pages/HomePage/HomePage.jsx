import React, { useEffect, useState } from 'react';
import { shortLinkApi } from '../../utils/api/shortLinkApi';
import styles from './HomePage.module.css';
import MyInput from '../../components/UI/MyInput/MyInput';
import MyButton from '../../components/UI/MyButton/MyButton';
import logoSVG from '../../assets/images/logo.svg';
import { CSSTransition } from 'react-transition-group';


export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [getShortLink, { data, isSuccess, isLoading, isError, error }] =
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
          placeholder={
            'Введите ссылку' +
            (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ?
              '' : ' которую нужно сократить')
          }
          onChange={handleInputChange}
        />
        <MyButton disabled={inputValue === '' || isLoading}>
          Сократить
        </MyButton>
      </form>
      <CSSTransition
        in={isSuccess}
        timeout={200}
        classNames={{
          enterActive: styles['dataT-enter-active'],
          enterDone: styles['dataT-enter-done'],
          exitActive: styles['dataT-exit-active'],
          exitDone: styles['dataT-exit-done']
        }}
        mountOnEnter={true}
      >
        <div className={styles.shortLinkContainer}>
          <a
            href={data?.payload || '#'}
            target="_blank"
            rel="noreferrer"
            className={styles.shortLink}
          >
            &#128279; {shortLink + '123456789102'}
          </a>
          <MyButton
            onClick={handleCopyToClipboard}
            // style={{ width: '30%' }}
            className={styles.copyButton}
          >
            Копировать
          </MyButton>
        </div>
      </CSSTransition>
      {isError &&
        <div className={styles.error}>
          {error?.data?.message || 'произошла ошибка'}
        </div>
      }
    </section>
  );
}
