import React from "react";
import { useState, useRef } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { BiCommentDetail } from "react-icons/bi";


const CompanyJobPost = () => {
  const state = useSelector((state) => state);
  const [jobPostData, setJobPostData] = useState({});
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  //  INPUT REFRENCES

  const inputRef1 = useRef();

  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    setJobPostData({ ...jobPostData, ...input });
  };

  const PostJobDetails = async (e) => {
    e.preventDefault();

    await push(ref(db, "Jobs/" + state?.userData?.uid), {
      jobCategory: jobPostData?.JobCategory.trim(),
      experience: experience,
      education: education,
    });
    inputRef1.current.value = "";
    setEducation("");
    setExperience("");
    setJobPostData({});
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="JobPostDiv">
          <form onSubmit={PostJobDetails}>
            <h1 className="formHeading">  <BiCommentDetail/><i>:  Job-Details</i></h1>
            <label htmlFor="Job_category"><b> Job-Category: </b></label>
            <input
              required
              id="Job_category"
              ref={inputRef1}
              maxLength={18}
              placeholder="Job Category"
              name="JobCategory"
              onChange={(e) => getData(e)}
            />
            <br />
            <span>
              <select
                className="selsctOptions"
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
            <br />
            <span>
              <select
                className="selsctOptions"
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
              <button
              className="postJobBtn"
                type="submit"
                disabled={
                  !jobPostData?.JobCategory?.trim() || !education || !experience
                }
              >
                Post
              </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanyJobPost;
