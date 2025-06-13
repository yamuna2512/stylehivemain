import axios from "axios";

export const LOGIN_USER_KEY = "HIVE_TECHWEAR_LOGIN_USER_KEY";
const { REACT_APP_ENVIRONMENT, REACT_APP_API_BASE_URL_PROD, REACT_APP_API_BASE_URL_DEV } = process.env;

const baseURL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (config.requireToken) {
      const user = localStorage.getItem(LOGIN_USER_KEY)
        ? JSON.parse(localStorage.getItem(LOGIN_USER_KEY))
        : null;
      if (user?.token) {
        config.headers.common["Authorization"] = user.token;
      }
    }
    return config;
  },
  (err) => {
    console.error("Request error:", err);
    return Promise.reject(err);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      if (error.response.status === 401) {
        localStorage.removeItem(LOGIN_USER_KEY);
      }

      return Promise.reject(error);
    } else {
      console.error("Network or server error:", error.message || error);
      return Promise.reject({
        message: "Server not responding. Please try again later.",
      });
    }
  }
);

export default class API {
  signUp = (signUpBody) => {
    const formData = new FormData();
    for (const key in signUpBody) {
      formData.append(key, signUpBody[key]);
    }
    return api.post("/users/signup/", formData);
  };

  signIn = (signInBody) => {
    const formData = new FormData();
    for (const key in signInBody) {
      formData.append(key, signInBody[key]);
    }
    return api.post("/users/signin/", formData);
  };

  getCategories = () => api.get("/categories/");

  getProducts = (query = {}) => api.get("/products/", { params: query, requireToken: true });

  getCarts = (query = {}) => api.get("/carts/", { params: query, requireToken: true });

  addCart = (addCartBody) => {
    const formData = new FormData();
    for (const key in addCartBody) {
      formData.append(key, addCartBody[key]);
    }
    return api.post("/carts/add/", formData, { requireToken: true });
  };

  updateCart = (updateCartBody, cartId) => {
    const formData = new FormData();
    for (const key in updateCartBody) {
      formData.append(key, updateCartBody[key]);
    }
    return api.put(`/carts/update/${cartId}/`, formData, { requireToken: true });
  };

  checkoutOrder = (checkoutOrderBody) => api.post("/orders/add/", checkoutOrderBody, { requireToken: true });
}
