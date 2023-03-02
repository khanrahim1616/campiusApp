import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import {
  companyPostedJobsColumns,
  studentAppliedJobsColumns,
} from "../../Helper/studentHelper";
import GridTable from "../components/GridTable";

const Jobs = () => {
  const [tabs, setTabs] = useState(0);

  const state = useSelector((state) => state);

  const studentAppliedJobsRow = state?.appliedJobs?.map((item, i) => {
    return {
      id: i + 1,
      companyName: item.username,
      jobCategory: item.jobCategory,
      education: item.education,
      experience: item.experience,
    };
  });

  const companyPostedJobsRow = state?.jobData?.map((item, i) => {
    return {
      id: i + 1,
      companyName: item.username,
      jobCategory: item.jobCategory,
      education: item.education,
      experience: item.experience,
      companyId: item.companyId,
      jobId: item.id,
      appliedJobs: item.appliedJobs,
    };
  });

  function a11yProps(i) {
    return {
      id: `simple-tab-${i}`,
      "aria-controls": `simple-tabpanel-${i}`,
    };
  }

  var data = [
    {
      row: companyPostedJobsRow,
      column: companyPostedJobsColumns(state),
    },
    {
      row: studentAppliedJobsRow,
      column: studentAppliedJobsColumns,
    },
  ];

  return (
    <div>
      <Tabs value={tabs} onChange={(_, val) => setTabs(val)}>
        <Tab
          style={{
            textTransform: "none",
          }}
          label="Jobs"
          {...a11yProps(0)}
        />
        <Tab
          style={{
            textTransform: "none",
          }}
          label="Applied-Jobs"
          {...a11yProps(1)}
        />
      </Tabs>
      <CurrentComponent index={tabs} data={data} />
    </div>
  );
};
export default Jobs;

const CurrentComponent = ({ index, data }) => {
  let comp = [
    <GridTable data={data[index]} />,
    <GridTable data={data[index]} />,
  ];
  return comp[index];
};
