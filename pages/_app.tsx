import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../styles/globals.css";

import Nav from "components/Nav";
import { PopupProvider } from "components/providers/PopupProvider";
import Popup from "../components/common/Popup";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <SessionProvider session={session}>
        <Nav />
        <PopupProvider>
          <Component {...pageProps} />
          <Popup />
        </PopupProvider>
      </SessionProvider>
    </>
  );
}
