import axios from "axios";
import { baseUrl } from "../config";

export const handleLogin = async (
  email: string,
  password: string
): Promise<{ message: string; type: "success" | "error" }> => {
  const body = { email, password };

  try {
    if (!email || !password) {
      return {
        message: "Please fill all the fields",
        type: "error",
      };
    }
    if (password.length < 8) {
      return {
        message: "Password should be at least 8 characters long",
        type: "error",
      };
    }

    await axios.post(baseUrl + "/api/_v1/user/login", body, {
      withCredentials: true,
    });
    return {
      message: "Login successful",
      type: "success",
    };
  } catch (err) {
    const error = err as {
      response: {
        data: {
          error: {
            path: string;
          }[];
          mesage: string;
        };
      };
    };
    if (error.response.data.error) {
      try {
        let missing = "";
        error.response.data.error.map((e: { path: string }) => {
          missing += e.path + ", ";
        });
        return {
          message: missing + "is missing",
          type: "error",
        };
      } catch (err) {
        return {
          message: "An unexpected error occurred: ",
          type: "error",
        };
      }
    } else if (error.response.data.mesage) {
      console.log("error.response.data.mesage");
      return {
        message: error.response.data.mesage,
        type: "error",
      };
    } else {
      console.error(err);
      return {
        message: "An unexpected error occurred: ",
        type: "error",
      };
    }
  }
};
