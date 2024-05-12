import {
  ILoginCredentials,
  ILoginResponse,
  ISignUpResponse,
} from "../models/loginCredential.type";
import _get from "lodash/get";

export const loginRequest = async (payload: ILoginCredentials) => {
  let apiResponse: ILoginResponse = { token: "", error: "" };
  try {
    const response = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (!res.ok) {
      apiResponse.error = _get(res, "error", "");
    }
    apiResponse.token = _get(res, "token", "");
  } catch (error) {
    apiResponse.error = _get(error, "error", "");
  }
  return apiResponse;
};
export const signupRequest = async (payload: ILoginCredentials) => {
  let apiResponse: ISignUpResponse = { message: "", error: "" };
  try {
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (!res.ok) {
      apiResponse.error = _get(res, "error", "");
    }
    apiResponse.message = _get(res, "message", "");
  } catch (error) {
    apiResponse.error = _get(error, "error", "");
  }
  return apiResponse;
};
