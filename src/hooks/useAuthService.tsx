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
  const user = useSelector((state: RootState) => state.user);

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
      email: string,
      password: string,
      remember_me: boolean
    ): Promise<LoginResponse> => {
      try {
        // await getCsrfCookie();
        const response = await axiosInstance.post(api("login"), {
          email,
          password,
          device_name: window.navigator.userAgent,
          remember_me,
        });
        const { token, user }: { user: any; token: string } = response.data;
        if (token) {
          localStorage.setItem("isLogin", JSON.stringify(true));
          dispatch(SetIsLogged(true));
          dispatch(SetUser(user));
        }
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    [getCsrfCookie]
  );

  const register = useCallback(
    async (data: object): Promise<LoginResponse> => {
      try {
        await getCsrfCookie();
        const response = await axiosInstance.post(api("register"), data);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
    [getCsrfCookie]
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

  const isAuthenticated = useCallback(() => {
    return isLogged && user;
  }, [isLogged, user]);

  return {
    getCsrfCookie,
    login,
    register,
    logout,
    isAuthenticated,
  };
};

export default useAuthService;
