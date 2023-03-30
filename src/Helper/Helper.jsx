import { getAuth, signOut } from "firebase/auth";
import { logOut } from "../reducer/action";
import Swal from "sweetalert2";

export const SignedOut = (dispatch) => {
  const auth = getAuth();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't to logout!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      signOut(auth)
        .then(() => {
          dispatch(logOut());
        })
        .catch((error) => {
          alert(error);
        });
    }
  });
};
