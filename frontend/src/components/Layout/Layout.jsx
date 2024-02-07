import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';


export default function Layout() {
  // useEffect(() => {
  //   const header = document.querySelector('header');
  //   const totalHeight = `calc(100vh - var(--footer-margin-top) - var(--footer-height) - ${header.offsetHeight}px)`;
  //   document.querySelector('.main').style.minHeight = totalHeight;
  // }, []);

  return (<>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </>);
}
