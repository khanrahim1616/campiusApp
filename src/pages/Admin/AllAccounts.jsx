import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { update, ref } from "firebase/database";
import { db } from "../../Firebaseconfig";
import {
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";

import Paper from "@mui/material/Paper";

const AllAccounts = () => {
  const state = useSelector((state) => state);

  const blockUser = async (user) => {
    await update(ref(db, "Accounts/" + user.uid), {
      isBlocked: !user?.isBlocked,
    });
  };

  useEffect(() => {}, []);

  return (
    <div className="tableContainer">
      <h1 style={{ textAlign: "center" }}>All Users</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell align="right">user name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.allAccounts?.map((item, i) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="right">{item.username}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.role}</TableCell>
                  <TableCell align="right" onClick={() => blockUser(item)}>
                    {item.isBlocked ? "unblock" : "block"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllAccounts;
