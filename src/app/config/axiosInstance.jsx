import axios from "axios";

export let axiosInstance = axios.create({
    baseURL: "https://api.team-sync.space/api",
    withCredentials: true,
});

// Response interceptor to handle automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized) and this request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      try {
        // Call the refresh endpoint to get a new access token
        // We use a fresh axios call here so it doesn't get caught in this interceptor loop
        await axios.post(
          "https://api.team-sync.space/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        // If the refresh succeeds, the backend sets a new secure cookie automatically.
        // Now we retry the original request that failed
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // If the refresh token is also expired or invalid, log the user out
        console.error("Refresh token expired. Please log in again.");
        // Redirect to login (or dispatch a Redux action to clear state)
        localStorage.removeItem('mockEmployee'); // Clear our mock state just in case
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    // Return any other errors normally
    return Promise.reject(error);
  }
);