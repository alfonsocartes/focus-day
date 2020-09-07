import Head from "next/head";
import Link from "next/link";
import App from "../components/App";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const currentYear = new Date().getFullYear();
const logoPath = "/Logo cartes.dev small.jpg";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Focus Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <App />
      </div>
      {/* <footer className="footer">
        <a
          href="https://www.cartes.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ {currentYear}
          <img src={logoPath} alt="cartes.dev Logo" className="logo" />
        </a>
      </footer> */}
    </div>
  );
}
