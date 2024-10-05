import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { showToast } from "../contexts/Toast.tsx";
import { RootState } from "../redux/store.tsx";

const useAxiosInstance = () => {
  const apiEndPoint = useSelector((state: RootState) => state?.apiEndPoint);
  const axiosInstance: AxiosInstance = axios.create({
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
    },
  });

  const csrf = async (): Promise<void> => {
    let endpoint = apiEndPoint;
    endpoint = endpoint.replace("api", "") + "sanctum/csrf-cookie";

    try {
      await axios.get(endpoint);
    } catch (error) {
      console.error("Error setting up CSRF protection:", error);
    }
  };

  function generateApiUrl(
    endpoint: string,
    version: string,
    withoutSuffix: boolean = false
  ): string {
    const withSlice = endpoint.startsWith("/") ? "" : "/";
    const withoutSuffixEndPoint = withoutSuffix
      ? apiEndPoint.replace("/api/v1", "")
      : apiEndPoint;
    const apiEndpointBase = withoutSuffixEndPoint.replace("v1", version);
    return `${apiEndpointBase}${withSlice}${endpoint}`;
  }

  const api = (endpoint: string, withoutSuffix: boolean = false): string => {
    return generateApiUrl(endpoint, "v1", withoutSuffix);
  };

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Do something with a successful response
      return response;
    },
    (error: AxiosError) => {
      // Do something with error response
      const errorMessages = (error.response?.data as any)?.errors;
      if (errorMessages) {
        const messages = Object.values(errorMessages);
        messages.forEach((message: any) => {
          showToast("error", message);
        });
        return Promise.reject(error);
      }
      const message = (error.response?.data as any)?.message;
      if (message) {
        showToast("error", message);
        return Promise.reject(error);
      }

      if (error.response?.status === 403) {
        showToast("error", "Unauthorized Access!");
      }
      return Promise.reject(error);
    }
  );

  return { api, csrf, axiosInstance };
};

export default useAxiosInstance;
