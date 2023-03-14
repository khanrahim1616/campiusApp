import { update, ref } from "firebase/database";
import { db } from "../Firebaseconfig";

// unVerified users row,column & verify function

const verifyUser = async (user) => {
  await update(ref(db, "Accounts/" + user.uid), {
    isVerified: true,
  });
};

export const unVerifiedUsersColumns = [
  { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
  { field: "username", headerName: "User-name", width: 100 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "role", headerName: "Role", width: 90 },
  {
    field: "Action",
    width: 90,
    renderCell: (perams) => {
      return <button onClick={() => verifyUser(perams.row)}>Verify</button>;
    },
  },
];

export const unVerifiedUsersRow = (state) => {
  const row = state?.allAccounts
    ?.filter((val) => !val.isVerified)
    .map((item, i) => {
      return {
        id: i + 1,
        username: item.username,
        Email: item.email,
        role: item.role,
        isBlocked: item.isBlocked,
        uid: item.uid,
        isVerified: item.isVerified,
      };
    });
  return row;
};

// verified users row,column & Block function

const blockUser = async (user) => {
  await update(ref(db, "Accounts/" + user.uid), {
    isBlocked: !user?.isBlocked,
  });
};

export const verifiedUsersColumns = [
  { field: "id", headerName: "S.no", width: 50, padding: "0 0 0 5px" },
  { field: "username", headerName: "User-name", width: 100 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "role", headerName: "Role", width: 90 },
  {
    field: "Action",
    width: 90,
    renderCell: (perams) => {
      return (
        <button onClick={() => blockUser(perams.row)}>
          {perams.row.isBlocked ? "unblock" : "block"}
        </button>
      );
    },
  },
];

export const verifiedUsersRow = (state) => {
  const row = state?.allAccounts
    ?.filter((val) => val.isVerified)
    .map((item, i) => {
      return {
        id: i + 1,
        username: item.username,
        Email: item.email,
        role: item.role,
        isBlocked: item.isBlocked,
        uid: item.uid,
        isVerified: item.isVerified,
      };
    });
  return row;
};
