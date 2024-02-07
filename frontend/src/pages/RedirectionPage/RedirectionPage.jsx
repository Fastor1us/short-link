import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shortLinkApi } from '../../utils/api/shortLinkApi';
import styles from './RedirectionPage.module.css';


export default function RedirectionPage() {
  const { link } = useParams();
  const [getFullLink, { data, isError }] =
    shortLinkApi.useReadLinkMutation();

  useEffect(() => {
    if (data) window.location.href = data;
  }, [data]);

  useEffect(() => {
    getFullLink(link);
  }, []);

  return (
    <>
      {isError &&
        <h1 className={styles.error}>
          {'Ссылка не действительна!'}
        </h1>
      }
    </>
  );
}
