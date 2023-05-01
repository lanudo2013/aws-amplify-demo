import { Hub } from "aws-amplify";
import { useEffect } from "react";

export const useListenAuthentication = (onAuth) => {
  useEffect(() => {
    return Hub.listen("auth", ({ payload }) => {
      const { event, data } = payload;
      if (event === "autoSignIn") {
        onAuth();
      }
    });
  }, []);
};
