import React from "react";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { DataGrid } from "@mui/x-data-grid";

const Verifieduser = () => {
  const state = useSelector((state) => state);

  const blockUser = async (user) => {
    await update(ref(db, "Accounts/" + user.uid), {
      isBlocked: !user?.isBlocked,
    });
  };

  const temp = state?.allAccounts
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
  const columns = [
    { field: "id", headerName: "S.no", width: 50, padding: "0 0 0 5px" },
    { field: "username", headerName: "User-name", width: 100 },
    { field: "Email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 90 },
    {
      field: "Action",
      width: 100,
      renderCell: (perams) => {
        return (
          <button onClick={() => blockUser(perams.row)}>
            {perams.row.isBlocked ? "unblock" : "block"}
          </button>
        );
      },
    },
  ];

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

export default Verifieduser;
