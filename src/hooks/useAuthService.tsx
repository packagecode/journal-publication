
import Permission from "@/interface/Permission";
import User from "@/interface/User";
import axiosInstance, { api, csrf } from "@/redux/axiosInstance";
import Cookies from "js-cookie";
import { useCallback } from "react";

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const useAuthService = () => {

  const getCsrfCookie = useCallback(
    async (landlord: boolean = false): Promise<string | undefined> => {
      let csrfToken = Cookies.get("XSRF-TOKEN");

      if (!csrfToken) {
        try {
          await csrf(landlord); // Fetch CSRF token
          csrfToken = Cookies.get("XSRF-TOKEN");
        } catch (error) {
          console.error("Error fetching CSRF token:", error);
        }
      }

      return csrfToken;
    },
    []
  );

  const login = useCallback(
    async (
      email: string,
      password: string,
      remember_me: boolean
    ): Promise<LoginResponse> => {
      try {
        await getCsrfCookie();
        const response = await axiosInstance.post(api("login"), {
          email,
          password,
          device_name: window.navigator.userAgent,
          remember_me
        });
        if (response.data.token) {
          localStorage.setItem("isLogin", JSON.stringify(true));
        }
        const responseME = await axiosInstance.get(api("me"));
        const responseAllPermissions = await axiosInstance.get(
          api("permissions")
        );

        const roles: any = responseME.data.me.roles;
        const user: User = response.data.user;
        const rolePermission: any = [];
        const allPermissionLists = responseAllPermissions.data.permissions;
        if (roles) {
          roles.forEach((role: any) => {
            rolePermission.push(role.permissions);
          });
        }
        const permissions: Permission[] =
          roles.length > 0
            ? responseME.data.me.permissions.concat(roles[0].permissions)
            : responseME.data.me.permissions;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("permissions", JSON.stringify(permissions));
        localStorage.setItem("roles", JSON.stringify(roles));
        localStorage.setItem(
          "allPermissions",
          JSON.stringify(allPermissionLists)
        );

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
      localStorage.clear();
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem("isLogin");
    return !!token;
  }, []);

  return {
    getCsrfCookie,
    login,
    logout,
    isAuthenticated
  };
};

export default useAuthService;
