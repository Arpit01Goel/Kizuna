import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAuthStore } from "../store/useAuthStore";

function ContactUs() {
  const [formData, setFormData] = useState({ Subject: "", Message: "" });
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const { sendMail } = useAuthStore();

  const handleSubmit = () => {
    sendMail(formData);
    setFormData({ Subject: "", Message: "" });
  };
  return (
    <div className="min-h-screen w-screen bg-[url('./assets/contactUs.jpg')] bg-no-repeat bg-center bg-cover  py-[5%] px-[5%] relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md h-full"></div>
      <div className="relative z-10">
        <div className=" place-content-center-safe text-2xl ">
          <div className="text-4xl flex flex-row items-center justify-around font-bold my-5">
            Get in Touch
          </div>
          Step into a world where your thoughts are valued, your concerns are
          heard, and every message you send becomes the start of a meaningful
          connection, as we strive to bridge the gap between your aspirations
          and our dedication.
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="card bg-primary text-primary-content w-9/12 md:w-3/12 ">
            <div className="card-body h-96">
              <h2 className="card-title">Contact Information</h2>
              <p>You can also contact us using this information: </p>
              <ul>
                <li>
                  <div className="font-bold">Phone numbers: </div> 925536****
                </li>
                <li>
                  <div className="font-bold">Address </div> XYZ block , unknown
                  street
                </li>
              </ul>
            </div>
          </div>
          <div className=" flex flex-col justify-around items-center gap-2 w-full h-full  p-[5%]">
            <div className="w-full">
              <TextField
                id="Subject"
                label="Subject"
                variant="standard"
                className="w-full lg:w-1/2"
                margin="normal"
                onChange={handleChange}
                value={formData.Subject}
                required
              />{" "}
            </div>

            <div className="w-full h-full oversize-x">
              <TextField
                id="Message"
                label="Message"
                rows={6}
                variant="standard"
                className="w-full lg:1/2 h-40 "
                multiline
                margin="normal"
                onChange={handleChange}
                value={formData.Message}
                required
              />
            </div>
            <div className="w-full flex justify-start">
              <button
                className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-md xl:btn-md"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
