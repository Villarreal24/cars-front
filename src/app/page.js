import styles from './page.module.css'
import Admin from './admin';

export default function Home() {

  return (
    <main className={styles.main}>
      <Admin />
    </main>
  )
}
