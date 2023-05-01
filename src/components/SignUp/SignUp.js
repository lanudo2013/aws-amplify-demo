import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Navigate, redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./SignUp.css";
import { ConfirmationCode } from "../ConfirmationCode/ConfirmationCode";
import { useListenAuthentication } from "../../hooks/useListenAuthentication";

export function SignUp() {
  const [mail, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState("");
  const [signUpShouldConfirmCode, setSignUpShouldConfirmCode] = useState(false);

  const [navigationType, setNavigationType] = useState("");

  const changeEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const changeUsername = (ev) => {
    setUsername(ev.target.value);
  };
  const changePhone = (ev) => {
    setPhoneNumber(ev.target.value);
  };
  const changePassword = (ev) => {
    setPassword(ev.target.value);
  };
  const goBack = () => {
    setNavigationType("/login");
  };
  useListenAuthentication(() => {
    setNavigationType("/home");
  });

  const submit = async () => {
    try {
      const { user, userConfirmed } = await Auth.signUp({
        username,
        password,
        attributes: {
          email: mail, // optional
          phone_number: phonenumber, // optional - E.164 number convention
        },
        autoSignIn: {
          enabled: true,
        },
      });
      setSignUpShouldConfirmCode(!userConfirmed);
      setErrorMessage(null);
      if (userConfirmed) {
        setNavigationType("/home");
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="Container">
      <h1 className="title">Sign up</h1>
      {!!error && (
        <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
      )}
      {!!navigationType && <Navigate to={navigationType} replace={true} />}
      <form className="FormContainer">
        <div className="group">
          <label className="label">Email :</label>
          <input
            type="email"
            name="email"
            onInput={changeEmail}
            disabled={signUpShouldConfirmCode}
          ></input>
        </div>
        <div className="group">
          <label className="label">Username :</label>
          <input
            type="text"
            name="username"
            onInput={changeUsername}
            disabled={signUpShouldConfirmCode}
          ></input>
        </div>
        <div className="group">
          <label className="label">Phone Number :</label>
          <input
            type="text"
            name="phone"
            onInput={changePhone}
            disabled={signUpShouldConfirmCode}
          ></input>
        </div>
        <div className="group">
          <label className="label">Password :</label>
          <input
            type="password"
            name="email"
            onInput={changePassword}
            disabled={signUpShouldConfirmCode}
          ></input>
        </div>

        <button type="button" className="Back" onClick={goBack}>
          Back
        </button>
        <button
          type="button"
          className="Submit"
          disabled={
            !mail ||
            !username ||
            !phonenumber ||
            !password ||
            signUpShouldConfirmCode
          }
          onClick={submit}
        >
          Submit
        </button>
      </form>

      {signUpShouldConfirmCode && (
        <ConfirmationCode
          username={username}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
}
