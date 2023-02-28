import React, { useState } from "react";
import UnVerifiedUser from "./UnVerifiedUser";
import Verifieduser from "./Verifieduser";
import { Tab, Tabs } from "@mui/material";

const Tabss = () => {
  const [tabs, setTabs] = useState(0);
  const CurrentComponent = ({ index }) => {
    let comp = [<Verifieduser />, <UnVerifiedUser />];
    return comp[index];
  };

  function a11yProps(i) {
    return {
      id: `simple-tab-${i}`,
      "aria-controls": `simple-tabpanel-${i}`,
    };
  }

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
      <CurrentComponent index={tabs} />
    </div>
  );
};

export default Tabss;
