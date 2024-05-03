import axios from "axios";
import { baseUrl } from "../config";

export const handleRegister = async (
  email: string,
  password: string,
  rePassword: string
) => {
  if (password !== rePassword) {
    return {
      message: "Passwords do not match",
      type: "error",
    };
  }
  if (password.length < 8) {
    return {
      message: "Password must be at least 8 characters",
      type: "error",
    };
  }

  const body = { email, password, rePassword };

  try {
    const res = await axios.post(baseUrl + "/api/_v1/user/register", body, {
      withCredentials: true,
    });
    return {
      message: res.data.message,
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
    console.log(err);
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
        console.log("An unexpected error occurred: ");
      }
    } else if (error.response.data.mesage) {
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
