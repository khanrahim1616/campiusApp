import React from "react";
import { useState, useRef } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../Firebaseconfig";
import { useSelector } from "react-redux";
import { BiCommentDetail } from "react-icons/bi";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import "./company&JobPost.css";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";

const CompanyJobPost = () => {
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState(false);
  const [jobPostData, setJobPostData] = useState({});
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  //  INPUT REFRENCE
  const inputRef1 = useRef();

  const getData = (e) => {
    let input = { [e.target.name]: e.target.value };
    setJobPostData({ ...jobPostData, ...input });
  };

  const PostJobDetails = async (e) => {
    e.preventDefault();
    await push(ref(db, "Jobs/" + state?.userData?.uid), {
      jobCategory: jobPostData?.JobCategory?.trim(),
      experience: experience,
      education: education,
    })
      .then(() => {
        setAlert({ isSuccess: true });
      })
      .catch((error) => {
        setAlert({ isNotSuccess: true });
      });
    inputRef1.current.value = "";
    setEducation("");
    setExperience("");
    setJobPostData({});
  };

  let disableCondition =
    !jobPostData?.JobCategory?.trim() || !education || !experience;

  return (
    <>
      <div>
        <Navbar />
        <div className="JobPostDiv">
          <form className="JobPostForm">
            <h1 className="formHeading">
              <BiCommentDetail />
              <i>: Job-Details</i>
            </h1>
            <label htmlFor="Job_category">Category:</label>
            <input
              className="selectOptions"
              id="Job_category"
              ref={inputRef1}
              maxLength={18}
              placeholder="Please enter category"
              name="JobCategory"
              onChange={(e) => getData(e)}
            />
            <label htmlFor="experience">Experience:</label>
            <span>
              <select
                id="experience"
                className="selectOptions"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Please select experience
                </option>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </span>
            <label htmlFor="education">Education:</label>
            <span>
              <select
                id="education"
                className="selectOptions"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Please select education
                </option>
                <option value="Matric">Matric</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Graduation">Graduation</option>
                <option value="Masters">Masters</option>
              </select>
            </span>
            <span style={{ textAlign: "end" }}>
              <Button
                className={!disableCondition ? "ButtonReuse" : "opacity1"}
                disabled={disableCondition}
                onClick={PostJobDetails}
                btnText={"Post"}
              />
            </span>
          </form>
        </div>
        {!!alert?.isSuccess && (
          <SuccessAlert
            message={"Job posted successfully"}
            open={!!alert?.isSuccess}
            onClose={() => {
              setAlert(false);
            }}
          />
        )}
        {!!alert?.isNotSuccess && (
          <ErrorAlert
            message={"Something went wrong"}
            open={!!alert?.isNotSuccess}
            onClose={() => {
              setAlert(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default CompanyJobPost;
