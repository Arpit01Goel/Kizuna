import * as React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function Signup() {
  const signup = useAuthStore((state) => state.signup); // Access the signup function from the store

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submissionMessage, setSubmissionMessage] = React.useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to /login
  };
  const [formData, setFormData] = React.useState({
    firstName: "", 
    lastName: "", 
    username: "", 
    email: "", 
    password: "",
  })
  const handleChange = (event) =>{
    const {id,value} = event.target;
    setFormData((prevData) =>({
      ...prevData, 
      [id]: value,
    }));
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      console.log(formData)
      signup(formData)
      // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      //   method: "POST", 
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(formData)
      // })
      // const result = await response.json();
      // // console.log("response: ", response);
      // setSubmissionMessage(result.message);
      // if (!response.ok) {
      //   console.log("signup failed");
        
      // }else {
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: ""
        })
        //redict to login page
        // navigate("/chat");
      // }
      
    } catch (err) {
      console.log("error: " , err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-h-full bg-base-100 lg:bg-[url(/images/Purple2.jpg)] bg-no-repeat bg-center bg-cover text-base-content top-0 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black backdrop-blur-md h-full flex items-center justify-center">
      <div className=" bg-black/40 rounded-lg w-full max-w-96 lg:max-w-4xl p-6 lg:p-12 flex flex-col lg:flex-row items-stretch ">
  <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:p-8 w-full lg:w-1/2 ">
    <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">
      Create New Account 
    </h1>

    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full space-y-4 relative z-3 "
    >
      <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 ">
        <TextField
          id="firstName"
          label="First Name"
          variant="standard"
          className="w-full lg:w-1/2"
          margin="normal"
          onChange={handleChange}
          value = {formData.firstName}
          required
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="standard"
          className="w-full lg:w-1/2"
          margin="normal"
          onChange={handleChange}
          value = {formData.lastName}
        />
      </div>

      <TextField
        id="username"
        label="Username"
        variant="standard"
        className="w-full"
        margin="normal"
        onChange={handleChange}

        required
        value={formData.username}
      />

      <TextField
        id="email"
        label="Email"
        variant="standard"
        className="w-full"
        margin="normal"
        onChange={handleChange}
        required
        value ={formData.email}
      />

<TextField
                id="password"
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                className="w-full"
                margin="normal"
                onChange={handleChange}
                required
                value={formData.password}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end"  sx={{
            color: "#FFFFFF", // Change the color of the icon
            "&:hover": {
              color: "#D3D3D#", // Change color on hover
            },
          }}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
      <div className="flex justify-center lg:justify-start items-center mt-4">
        
        <button type="submit" className="btn btn-outline btn-base-content">Submit</button>
        
              <button className="btn btn-link text-base-content text-lg"  onClick={handleLoginRedirect}>Already have an account? Login</button>
      </div>
      <div className="text-center text-	warning-content mt-4">
        {submissionMessage && <p>{submissionMessage}</p>}
      </div>
    </form>
  </div>
  <div className="p-8 hidden lg:flex items-center justify-center w-full lg:w-1/2  ">
    <div className="text-4xl leading-relaxed text-center py-24">
      The journey of a thousand miles begins with a single step.
    </div>
  </div>
</div>
      </div>
    </div>
  );
}