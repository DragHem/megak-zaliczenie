import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "../styles/globals.css";

import { PopupProvider } from "components/providers/PopupProvider";
import Popup from "../components/common/Popup";
import Layout from "../components/Layout/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>Kitty Project</title>
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <SessionProvider session={session}>
        <PopupProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Popup />
        </PopupProvider>
      </SessionProvider>
    </>
  );
}
