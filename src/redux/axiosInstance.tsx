import axios, { AxiosError, AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { showToast } from "../contexts/Toast.tsx";
import store from "./../redux/store";

const stores = store.getState();
// Define your API endpoint constants
const API_ENDPOINT: string = stores.apiEndPoint || "";
const CDN_ENDPOINT: string = stores.cdnEndPoint || API_ENDPOINT;
const LANDLORD_API_ENDPOINT: string =
  import.meta.env.VITE_APP_LANDLORD_API_ENDPOINT || "";

// Define your Axios instance
const axiosInstance: AxiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
});

const csrf = async (landlord: boolean = false): Promise<void> => {
  let endpoint = landlord ? LANDLORD_API_ENDPOINT : stores.apiEndPoint;
  endpoint = endpoint.replace("api/v1", "") + "sanctum/csrf-cookie";

  try {
    await axiosInstance.get(endpoint);
  } catch (error) {
    console.error("Error setting up CSRF protection:", error);
  }
};

const api = (endpoint: string, withoutSuffix: boolean = false): string => {
  return generateApiUrl(endpoint, "v1", withoutSuffix);
};

const cdn = (): string => {
  // Implementation for $cdn function
  return CDN_ENDPOINT;
};

function generateApiUrl(
  endpoint: string,
  version: string,
  withoutSuffix: boolean = false
): string {
  const domain = stores.domain;
  const withSlice = endpoint.startsWith("/") ? "" : "/";
  const apiEndPoint = API_ENDPOINT.replace("variable", domain);
  const withoutSuffixEndPoint = withoutSuffix
    ? apiEndPoint.replace("/api/v1", "")
    : apiEndPoint;
  const apiEndpointBase = withoutSuffixEndPoint.replace("v1", version);
  return `${apiEndpointBase}${withSlice}${endpoint}`;
}

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

export { api, cdn, csrf };

export default axiosInstance;
