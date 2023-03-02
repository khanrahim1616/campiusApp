import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import {
  verifiedUsersColumns,
  unVerifiedUsersColumns,
} from "../../Helper/adminHelper";
import GridTable from "../components/GridTable";

const Tabss = () => {
  const [tabs, setTabs] = useState(0);

  const state = useSelector((state) => state);
  const verifiedUsersRow = state?.allAccounts
    ?.filter((val) => val.isVerified)
    .map((item, i) => {
      return {
        id: i + 1,
        username: item.username,
        Email: item.email,
        role: item.role,
        isBlocked: item.isBlocked,
        uid: item.uid,
        isVerified: item.isVerified,
      };
    });

  const unVerifiedUsersRow = state?.allAccounts
    ?.filter((val) => !val.isVerified)
    .map((item, i) => {
      return {
        id: i + 1,
        username: item.username,
        Email: item.email,
        role: item.role,
        isBlocked: item.isBlocked,
        uid: item.uid,
        isVerified: item.isVerified,
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
      row: verifiedUsersRow,
      column: verifiedUsersColumns,
    },
    {
      row: unVerifiedUsersRow,
      column: unVerifiedUsersColumns,
    },
  ];

  return (
    <div>
      <Tabs value={tabs} onChange={(_, val) => setTabs(val)}>
        <Tab
          style={{
            textTransform: "none",
          }}
          label="Verified Users"
          {...a11yProps(0)}
        />
        <Tab
          style={{
            textTransform: "none",
          }}
          label="UnVerified Users"
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
