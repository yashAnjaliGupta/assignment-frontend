import React, { useEffect, useState } from "react";
import {
  addCandidateData,
  deleteCandidateData,
  getCandidateData,
  updateCandidateData,
} from "../../services/candidateFeedback.service.ts";
import { ICandidateData } from "../../models/candidateData.type";
import RenderTable from "./RenderTable.tsx";
import AddRecord from "../AddRecord/AddRecord.tsx";
import "./homeComp.css";


const HomeComp: React.FC = () => {
  const token = localStorage.getItem("token");
  const [candidateData, setCandidateData] =
    useState<ICandidateData[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleOnGetCandidateData = async (token: string | null) => {
    let response;
    if (token) {
      response = await getCandidateData(token);
      if (!response.error) {
        setCandidateData(response.data);
        setIsUpdate(false);
        console.log(response)
        console.log(candidateData)
      }
    }
  };
  useEffect(() => {
    handleOnGetCandidateData(token);
  }, [isUpdate]);

  const handleOnUpdate = async (
    columnKey: string,
    val: string | number | boolean,
    record: ICandidateData
  ) => {
    const updateRecord = {
      ...record,
      [columnKey]: val,
    };
    const response = await updateCandidateData(updateRecord,token??"");
    if (!response.error) setIsUpdate(true);
  };
  const handleOnDelete = async (record: ICandidateData) => {
    const response = await deleteCandidateData(record.id ?? "",token??"");
    if (!response.error) setIsUpdate(true);
  };
  const handleOnAdd = async (val) => {
    const response = await addCandidateData(val,token??"");
    if (!response.error) setIsUpdate(true);
  };
  return (
    <div className="home-comp">
      <AddRecord handleOnSubmit={handleOnAdd} />
      <RenderTable
        candidateData={candidateData}
        handleOnDelete={handleOnDelete}
        handleOnUpdate={handleOnUpdate}
      />
    </div>
  );
};

export default HomeComp;
