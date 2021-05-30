import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../utils/authConfig";
import { CustomNavigationClient } from "../utils/NavigationClient";
import "../styles/globals.css";

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS &&
    "account" in event.payload
  ) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const navigationClient = new CustomNavigationClient(router);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <>
      <Head>
        <title>Honbrasoft Craplo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MsalProvider instance={msalInstance}>
        <div className="max-w-4xl p-8 mx-auto">
          <Component {...pageProps} />
        </div>
      </MsalProvider>
    </>
  );
}
