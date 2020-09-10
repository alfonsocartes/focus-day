import React from "react";
import Head from "next/head";
const logoPath = "/Logo cartes.dev small.jpg";
const currentYear = new Date().getFullYear;

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Focus Day</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      {/* <div>
        <a
          href="https://www.cartes.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ⓒ {currentYear}
          <img src={logoPath} alt="cartes.dev Logo" className="logo" />
        </a>
      </div> */}
    </div>
  );
}
