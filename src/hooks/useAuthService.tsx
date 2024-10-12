import useAxiosInstance from "@/hooks/useAxiosInstance";
import { RootState } from "@/redux/store";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetIsLogged, SetUser } from "../redux/action";

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const useAuthService = () => {
  const { axiosInstance, api, csrf } = useAxiosInstance();
  const isLogged = useSelector((state: RootState) => state.isLogged);
  const user: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const getCsrfCookie = useCallback(async (): Promise<string | undefined> => {
    let csrfToken = Cookies.get("XSRF-TOKEN");

    if (!csrfToken) {
      try {
        await csrf(); // Fetch CSRF token
        csrfToken = Cookies.get("XSRF-TOKEN");
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    }

    return csrfToken;
  }, []);

  const login = useCallback(
    async (
      username: string,
      password: string,
      remember_me: boolean,
      loginAs?: string
    ): Promise<LoginResponse> => {
      try {
        let userData: any;
        await csrf().then(async () => {
          const response = await axiosInstance.post(api("login"), {
            username,
            password,
            device_name: window.navigator.userAgent,
            remember_me,
            loginAs,
          });
          const { token, user }: { user: any; token: string } = response.data;
          if (token) {
            localStorage.setItem("isLogin", JSON.stringify(true));
            dispatch(SetIsLogged(true));
            dispatch(SetUser(user));
          }
          userData = user;
        });
        return userData;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    [csrf]
  );

  const register = useCallback(
    async (data: object): Promise<LoginResponse> => {
      try {
        await csrf();
        const response = await axiosInstance.post(api("register"), data);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    [csrf]
  );

  const logout = useCallback(async () => {
    try {
      const response = await axiosInstance.delete(api("logout"));
      dispatch(SetIsLogged(false));
      localStorage.removeItem("isLogin");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }, []);

  const checkAvailability = useCallback(async (data: object) => {
    try {
      const response = await axiosInstance.post(
        api("check-availability"),
        data
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return isLogged && user;
  }, [isLogged, user]);

  const currentRole = useCallback(() => {
    let currentRole = "";
    if (user) {
      let roles: any = user.roles;
      if (roles.includes(user.loginAs)) {
        return user.loginAs;
      }
      if (roles && roles.length > 0) {
        roles = roles.map((role: any) => role.name);
        currentRole = roles[0];
      }
    }
    return currentRole;
  }, [user]);

  return {
    getCsrfCookie,
    login,
    register,
    logout,
    checkAvailability,
    currentRole,
    isAuthenticated,
  };
};

export default useAuthService;
