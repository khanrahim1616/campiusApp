import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "antd";
import { ref, push } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { GET_FIREBASE_DATA } from "../../reducer/types";

const CompanyJobPost = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const [jobPostData, setJobPostData] = useState({});
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  //  INPUT REFRENCES
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    setJobPostData({ ...jobPostData, ...input });
  };

  const PostJobDetails = async (e) => {
    e.preventDefault();

    await push(ref(db, "Jobs/" + state?.userData?.uid), {
      jobCategory: jobPostData?.JobCategory.trim(),
      jobAddress: jobPostData?.Address.trim(),
      experience: experience,
      education: education,
    });
    inputRef1.current.value = "";
    inputRef2.current.value = "";
    setEducation("");
    setExperience("");
    setJobPostData({});
  };

  const signedOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: GET_FIREBASE_DATA,
          payload: false,
        });
      })
      .catch((error) => {});
  };
  return (
    <>
      <div>
        <Link to="/">Company</Link>
        <br />
        <Link to="/CompanyPostedJob">CompanyPostedJob</Link>
        <br />
        <button onClick={signedOut}>Logout</button>

        <div>
          <form className=" companyJobPostForm" onSubmit={PostJobDetails}>
            <h1>Job Details</h1>
            <input
              required
              ref={inputRef1}
              maxLength={10}
              placeholder="Job Category"
              name="JobCategory"
              onChange={(e) => getData(e)}
            />
            <input
              required
              maxLength={40}
              ref={inputRef2}
              placeholder="Address"
              name="Address"
              onChange={(e) => getData(e)}
            />
            <span>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Experience
                </option>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </span>
            <span>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Education
                </option>
                <option value="Matric">Matric</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Graduation">Graduation</option>
                <option value="Masters">Masters</option>
              </select>
            </span>
            <span>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !jobPostData?.JobCategory?.trim() ||
                  !jobPostData?.Address?.trim() ||
                  !education ||
                  !experience
                }
              >
                Post
              </Button>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyJobPost;
