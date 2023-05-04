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
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

const Tabss = () => {
  const [alert, setAlert] = useState(false);

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
      column: verifiedUsersColumns(),
      row: verifiedUsersRow(state, setAlert),
    },
    {
      column: unVerifiedUsersColumns(),
      row: unVerifiedUsersRow(state, setAlert),
    },
  ];

  return (
    <div>
      <Tabs value={tabs} onChange={(_, val) => setTabs(val)}>
        <Tab
          style={{
            textTransform: "none",
          }}
          label="All-Users"
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
      {!!alert?.isSuccess && (
        <SuccessAlert
          message={alert.message}
          open={!!alert?.isSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
      {!!alert?.isNotSuccess && (
        <ErrorAlert
          message={"Something went wrong"}
          open={!!alert?.isNotSuccess}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
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
