import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs"; // Import bcrypt
import useAxiosPublic from "./hooks/useAxiosPublic";
import { AuthContext } from "./Provider/AuthProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // Hash the PIN before sending it to the server
      const salt = bcrypt.genSaltSync(10);
      const hashedPIN = bcrypt.hashSync(data.pin, salt);

      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      if (loggedUser) {
        console.log(loggedUser);
        const profile = {
          displayName: data?.name,
          photoURL: data?.photoURL,
        };
        await updateUserProfile(profile);

        // Create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          pin: hashedPIN, // Save the hashed PIN
          image: data.photoURL,
          status: "pending", // Set initial status as pending
          balance: 0, // Initial balance
        };

        const res = await axiosPublic.post("/users", userInfo);
        if (res.data.insertedId) {
          console.log("User added to the database");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "There was an error signing up",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      {/* Center the form */}
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-6">
          {/* Add some margin */}
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
        </div>
        <div className="card shadow-2xl bg-base-100 p-8">
          {/* Add padding */}
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control mb-4">
              {/* Add some margin */}
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Your Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600 ">Name is required</span>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-600 ">Photo URL is required</span>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                placeholder="Phone"
                className="input input-bordered"
              />
              {errors.phone && (
                <span className="text-red-600 ">Phone number is required</span>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600 ">Email is required</span>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">5-digit PIN</span>
              </label>
              <input
                type="number"
                {...register("pin", {
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                })}
                placeholder="5-digit PIN"
                className="input input-bordered"
              />
              {errors.pin?.type === "required" && (
                <p className="text-red-600">PIN is required</p>
              )}
              {errors.pin?.type === "minLength" && (
                <p className="text-red-600">PIN must be 5 digits</p>
              )}
              {errors.pin?.type === "maxLength" && (
                <p className="text-red-600">PIN must be 5 digits</p>
              )}
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one uppercase and one lowercase, one number, and one special character
                </p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-outline btn-block p-2 bg-green-400" type="submit" value="SignUp" />
            </div>
          </form>
          <p className="text-center mt-4">
            {/* Add some margin */}
            Already have an account? Go to{" "}
            <Link className="font-bold" to="/signin">
              Login Page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
