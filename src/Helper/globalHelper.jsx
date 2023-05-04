import { getAuth, signOut } from "firebase/auth";
import { logOut } from "../reducer/action";
import Swal from "sweetalert2";

export const SignedOut = (dispatch) => {
  const auth = getAuth();
  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "green",
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

export const passwordVisible = () => {
  var x = document.getElementById("Password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
};
