import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shortLinkApi } from '../../utils/api/shortLinkApi';


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
      {isError && <h1>{'Ссылка не действительна!'}</h1>}
    </>
  );
}
