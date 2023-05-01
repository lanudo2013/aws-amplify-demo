import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Home.css";
import jwt from "jwt-decode";

export const Home = () => {
  const [navigateTo, setNavigateTo] = useState("");
  const [userinfo, setUserinfo] = useState(null);

  useEffect(() => {
    Auth.currentSession().then((session) => {
      const jwtToken = session.getAccessToken().getJwtToken();
      const decoded = jwt(jwtToken);
      if (decoded) {
        const payload = decoded;
        setUserinfo({
          username: payload.username,
          issuer: payload.iss,
        });
      }
    });
  }, []);

  const logout = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    } finally {
      setNavigateTo("/login");
    }
  };
  return (
    <div className="HomeContainer">
      {navigateTo ? <Navigate to={navigateTo} replace={true} /> : null}
      <h1>Welcome</h1>
      {!!userinfo && (
        <div className="UserInfo">
          <div className="Entry">
            <span>Username: </span>
            <span>{userinfo.username}</span>
          </div>
          <div className="Entry">
            <span>Issuer: </span>
            <span>{userinfo.issuer}</span>
          </div>
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
};
