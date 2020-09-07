import Head from "next/head";
import styles from "../styles/Home.module.css";

const currentYear = new Date().getFullYear();
const logoPath = "/Logo cartes.dev small.jpg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Focus Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Focus Day!</h1>

        <p className={styles.description}>
          Get started by adding a new note or TODO
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.cartes.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright {currentYear}
          <img src={logoPath} alt="cartes.dev Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
