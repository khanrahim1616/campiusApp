import { ref, update } from "firebase/database";
import { db } from "../Firebaseconfig";
import { RiContactsBookUploadLine } from "react-icons/ri";
import Swal from "sweetalert2";

const apply = async ({ row, state, setAlert }) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to apply this job!",
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
    { field: "id", headerName: "S.no", width: 70, padding: "0 0 0 5px" },
    { field: "companyName", headerName: "Company-Name", width: 240 },
    { field: "jobCategory", headerName: "Job-Category", width: 200 },
    { field: "education", headerName: "Education", width: 200 },
    { field: "experience", headerName: "Experience", width: 150 },
    {
      field: "Apply",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <RiContactsBookUploadLine
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
  { field: "id", headerName: "S.no", width: 70, padding: "0 0 0 5px" },
  { field: "companyName", headerName: "Company-Name", width: 240 },
  { field: "jobCategory", headerName: "Job-Category", width: 200 },
  { field: "education", headerName: "Education", width: 200 },
  { field: "experience", headerName: "Experience", width: 240 },
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
