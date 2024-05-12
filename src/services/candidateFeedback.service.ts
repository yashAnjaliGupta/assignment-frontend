import { ICandidateData } from "../models/candidateData.type";
import _get from "lodash/get";
export const addCandidateData = async (payload: ICandidateData,token:string) => {
  let apiResponse: { id: string; error: "" } = { id: "", error: "" };
  try {
    const response = await fetch("http://localhost:8080/addcandidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    const res = await response.json();
    if (!res.ok) {
      apiResponse.error = _get(res, "error", "");
    }
    apiResponse.id = _get(res, "id", "");
  } catch (error) {
    apiResponse.error = _get(error, "error", "");
  }
  return apiResponse;
};
export const updateCandidateData = async (payload: ICandidateData,token:string) => {
  let apiResponse: { message: string; error: "" } = { message: "", error: "" };
  try {
    const response = await fetch(`http://localhost:8080/candidates/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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
export const deleteCandidateData = async (id: string,token:string) => {
  let apiResponse: { message: string; error: "" } = { message: "", error: "" };
  try {
    const response = await fetch(`http://localhost:8080/candidates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
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
export const getCandidateData = async (token: string) => {
  let apiResponse: { data: ICandidateData[]; error: "" } = {
    data: [],
    error: "",
  };
  const candidateDataReader = (res) => {
    const data: ICandidateData[] = res.map((ele) => {
      return {
        id: _get(ele, "ID", ""),
        candidateName: _get(ele, "Candidatename", ""),
        interviewStatus: _get(ele, "InterviewStatus", false),
        interviewFeedback: _get(ele, "InterviewFeedback", ""),
        rating: _get(ele, "InterviewRating", 0),
        createdAt: _get(ele, "CreatedAt", ""),
      };
    });
    return data;
  };
  try {
    const response = await fetch("http://localhost:8080/candidates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    if (!res.ok) {
      apiResponse.error = _get(res, "error", "");
    }
    apiResponse.data = candidateDataReader(res ?? []);
  } catch (error) {
    apiResponse.error = _get(error, "error", "");
  }
  return apiResponse;
};
