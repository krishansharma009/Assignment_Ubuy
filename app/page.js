"use client";
import { FaGoogle, FaFacebookF, FaApple, FaPaypal } from "react-icons/fa";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");
  const [recaptchaValue, setRecaptchaValue] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation
  const validatePassword = (password) => {
    
    const re = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    return re.test(password);
  };


  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();

     if (!email || !validateEmail(email)) {
       alert("Please enter a valid email.");
       return;
     }
     if (!password || !validatePassword(password)) {
       alert(
         "Password must be at least 6 characters long and contain both letters and numbers."
       );
       return;
     }

    if (recaptchaValue) {
      try {
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            otp,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Signup Successful");
          alert("Signup Successful");
          setActiveTab('login');
        } else {
          setMessage(`Signup failed: ${data.message}`);
        }
      } catch (error) {
        setMessage("Error occurred: " + error.message);
        console.error(error);
      }
    } else {
      setMessage("Please verify that you're not a robot.");
    }
  };

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    if (recaptchaValue) {
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Login Successful");
          console.log(data); 
          alert("Login successful");
        } else {
          setMessage(`Login failed: ${data.message}`);
        }
      } catch (error) {
        setMessage("Error occurred: " + error.message);
        console.error(error);
      }
    } else {
      setMessage("Please verify that you're not a robot.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="text-xl font-bold mb-4 text-black">WELCOME</h2>

        {/* Tabs */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center ${
              activeTab === "login"
                ? "bg-yellow-400 text-black font-bold"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center ${
              activeTab === "signup"
                ? "bg-yellow-400 text-black font-bold"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <div>
              <div>
                {activeTab === "signup" ? (
                  <>
                    <button className="px-3 py-1 bg-yellow-400 text-black rounded font-bold">
                      OTP
                    </button>
                    <input
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-1 border border-gray-300 rounded w-[100px]"
                      required
                    />
                  </>
                ) : (
                  <>
                    <button className="px-3 py-1 bg-yellow-400 text-black rounded font-bold">
                      Password
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-500 rounded">
                      OTP
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="password"
                placeholder={activeTab === "signup" ? "OTP *" : "Password *"}
                value={activeTab === "signup" ? otp : password}
                onChange={(e) =>
                  activeTab === "signup"
                    ? setOtp(e.target.value)
                    : setPassword(e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm mt-2">
          {activeTab === "login" ? (
            <a href="#" className="text-blue-600 underline">
              Forget Your Password ?
            </a>
          ) : (
            <a href="#" className="text-blue-600 underline">
              Get OTP ?
            </a>
          )}
        </div>

        {activeTab === "signup" && (
          <div className="flex items-center space-x-4">
            <input type="checkbox" className="h-5 w-5" />
            <div className="text-gray-700 text-xs my-2 ">
              Join Our Mailing List- Get updates on Rollbacks, special pricing,
              hot new items, gift ideas and more.
            </div>
          </div>
        )}

        {activeTab === "signup" && (
          <div>
            <div className="flex items-center space-x-4">
              <ReCAPTCHA
                sitekey="6LdZ45wqAAAAAEXfXQ6Sc8X08DJxndUDcwRPoojr" 
                onChange={handleRecaptchaChange}
              />
            </div>
          </div>
        )}

        <button
          onClick={activeTab === "signup" ? handleSignup : handleLogin}
          className="w-full py-2 mt-4 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500"
        >
          {activeTab === "signup" ? "Register" : "Login"}
        </button>

        {activeTab === "signup" && (
          <p className="text-xs pt-2">
            By continueing, you agree to Ubuy's{" "}
            <a
              href="https://www.ubuy.co.in/terms"
              className="text-blue-600 underline"
            >
              Terms and Conditions
            </a>
          </p>
        )}
        <div className="mt-6 text-center flex items-center justify-center flex-col md:flex-row">
          <div className="flex justify-center space-x-4 mr-4">
            <button className="p-2 rounded-full hover:bg-yellow-500">
              <FaGoogle className="text-red-500 h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-yellow-500">
              <FaFacebookF className="text-blue-600 h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-yellow-500">
              <FaApple className="text-black h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-yellow-500">
              <FaPaypal className="text-blue-800 h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600">Login with Social Accounts</p>
        </div>
      </div>
    </div>
  );
}
