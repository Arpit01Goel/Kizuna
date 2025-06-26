import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const handleSignupRedirect = () => {
    navigate("/signup"); // Navigate to /signup
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formData);
    // try {
    //   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     console.log("login failed");
    //   }
    //   else {
    //     const result = await response.json();
    //     sessionStorage.setItem("authToken", result.token)
    //     sessionStorage.setItem("username", formData.username);

    //     window.location.href = "/home";
    //   }
    // } catch (err) {
    //   console.log("error: ", err);
    // }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 lg:bg-[url(/images/Purple2.jpg)] bg-no-repeat bg-center bg-cover text-base-content relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black backdrop-blur-md min-h-screen flex items-center justify-center">
        <div className=" bg-black/50 rounded-lg w-full max-w-96 lg:max-w-4xl p-6 lg:p-12 flex flex-col lg:flex-row items-stretch ">
          <div className="p-8 lg:flex py-32 items-center justify-center w-full lg:w-1/2 hidden ">
            <div className="text-4xl leading-relaxed text-center">
              Welcome back!
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start justify-center p-4 lg:p-8 w-full lg:w-1/2 ">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">
              Log In
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full space-y-4 "
            >
              <TextField
                id="username"
                label="Username"
                variant="standard"
                className="w-full"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                className="w-full"
                margin="normal"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        sx={{
                          color: "#FFFFFF", // Change the color of the icon
                          "&:hover": {
                            color: "#D3D3D#", // Change color on hover
                          },
                        }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="flex justify-center lg:justify-start items-center mt-4">
                
                <button type="submit" className="btn btn-outline btn-base-content">Submit</button>
                
                
                  
                
                <button className="btn btn-link text-base-content" onClick={handleSignupRedirect}>Don't have an account? Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
