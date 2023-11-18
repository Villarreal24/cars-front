"use client";

import styles from './page.module.css'
import Admin from './admin';
import Register from './auth/page';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const userAuth = useSelector(state => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!userAuth) {
      router.push('/auth');
    }
  }, [userAuth])

  return (
    <main className={styles.main}>
      {userAuth ? (
        <Admin />
      ) : null}
    </main>
  )
}
