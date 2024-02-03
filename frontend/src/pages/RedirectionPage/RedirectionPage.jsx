import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shortLinkApi } from '../../utils/api/shortLinkApi';


export default function RedirectionPage() {
  const { link } = useParams();
  const { data, isError } =
    shortLinkApi.useReadLinkQuery(link);

  useEffect(() => {
    if (data) window.location.href = data;
  }, [data]);

  return (
    <>
      {isError && <h1>{'Ссылка не действительна!'}</h1>}
    </>
  );
}
