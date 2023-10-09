import { remove, ref } from "firebase/database";
import { db } from "../Firebaseconfig";
import { TbUserCheck } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const appliedCheck = ({ row, state, setOpen, setStudentApplied }) => {
  const studentData = state?.appliedStudentData.filter((val) =>
    row?.studenIds?.some((item) => item === val.uid)
  );
  setOpen(row);
  setStudentApplied(studentData);
};

const dlete = ({ row, state, setAlert }) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this job!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await remove(ref(db, `Jobs/${state?.userData?.uid}/${row.jobId}`))
        .then(() => {
          setAlert({ isSuccess: true });
        })
        .catch(() => {
          setAlert({ isNotSuccess: true });
        });
    }
  });
};

export const allJobsColumns = (state, setOpen, setStudentApplied, setAlert) => {
  const column = [
    { field: "id", headerName: "S.no", width: 70, padding: "0 0 0 5px" },
    { field: "JobCategory", headerName: "Job-category", width: 240 },
    { field: "Education", headerName: "Education", width: 200 },
    { field: "Experience", headerName: "Experience", width: 200 },
    {
      field: "Apply-check",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <TbUserCheck
            style={{
              fontSize: "24px",
              color: "green",
              cursor: "pointer",
            }}
            onClick={() =>
              appliedCheck({ row, state, setOpen, setStudentApplied })
            }
          />
        );
      },
    },
    {
      field: "Delete-job",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <AiFillDelete
            style={{
              fontSize: "24px",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => dlete({ row, state, setAlert })}
          />
        );
      },
    },
  ];

  return column;
};

export const allJobsRow = (state) => {
  const row = state?.jobData?.map((item, i) => {
    return {
      id: i + 1,
      JobCategory: item.jobCategory,
      Education: item.education,
      Experience: item.experience,
      jobId: item.id,
      studenIds: item.appliedJobs,
    };
  });
  return row;
};
