import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import useAxiosPublic from './hooks/useAxiosPublic'; // Import Axios instance
import { AuthContext } from './Provider/AuthProvider';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic(); // Use Axios instance

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const identifier = form.identifier.value;
    const pin = form.pin.value;

    try {
      const response = await axiosPublic.post('/login', {
        identifier,
        pin
      });

      const { token, user } = response.data;

      if (token) {
        // Store the token in local storage
        localStorage.setItem('authToken', token);

        Swal.fire({
          title: "User Login Successful.",
          showClass: "animate__animated animate__fadeInUp animate__faster",
          hideClass: "animate__animated animate__fadeOutDown animate__faster"
        });

        // Redirect to the intended page or home
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login failed! Please check your credentials and try again.'
      });
    }
  }

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
    
      <div className="card md:w-1/2 p-6 bg-base-100 shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-center">Login now!</h1>
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text mr-2">Email or Mobile Number</span>
            </label>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Mobile Number"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text mr-2">PIN</span>
            </label>
            <input
              type="password"
              name="pin"
              placeholder="PIN"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              onBlur={handleValidateCaptcha}
              type="text"
              name="captcha"
              placeholder="Type the above captcha"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <input
              disabled={disabled}
              className="btn btn-primary w-full"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="text-center mt-4">
          <small>New here? </small>
          <Link className="font-bold" to="/signUp">
            Create a new account
          </Link>
        </p>
      </div>
      <div className="hidden md:block md:flex-1">
        <img
          className="w-full h-auto"
          src="https://d3nn873nee648n.cloudfront.net/1200x1800-new/20732/SM1072546.jpg"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
};

export default SignIn;
