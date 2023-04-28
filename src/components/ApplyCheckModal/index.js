//Material ui Modal

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

//Material ui Table

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Modall = ({ setOpen, open, data }) => {
  return (
    <div>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: 200,
              sm: 400,
              md: 400,
              lg: 600,
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdOutlineKeyboardBackspace
              className="modalCloseIcon"
              onClick={() => setOpen(false)}
            />
            Student's list
          </h2>
          {data?.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.no</TableCell>
                    <TableCell align="center">Username</TableCell>
                    <TableCell align="center">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">
                          {item?.username}
                          <span style={{ color: "red" }}>
                            {item?.isBlocked && " (blocked)"}
                          </span>
                        </TableCell>
                        <TableCell align="center">{item?.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h2 className="noStudent">No student Applied on this job</h2>
          )}
        </Box>
      </Modal>
    </div>
  );
};
