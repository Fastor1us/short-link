import React, { useEffect, useRef, useState } from 'react';
import { shortLinkApi } from '../../utils/api/shortLinkApi';
import styles from './HomePage.module.css';
import MyInput from '../../components/UI/MyInput/MyInput';
import MyButton from '../../components/UI/MyButton/MyButton';
import { CSSTransition } from 'react-transition-group';
import { useSearchParams } from 'react-router-dom';
import { QUERY_PARAM } from '../../utils/constants';


export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef();
  const [getShortLink, {
    data: dataShortLink,
    isSuccess: isSuccessShortLink,
    isLoading: isLoadingShortLink,
    isError: isErrorShortLink
  }] =
    shortLinkApi.useCreateLinkMutation();
  const [getFullLink, {
    data: dataFullLink,
    isSuccess: isSuccessFullLink,
    isLoading: isLoadingFullLink,
    isError: isErrorFullLink
  }] = shortLinkApi.useReadLinkMutation();
  const urlParam = searchParams.get(QUERY_PARAM);

  const handleSubmit = (e) => {
    e.preventDefault();
    getShortLink(inputValue);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (urlParam) getFullLink(urlParam);
  }, []);

  // данный эффект срабатывает когда страница загрузилась с ?${QUERY_PARAM}=
  useEffect(() => {
    if (dataFullLink) {
      // устанавливаем через ref полную ссылку в поле input -
      // не используем двустороннее связывание т.к. нам нужен placeholder
      inputRef.current.value = dataFullLink;
      // устанавливаем inputValue что бы кнопка "Сократить" не блокировалась
      setInputValue(dataFullLink);
      setShortLink(window.location.hostname + '/' + urlParam);
    }
  }, [dataFullLink]);

  useEffect(() => {
    if (dataShortLink) {
      setSearchParams({ [QUERY_PARAM]: dataShortLink });
      setShortLink(window.location.hostname + '/' + dataShortLink);
    }
  }, [dataShortLink]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MyInput
          placeholder={
            'Введите ссылку' +
            (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ?
              '' : ' которую нужно сократить')
          }
          onChange={handleInputChange}
          ref={inputRef}
          disabled={isLoadingShortLink || isLoadingFullLink}
        />
        <MyButton
          disabled={inputValue === '' ||
            (isLoadingShortLink || isLoadingFullLink)}
        >
          {isLoadingShortLink || isLoadingFullLink ?
            'Загрузка...' : 'Сократить'}
        </MyButton>
      </form>
      <CSSTransition
        in={isSuccessShortLink || isSuccessFullLink}
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
            href={urlParam || '#'}
            target="_blank"
            rel="noreferrer"
            className={styles.shortLink}
          >
            &#128279; {shortLink}
          </a>
          <MyButton
            onClick={handleCopyToClipboard}
            className={styles.copyButton}
          >
            Копировать
          </MyButton>
        </div>
      </CSSTransition>
      {(isErrorShortLink || (isErrorFullLink && !isSuccessShortLink)) &&
        <div className={styles.error}>
          {'Произошла ошибка'}
        </div>
      }
    </section>
  );
}
