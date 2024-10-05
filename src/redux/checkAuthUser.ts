import { Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { SetIsLogged, SetUser } from "./action";
import { RootState } from "./store"; // Adjust the path as needed

let isFetchingCSRF = false;
let userFetched = false;
let userFetchPromise: Promise<void> | null = null; // Hold the promise until user data is fetched

const checkAuthUser: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const state = store.getState();

    if (!isFetchingCSRF) {
      isFetchingCSRF = true;
      axios.get(state.apiEndPoint.replace("api", "") + "sanctum/csrf-cookie", {
        withCredentials: true,
      });
    }

    const localLogin = localStorage.getItem("isLogin");
    if (localLogin && !userFetched && !userFetchPromise) {
      userFetchPromise = axios
        .get(state.apiEndPoint + "/user", {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
          },
        })
        .then((response) => {
          if (response.data.user) {
            store.dispatch(SetIsLogged(true));
            store.dispatch(SetUser(response.data.user));
            userFetched = true;
          }
        })
        .catch((error) => {
          if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
            console.error(
              "Error: Connection refused. Unable to connect to the server."
            );
          } else {
            console.error(error.message);
          }
        })
        .finally(() => {
          userFetchPromise = null;
        });
    }

    // Wait for user fetch to complete if it's still fetching
    if (userFetchPromise) {
      return userFetchPromise.then(() => next(action));
    }

    // Once user is fetched, pass the action to the next middleware or reducer
    return next(action);
  };

export default checkAuthUser;
