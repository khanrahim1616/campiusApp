import { remove, ref } from "firebase/database";
import { db } from "../Firebaseconfig";

const appliedCheck = ({ row, state, setOpen, setStudentApplied }) => {
  const studentData = state?.appliedStudentData.filter((val) =>
    row?.studenIds?.some((item) => item === val.uid)
  );
  setOpen(true);
  setStudentApplied(studentData);
};

const dlete = async ({ row, state }) => {
  await remove(ref(db, `Jobs/${state?.userData?.uid}/${row.jobId}`))
    .then(() => {})
    .catch((error) => {
      console.log(error.message);
    });
};

export const allJobsColumns = (state, setOpen, setStudentApplied) => {
  const column = [
    { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
    { field: "JobCategory", headerName: "Job-category", width: 150 },
    { field: "Education", headerName: "Education", width: 170 },
    { field: "Experience", headerName: "Experience", width: 100 },
    {
      field: "Apply-check",
      width: 100,
      renderCell: ({ row }) => {
        return (
          <button
            onClick={() =>
              appliedCheck({ row, state, setOpen, setStudentApplied })
            }
          >
            Apply-check
          </button>
        );
      },
    },
    {
      field: "Delete-job",
      width: 90,
      renderCell: ({ row }) => {
        return <button onClick={() => dlete({ row, state })}>Delete</button>;
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
