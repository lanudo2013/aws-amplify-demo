import React, { useEffect, useState } from "react";
import "./Login.css";
import { Navigate, useSearchParams } from "react-router-dom";
import { setUsername } from "../../state/store";
import { useDispatch } from "react-redux";
import { Auth } from "aws-amplify";

export function Login() {
  const [mail, setEmail] = useState("");
  const [type, setType] = useState("");
  const [navigationType, setNavigationType] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const changeEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const changeType = (ev) => {
    setType(ev.target.value);
  };

  const submit = () => {
    dispatch(setUsername(mail));
    if (type === "cognito") {
      setNavigationType("/password");
    } else {
      Auth.federatedSignIn({
        provider: "AzureMD",
        customState: mail,
      });
    }
  };

  const goToSignup = () => {
    setNavigationType("/signup");
  };
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const errmessage = searchParams.get("error_description");
    if (errmessage) {
      setError(errmessage);
    }
  }, [searchParams]);

  return (
    <div className="Container">
      <h1 className="title">Login</h1>
      {!!error && <div className="Error">{error}</div>}

      {!!navigationType && <Navigate to={navigationType} replace={true} />}
      <form className="FormContainer">
        <div className="group">
          <label className="label">Identify Provider:</label>
          <select name="provider" onInput={changeType}>
            <option value="">Choose one..</option>
            <option value="cognito">Cognito</option>
            <option value="azure">Azure</option>
          </select>
        </div>
        {type === "cognito" && (
          <div className="group">
            <label className="label">Email/Usernamex :</label>
            <input type="text" name="email" onInput={changeEmail}></input>
          </div>
        )}
        <div className="Buttoner">
          <button
            type="button"
            className="Submit"
            disabled={!type || (type === "cognito" && !mail)}
            onClick={submit}
          >
            Submit
          </button>
          <button type="button" onClick={goToSignup}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
