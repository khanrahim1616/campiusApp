import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import {
  verifiedUsersColumns,
  verifiedUsersRow,
  unVerifiedUsersColumns,
  unVerifiedUsersRow,
} from "../../Helper/adminHelper";
import GridTable from "../../components/GridTable";

const Tabss = () => {
  const [tabs, setTabs] = useState(0);

  const state = useSelector((state) => state);

  function a11yProps(i) {
    return {
      id: `simple-tab-${i}`,
      "aria-controls": `simple-tabpanel-${i}`,
    };
  }

  var data = [
    {
      column: verifiedUsersColumns,
      row: verifiedUsersRow(state),
    },
    {
      column: unVerifiedUsersColumns,
      row: unVerifiedUsersRow(state),
    },
  ];

  return (
    <div>
      <Tabs value={tabs} onChange={(_, val) => setTabs(val)}>
        <Tab
          style={{
            textTransform: "none",
          }}
          label="Verified-Users"
          {...a11yProps(0)}
        />
        <Tab
          style={{
            textTransform: "none",
          }}
          label="UnVerified-Users"
          {...a11yProps(1)}
        />
      </Tabs>
      <CurrentComponent index={tabs} data={data} />
    </div>
  );
};
export default Tabss;

const CurrentComponent = ({ index, data }) => {
  let comp = [
    <GridTable data={data[index]} />,
    <GridTable data={data[index]} />,
  ];
  return comp[index];
};
