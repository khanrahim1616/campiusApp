import { ref, update } from "firebase/database";
import { db } from "../Firebaseconfig";
import { AiOutlineMan } from "react-icons/ai";
import Swal from "sweetalert2";

const apply = async ({ row, state, setAlert }) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't to apply this job!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Apply",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await update(ref(db, "Jobs/" + row?.companyId + "/" + row?.jobId), {
        appliedJobs: [...(row?.appliedJobs || []), state?.userData?.uid],
      })
        .then(() => {
          setAlert({ isSuccess: true });
        })
        .catch(() => {
          setAlert({ isNotSuccess: true });
        });
    }
  });
};

export const companyPostedJobsRow = (state) => {
  const row = state?.jobData?.map((item, i) => {
    return {
      id: i + 1,
      companyName: item.username,
      jobCategory: item.jobCategory,
      education: item.education,
      experience: item.experience,
      companyId: item.companyId,
      jobId: item.id,
      appliedJobs: item.appliedJobs,
    };
  });
  return row;
};

export const companyPostedJobsColumns = (state, setAlert) => {
  const column = [
    { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
    { field: "companyName", headerName: "Company-Name", width: 150 },
    { field: "jobCategory", headerName: "Job-Category", width: 190 },
    { field: "education", headerName: "Education", width: 100 },
    { field: "experience", headerName: "Experience", width: 90 },
    {
      field: "Apply",
      width: 60,
      renderCell: ({ row }) => {
        return (
          <AiOutlineMan
            style={{
              fontSize: "24px",
              color: "green",
              cursor: "pointer",
            }}
            onClick={() => apply({ row, state, setAlert })}
          />
        );
      },
    },
  ];

  return column;
};

export const studentAppliedJobsColumns = [
  { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
  { field: "companyName", headerName: "Company-Name", width: 150 },
  { field: "jobCategory", headerName: "Job-Category", width: 190 },
  { field: "education", headerName: "Education", width: 100 },
  { field: "experience", headerName: "Experience", width: 90 },
];

export const studentAppliedJobsRow = (state) => {
  const row = state?.appliedJobs?.map((item, i) => {
    return {
      id: i + 1,
      companyName: item.username,
      jobCategory: item.jobCategory,
      education: item.education,
      experience: item.experience,
    };
  });
  return row;
};
