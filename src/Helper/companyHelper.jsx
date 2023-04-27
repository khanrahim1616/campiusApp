import { remove, ref } from "firebase/database";
import { db } from "../Firebaseconfig";
import { AiFillDelete, AiOutlineMan } from "react-icons/ai";
import Swal from "sweetalert2";

const appliedCheck = ({ row, state, setOpen, setStudentApplied }) => {
  const studentData = state?.appliedStudentData.filter((val) =>
    row?.studenIds?.some((item) => item === val.uid)
  );
  setOpen(true);
  setStudentApplied(studentData);
};

const dlete = ({ row, state, setAlert }) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't to delete this job!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await remove(ref(db, `Jobs/${state?.userData?.uid}/${row.jobId}`))
        .then(() => {
          setAlert({ isSuccess: true });
        })
        .catch((error) => {
          setAlert({ isNotSuccess: true });
        });
    }
  });
};

export const allJobsColumns = (state, setOpen, setStudentApplied, setAlert) => {
  const column = [
    { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
    { field: "JobCategory", headerName: "Job-category", width: 150 },
    { field: "Education", headerName: "Education", width: 100 },
    { field: "Experience", headerName: "Experience", width: 100 },
    {
      field: "Apply-check",
      width: 95,
      renderCell: ({ row }) => {
        return (
          <AiOutlineMan
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
