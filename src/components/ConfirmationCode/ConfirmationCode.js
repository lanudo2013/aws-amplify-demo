import { Auth } from "aws-amplify";
import { useState } from "react";
import "./ConfirmationCode.css";

export const ConfirmationCode = ({ username, setErrorMessage }) => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const sendCode = async () => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
    } catch (error) {
      setErrorMessage(error.message);
      console.log("error confirming sign up", error);
    }
  };
  const resendCode = async () => {
    try {
      await Auth.resendSignUp(username);
      setErrorMessage(null);
    } catch (error) {
      console.log("error resending code: ", error);
    }
  };

  const changeConfirmationCode = (ev) => {
    setConfirmationCode(ev.target.value);
  };

  return (
    <div className="ConfirmationCode">
      <input
        type="number"
        onChange={changeConfirmationCode}
        placeholder="Enter verification code"
      ></input>
      <button
        type="button"
        className="SendButton"
        onClick={sendCode}
        disabled={!confirmationCode}
      >
        Send
      </button>
      <button type="button" onClick={resendCode}>
        Resend
      </button>
    </div>
  );
};
