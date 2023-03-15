import { ref, update } from "firebase/database";
import { db } from "../Firebaseconfig";

const apply = async ({ row, state }) => {
  console.log(row);
  await update(ref(db, "Jobs/" + row?.companyId + "/" + row?.jobId), {
    appliedJobs: [...(row?.appliedJobs || []), state?.userData?.uid],
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

export const companyPostedJobsColumns = (state) => {
  const column = [
    { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
    { field: "companyName", headerName: "Company-Name", width: 150 },
    { field: "jobCategory", headerName: "Job-Category", width: 170 },
    { field: "education", headerName: "Education", width: 100 },
    { field: "experience", headerName: "Experience", width: 90 },
    {
      field: "Action",
      width: 90,
      renderCell: ({ row }) => {
        return <button onClick={() => apply({ row, state })}>Apply</button>;
      },
    },
  ];

  return column;
};

export const studentAppliedJobsColumns = [
  { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
  { field: "companyName", headerName: "Company-Name", width: 150 },
  { field: "jobCategory", headerName: "Job-Category", width: 170 },
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
