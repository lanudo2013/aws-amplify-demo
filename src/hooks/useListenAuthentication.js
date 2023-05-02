import { Hub } from "aws-amplify";
import { useEffect } from "react";

export const useListenAuthentication = (onAuth) => {
  useEffect(() => {
    return Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        onAuth();
      }
    });
  }, [onAuth]);
};
