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
import { Link } from "react-router-dom";

const CompanyJobPost = () => {
  const state = useSelector((state) => state);
  const [alert, setAlert] = useState(false);
  const [JobCategory, setJobCategory] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");

  //  INPUT REFRENCE
  const inputRef1 = useRef();

  const PostJobDetails = async (e) => {
    e.preventDefault();
    await push(ref(db, "Jobs/" + state?.userData?.uid), {
      jobCategory: JobCategory?.trim(),
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
    setJobCategory("");
  };

  let disableCondition = !JobCategory || !education || !experience;

  return (
    <>
      <div>
        <Navbar />
        <div className="JobPostDiv">
          <form className="formDiv">
            <h2 className="formHeading">
              <BiCommentDetail />
              <i>&nbsp;&nbsp;Job-Details</i>
            </h2>
            <label htmlFor="Job_category">Category:</label>
            <Input
              className="selectOptions Input inputWidth "
              id="Job_category"
              ref={inputRef1}
              maxLength={18}
              value={JobCategory}
              placeholder="Please enter category"
              name="JobCategory"
              onChange={(e) => {
                setJobCategory(e?.target?.value?.trimStart());
              }}
            />
            <label htmlFor="experience">Experience:</label>
            <span>
              <select
                id="experience"
                className="selectOptions Input inputWidth"
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
                className="selectOptions Input inputWidth"
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
                className={
                  !disableCondition ? "ButtonReuse button" : "opacity1 button"
                }
                disabled={disableCondition}
                onClick={PostJobDetails}
                btnText={"Submit"}
              />
            </span>
            <p>
              If you want to preview posted jobs :
              <span>
                <Link className="link" to="/">
                  Click here
                </Link>
              </span>
            </p>
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
