import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsername } from "../../state/store";
import { Navigate } from "react-router-dom";

export function ForgotPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [navigationType, setNavigationType] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const username = useSelector(selectUsername);

  const changeCode = (ev) => {
    setCode(ev.target.value);
  };
  const changePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const changeNewPasswordConfirmation = (ev) => {
    setConfirmationPassword(ev.target.value);
  };

  const submit = () => {
    if (password !== confirmationPassword) {
      setError("Password and confirmation password must match");
      return;
    }
    // Collect confirmation code and new password, then
    return Auth.forgotPasswordSubmit(username, code, confirmationPassword)
      .then(() => {
        setSuccessMessage("Password changed!");
        setError(null);
        setTimeout(() => {
          setNavigationType("/login");
        }, 3000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="Container">
      <h1 className="title">Forgot Password</h1>
      {!!error && <div className="Error">{error}</div>}
      {!!successMessage && <div className="Success">{successMessage}</div>}

      {!!navigationType && <Navigate to={navigationType} replace={true} />}
      <form className="FormContainer" onSubmit={(e) => e.preventDefault()}>
        <div className="group">
          <label className="label">New Password: </label>
          <input
            type="password"
            name="password"
            onInput={changePassword}
          ></input>
        </div>
        <div className="group">
          <label className="label">Repeat New Password: </label>
          <input
            type="password"
            name="passwordConfirmation"
            onInput={changeNewPasswordConfirmation}
          ></input>
        </div>
        <div className="group">
          <label className="label">Verification Code: </label>
          <input type="text" name="code" onInput={changeCode}></input>
        </div>

        <div className="Buttoner">
          <button
            type="button"
            className="Submit"
            disabled={!code || !password || !confirmationPassword}
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
