import React, { useState } from "react";
import "./registerForm.css";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loaderImg from "../images/Eclipse-1s-200px.svg";
import validator from "validator";

toast.configure();

function RegisterForm() {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    country_code: "+1",
    phone: "",
    timezone: "( UTC - 5 ) Eastern Standard Time",
    grade: "",
    isparent: false,
  });

  const [isContactValid, setIsContactValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const URL =
    "https://her-shreersc-express-server.herokuapp.com/v1/admin/registerStudent";

  const handleFormSubbmit = (e) => {
    console.log("yes");
    e.preventDefault();
    setShowLoader(true);
    axios
      .post(URL, registerInfo)
      .then((res) => {
        setShowLoader(false);
        toast.success(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        setRegisterInfo({
          name: "",
          email: "",
          dateOfBirth: "",
          country_code: "+1",
          phone: "",
          timezone: "( UTC - 5 ) Eastern Standard Time",
          grade: "",
          isparent: false,
        });
        setIsEmailValid(false);
      })
      .catch((err) => {
        setShowLoader(false);
        toast.error(err);
      });
  };

  const handleNameChange = (e) => {
    setRegisterInfo({ ...registerInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setRegisterInfo({ ...registerInfo, email: e.target.value });
    validator.isEmail(e.target.value)
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  const handleDateChange = (date) => {
    // console.log(day === undefined ? "invalid" : "valid");
    if (date === undefined) {
      setIsDateValid(false);
    } else {
      setIsDateValid(true);
      setRegisterInfo({
        ...registerInfo,
        dateOfBirth: date.toLocaleDateString(),
      });
    }
    // setIsDateValid(day === undefined ? false : true);
  };

  const handleSelectFlag = (...dialCodeInfo) => {
    dialCodeInfo[3] ? setIsContactValid(true) : setIsContactValid(false);
    setRegisterInfo({
      ...registerInfo,
      country_code: `+${dialCodeInfo[1].dialCode}`,
    });
  };

  const handlePhoneNumberChange = (...phonNoInfo) => {
    phonNoInfo[0] ? setIsContactValid(true) : setIsContactValid(false);
    setRegisterInfo({ ...registerInfo, phone: phonNoInfo[1] });
  };

  const handleTimeZoneChange = (e) => {
    setRegisterInfo({ ...registerInfo, timezone: e.target.value });
  };

  const handleClassChange = (e) => {
    setRegisterInfo({ ...registerInfo, grade: e.target.value });
  };

  const handleCheck = (e) => {
    setRegisterInfo({ ...registerInfo, isparent: e.target.checked });
  };

  const {
    name,
    email,
    dateOfBirth,
    phone,
    country_code,
    isparent,
    timezone,
    grade,
  } = registerInfo;

  return (
    <div className="form__container">
      {showLoader && (
        <div className="loader__box">
          <span>Wait.</span>
          <img src={loaderImg} alt="" />
        </div>
      )}
      <div className="form__left"></div>
      <div className="form__right">
        <div>
          <h1 className="form__heading">Register a new Student</h1>
          <h3>Personal Details:</h3>
          <form>
            <input
              type="text"
              name="name"
              value={registerInfo.name}
              placeholder="Enter Student Name"
              onChange={(e) => handleNameChange(e)}
              autoComplete="off"
            />
            <div className="daypickerinput__container">
              <DayPickerInput
                onDayChange={(e) => handleDateChange(e)}
                placeholder="date-of-birth: YYYY-MM-DD"
              />
              {isDateValid ? (
                <span className="valid__msg">&#10004;valid</span>
              ) : (
                <span className="invalid__msg" style={{ right: "-170px" }}>
                  X invalid date formate
                </span>
              )}
            </div>
            <select
              name="timezone"
              value={registerInfo.timezone}
              onChange={handleTimeZoneChange}
            >
              <option value="( UTC - 5 ) Eastern Standard Time">
                ( UTC - 5 ) Eastern Standard Time
              </option>
              <option value="UTC Western European Time">
                UTC Western European Time
              </option>
              <option value="( UTC + 5:30 ) Indian Standard Time">
                ( UTC + 5:30 ) Indian Standard Time
              </option>
            </select>
            <div className="intltelinput__container">
              <IntlTelInput
                separateDialCode={true}
                placeholder="Whatsapp Mobile Number"
                onSelectFlag={handleSelectFlag}
                onPhoneNumberChange={handlePhoneNumberChange}
              />
              {isContactValid ? (
                <span className="valid__msg">&#10004;valid</span>
              ) : (
                <span className="invalid__msg">
                  X invalid: enter a valid Phon-no
                </span>
              )}
            </div>
            <div className="email__box">
              <input
                required
                type="email"
                value={registerInfo.email}
                placeholder="E-Mail"
                onChange={(e) => handleEmailChange(e)}
              />
              {isEmailValid ? (
                <span className="valid__msg">&#10004;valid</span>
              ) : (
                <span className="invalid__msg" style={{ right: "-119px" }}>
                  X invalid email
                </span>
              )}
            </div>
            <select
              name="class"
              value={registerInfo.grade}
              onChange={(e) => handleClassChange(e)}
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
            <div className="isparent__box">
              <label>isParent:</label>
              <input
                autoComplete="off"
                checked={registerInfo.isparent}
                onChange={(e) => handleCheck(e)}
                type="checkbox"
                value={registerInfo.isparent}
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <button
              disabled={
                name &&
                email &&
                phone &&
                country_code &&
                isparent &&
                dateOfBirth &&
                timezone &&
                grade
                  ? false
                  : true
              }
              onClick={(e) => handleFormSubbmit(e)}
            >
              Register New Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
