import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useRegisterMutation } from "../apps/services/auth";
import { BiLoaderCircle } from "react-icons/bi";
import Alert from "../components/reuseables/Alert";

const Register = () => {
  // const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [register, { error: registerError, isError, isLoading, isSuccess }] =
    useRegisterMutation();

  if (isSuccess) {
    navigate("/email-verification-sent");
  }

  console.log(registerError);
  return (
    <div className="relative">
      <Navbar />
      <div className="container w-full">
        <div className="px-5 mb-10">
          <div className="max-w-[600px] mx-auto mt-[10%] sm:mt-[5%] w-full animate__animated animate__fadeInUp">
            {isError && (
              <Alert type="error" show={isError}>
                {registerError.data.error}
              </Alert>
            )}
            <h2 className="uppercase text-center mb-1 font-[500] text-20 sm:text-[36px]">
              Register
            </h2>
            <p className="mx-auto max-w-[380px] w-full mb-4 text-center space-x-6">
              Let’s get you started
            </p>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                firstname: Yup.string().required("First name is required"),
                lastname: Yup.string().required("Last name is required"),
                email: Yup.string()
                  .email("Must be a valid email address")
                  .required("Email is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 characters")
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .required("Confirm password is required")
                  .oneOf([Yup.ref("password"), null], "Passwords must match"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const { confirmPassword, ...others } = values;
                register({ ...others });
                setSubmitting(false);
              }}
            >
              <Form className="max-w-[600px] w-full border border-solid border-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.0.5)] p-[30px] bg-white rounded-[5px]">
                <div className="flex w-full mb-2 sm:mb-3 space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
                  <TextField
                    name="firstname"
                    type="text"
                    placeholder="Enter Firstname"
                  />
                  <TextField
                    name="lastname"
                    type="text"
                    placeholder="Enter Lastname"
                  />
                </div>

                <div className="flex w-full mb-2 sm:mb-3 space-y-2 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
                  <TextField
                    name="email"
                    type="text"
                    placeholder="Enter email"
                  />
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                <TextField
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                />
                <button
                  type="submit"
                  className="w-full uppercase h-[50px] mt-[20px] p-4 rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
                >
                  {isLoading ? (
                    <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                  ) : (
                    "Register"
                  )}
                </button>
                <p className="text-center mt-[30px] text-[14px] text-[#7a7a7a]">
                  Already have an account?{" "}
                  <Link to="/login" className="hover:underline">
                    Login here
                  </Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
