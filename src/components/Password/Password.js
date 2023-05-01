import React, { useState } from "react";
import "./Password.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername } from "../../state/store";
import { Auth } from "aws-amplify";
import { Navigate } from "react-router-dom";
import { ConfirmationCode } from "../ConfirmationCode/ConfirmationCode";
import { useListenAuthentication } from "../../hooks/useListenAuthentication";
import { PASSWORD_RESET_REQUIRED, USER_NOT_CONFIRMED } from "../constants";

export function Password() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [navigation, setNavigation] = useState("");
  const [signUpConfirmation, setSignUpConfirmation] = useState(false);
  const changePassword = (ev) => {
    setPassword(ev.target.value);
  };
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const username = useSelector(selectUsername);

  const submit = () => {
    setLoading(true);
    Auth.signIn(username, password)
      .then((user) => {
        setError(null);
        setLoading(false);
        setResetPassword(false);
        setNavigation("/home");
      })
      .catch((value) => {
        setLoading(false);
        if (
          value.message
            .toLowerCase()
            .indexOf(PASSWORD_RESET_REQUIRED.toLowerCase()) >= 0
        ) {
          return setNavigation("/fgpassword");
        }

        setError(value.message);

        if (
          value.message
            .toLowerCase()
            .indexOf(USER_NOT_CONFIRMED.toLowerCase()) >= 0
        ) {
          setSignUpConfirmation(true);
          Auth.resendSignUp(username).catch(() => {});
        }
      });
  };
  const goBack = () => {
    setNavigation("/login");
  };

  useListenAuthentication(() => {
    setNavigation("/home");
  });

  const forgotPassword = () => {
    // Send confirmation code to user's email
    Auth.forgotPassword(username)
      .then(() => {
        setNavigation("/fgpassword");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Container">
      {navigation && (
        <Navigate to={navigation} replace={true} state={{ resetPassword }} />
      )}
      <form className="FormContainer">
        <button type="button" className="Back" onClick={goBack}>
          Back
        </button>
        {!!error && (
          <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
        )}
        <div className="group">
          <label className="label">Username:</label>
          <span>{username}</span>
        </div>
        <div className="group">
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            onChange={changePassword}
          ></input>
        </div>
        <a href="#" onClick={forgotPassword}>
          Forgot password?
        </a>
        <br></br>
        {loading ? (
          <label style={{ marginTop: "12px" }}>Loading...</label>
        ) : (
          <button
            type="button"
            className="Submit"
            disabled={!password || loading}
            onClick={submit}
          >
            Submit
          </button>
        )}
      </form>

      {signUpConfirmation && (
        <ConfirmationCode username={username} setErrorMessage={setError} />
      )}
    </div>
  );
}
