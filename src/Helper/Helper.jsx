import { getAuth, signOut } from "firebase/auth";
import { logOut } from "../reducer/action";
export const SignedOut = (dispatch) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(logOut());
    })
    .catch((error) => {
      alert(error);
    });
};
