import React, { useEffect } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

import { config } from "../../utils/oktaConfig";

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split("/oauth2")[0] : "",
      clientId,
      redirectUri,
      logo: "path-to-your-logo",
      i18n: {
        en: {
          "primaryauth.title": "Welcome to Labs Basic SPA Please sign in",
        },
      },
      authParams: {
        pkce,
        issuer,
        display: "page",
        scopes,
      },
    });

    widget.renderEl(
      { el: "#sign-in-widget" },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      }
    );
  }, []);

  return <div id="sign-in-widget" />;
};

export default LoginContainer;
