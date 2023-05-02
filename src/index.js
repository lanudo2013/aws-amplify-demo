import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { routes } from "./routes";
import { store } from "./state/store";

Amplify.configure({
  region: "us-east-2",
  userPoolId: "us-east-2_XmyfzvL7q",
  userPoolWebClientId: "2c1gq0eqco9pobismtfhliibi5",

  // (optional) - Hosted UI configuration
  oauth: {
    domain: "poc-test-azure.auth.us-east-2.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "aws.cognito.signin.user.admin",
      "profile",
    ],
    redirectSignIn: "https://courageous-blancmange-10101f.netlify.app/home",
    redirectSignOut: "https://courageous-blancmange-10101f.netlify.app/login",
    responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(routes);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
