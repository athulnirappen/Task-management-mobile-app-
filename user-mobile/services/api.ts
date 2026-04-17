// API Configuration and Service
import * as SecureStore from "expo-secure-store";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://YOUR_BACKEND_URL"; // Update with your backend URL

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: String;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const registerUser = async (
  userData: RegisterData,
): Promise<
  ApiResponse<{ token: string; refreshToken?: string; user: any }>
> => {
  try {
   

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Response status:", response.status);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      data: {
        token: data.accesstoken || data.token,
        refreshToken: data.refreshtoken,
        user: data.user,
      },
      message: data.message || "Registration successful",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
};

export const loginUser = async (
  userData: LoginData,
): Promise<
  ApiResponse<{ token: string; refreshToken?: string; user: any }>
> => {
  try {
    

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    
    const data = await response.json();
    

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Login failed",
      };
    }

    return {
      success: true,
      data: {
        token: data.accesstoken || data.token,
        refreshToken: data.refreshtoken,
        user: data.user,
      },
      message: data.message || "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
};

export const getAuthToken = async () => {
  try {
    return await SecureStore.getItemAsync("auth_token");
  } catch (error) {
    console.error("Error getting auth token", error);
    return null;
  }
};

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const token = await getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response;
};

export default {
  registerUser,
  loginUser,
  authFetch,
  getAuthToken,
};
