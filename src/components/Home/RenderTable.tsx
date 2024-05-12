import React from "react";
import { Table } from "antd";
import { ICandidateData } from "../../models/candidateData.type";
import { columnsConfig } from "./TableColumnConfig.tsx";
import "./table.css"


interface ComponentProps {
  candidateData: ICandidateData[];
  handleOnUpdate: (
    columnKey: string,
    val: string | number | boolean,
    record: ICandidateData
  ) => void;
  handleOnDelete: (record: ICandidateData) => void;
}

const RenderTable: React.FC<ComponentProps> = ({
  candidateData,
  handleOnUpdate,
  handleOnDelete,
}) => {
  const dataSource = candidateData.map((item, index) => ({
    ...item,
    key: index.toString(), // Assuming index can serve as a unique identifier
  }));

  return (
    <Table
      columns={columnsConfig(handleOnUpdate, handleOnDelete)}
      dataSource={dataSource}
      
    />
  );
};

export default RenderTable;