//Material ui Modal

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

//Material ui Table

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

export const Modall = ({ setOpen, open, data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          <h1
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
          </h1>
          {data?.length ? (
            <>
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
                    {data
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, i) => {
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
              {data?.length > 5 && (
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={data?.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </>
          ) : (
            <h2 className="noStudent">No student Applied on this job</h2>
          )}
        </Box>
      </Modal>
    </div>
  );
};
