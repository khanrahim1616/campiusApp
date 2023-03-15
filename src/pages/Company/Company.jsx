import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modall } from "../components/companyApplyCheckModal";
import { allJobsColumns, allJobsRow } from "../../Helper/companyHelper";
import Navbar from "../components/Navbar";
import GridTable from "../components/GridTable";

const Company = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [studentApplied, setStudentApplied] = useState();

  var data = {
    row: allJobsRow(state),
    column: allJobsColumns(state, setOpen, setStudentApplied),
  };

  return (
    <div>
      <Navbar />
      <div>
        <GridTable data={data} />
      </div>
      {open && <Modall setOpen={setOpen} open={open} data={studentApplied} />}
    </div>
  );
};

export default Company;

// {
//   //   state?.jobData?.length && (
//   //     <div className="tableContainer">
//   //       <h3 style={{ textAlign: "center" }}>Jobs</h3>
//   //       <TableContainer component={Paper}>
//   //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//   //           <TableHead>
//   //             <TableRow>
//   //               <TableCell>S.no</TableCell>
//   //               <TableCell>Job-category</TableCell>
//   //               <TableCell>Education</TableCell>
//   //               <TableCell>Experience</TableCell>
//   //               <TableCell>Apply-check</TableCell>
//   //               <TableCell>Delete-job</TableCell>
//   //             </TableRow>
//   //           </TableHead>
//   //           <TableBody>
//   //             {state?.jobData.map((item, i) => {
//   //               return (
//   //                 <TableRow
//   //                   key={i}
//   //                   sx={{
//   //                     "&:last-child td, &:last-child th": { border: 0 },
//   //                   }}
//   //                 >
//   //                   <TableCell component="th" scope="row">
//   //                     {i + 1}
//   //                   </TableCell>
//   //                   <TableCell>{item.jobCategory}</TableCell>
//   //                   <TableCell>{item.education}</TableCell>
//   //                   <TableCell>{item.experience}</TableCell>
//   //                   <TableCell onClick={() => appliedCheck(item.appliedJobs)}>
//   //                     action
//   //                   </TableCell>
//   //                   <TableCell onClick={() => dlete(item.id)}>Delete</TableCell>
//   //                 </TableRow>
//   //               );
//   //             })}
//   //           </TableBody>
//   //         </Table>
//   //       </TableContainer>
//   //     </div>
//   //   );
// }
