import React from "react";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { DataGrid } from "@mui/x-data-grid";

const UnVerifiedUser = () => {
  const state = useSelector((state) => state);

  const verifyUser = async (user) => {
    await update(ref(db, "Accounts/" + user.uid), {
      isVerified: true,
    });
  };

  const columns = [
    { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
    { field: "username", headerName: "User-name", width: 100 },
    { field: "Email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 90 },
    {
      field: "Action",
      width: 90,
      renderCell: (perams) => {
        return <button onClick={() => verifyUser(perams.row)}>Verify</button>;
      },
    },
  ];

  const temp = state?.allAccounts
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

  return (
    <>
      <div className="tableContainer">
        <div style={{ height: 400, width: "100%", margin: "0 auto" }}>
          <DataGrid
            columns={columns}
            rows={temp}
            pageSize={5}
            // rowsPerPageOptions={[5, 10]}
          />
        </div>
      </div>
    </>
  );
};

export default UnVerifiedUser;
