import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';


export default function Layout() {
  return (<>
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </>);
}
