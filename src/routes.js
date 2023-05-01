import { Home } from "./components/Home/Home";
import { SignUp } from "./components/SignUp/SignUp";

import { Auth } from "aws-amplify";
import { redirect } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Password } from "./components/Password/Password";
import "./index.css";
import { store } from "./state/store";
import { getQueryParamsStr } from "./components/utils";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";

export const routes = [
  {
    path: "/",
    loader: async () => {
      return redirect("/login");
    },
  },
  {
    path: "/signup",
    Component: SignUp,
    loader: async () => {
      try {
        await Auth.currentAuthenticatedUser();
        return redirect("/home");
      } catch (e) {}
      return null;
    },
  },
  {
    path: "/login",
    Component: Login,
    loader: async () => {
      try {
        await Auth.currentAuthenticatedUser();
        return redirect("/home");
      } catch (e) {}
      return null;
    },
  },
  {
    path: "/home",
    Component: Home,
    loader: async ({ request }) => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (e) {
        return redirect("/login?" + getQueryParamsStr(request.url));
      }
      return null;
    },
  },
  {
    path: "/fgpassword",
    Component: ForgotPassword,
    loader: async ({ request }) => {
      try {
        await Auth.currentAuthenticatedUser();
        return redirect("/home");
      } catch (e) {}
      return null;
    },
  },
  {
    path: "/password",
    Component: Password,
    loader: async () => {
      const username = store.getState().auth.username;
      if (!username) {
        return redirect("/login");
      }
      return null;
    },
  },
];
