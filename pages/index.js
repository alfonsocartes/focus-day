import Head from "next/head";
import App from "../components/App";

const currentYear = new Date().getFullYear();
const logoPath = "/Logo cartes.dev small.jpg";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Focus Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {" "}
        <h1 className="title">Welcome to Focus Day!</h1>
        <p className="description">Get started by adding a new note or TODO</p>
      </header>
      <main className="main">
        <App />
      </main>

      <footer className="footer">
        <a
          href="https://www.cartes.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ {currentYear}
          <img src={logoPath} alt="cartes.dev Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}
