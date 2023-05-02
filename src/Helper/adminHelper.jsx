import { update, ref } from "firebase/database";
import { db } from "../Firebaseconfig";
import Button from "../components/Button";

// unVerified users row,column & verify function

const verifyUser = async (user, setAlert) => {
  await update(ref(db, "Accounts/" + user.uid), {
    isVerified: true,
  })
    .then(() => {
      setAlert({ isSuccess: true, message: "User verified" });
    })
    .catch(() => {
      setAlert({ isNotSuccess: true });
    });
};

export const unVerifiedUsersColumns = (setAlert) => [
  { field: "id", headerName: "S.no", width: 25, padding: "0 0 0 5px" },
  { field: "username", headerName: "User-name", width: 100 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "role", headerName: "Role", width: 90 },
  {
    field: "Action",
    width: 90,
    renderCell: ({ row }) => {
      return (
        <Button
          onClick={() => verifyUser(row, setAlert)}
          className={"ButtonReuse"}
          btnText={"Verify"}
        />
      );
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

const blockUser = async (user, setAlert) => {
  await update(ref(db, "Accounts/" + user.uid), {
    isBlocked: !user?.isBlocked,
  })
    .then(() => {
      setAlert({
        isSuccess: true,
        message: `User ${user?.isBlocked ? "unblocked" : "blocked"}`,
      });
    })
    .catch(() => {
      setAlert({ isNotSuccess: true });
    });
};

export const verifiedUsersColumns = (setAlert) => [
  { field: "id", headerName: "S.no", width: 50, padding: "0 0 0 5px" },
  { field: "username", headerName: "User-name", width: 100 },
  { field: "Email", headerName: "Email", width: 170 },
  { field: "role", headerName: "Role", width: 90 },
  {
    field: "Action",
    width: 90,
    renderCell: ({ row }) => {
      return (
        <Button
          onClick={() => blockUser(row, setAlert)}
          className={"ButtonReuse"}
          btnText={row?.isBlocked ? "unblock" : "block"}
        />
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
