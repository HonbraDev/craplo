import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../utils/authConfig";
import { CustomNavigationClient } from "../utils/NavigationClient";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../utils/theme";
import { CssBaseline } from "@material-ui/core";

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

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>Honbrasoft Craplo</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <MsalProvider instance={msalInstance}>
          <Toaster />
          <CssBaseline />
          <Component {...pageProps} />
        </MsalProvider>
      </ThemeProvider>
    </>
  );
}
