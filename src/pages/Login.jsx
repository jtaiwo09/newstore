import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { BiLoaderCircle } from "react-icons/bi";
import { useLoginMutation } from "../apps/services/auth";
import Alert from "../components/reuseables/Alert";

const Login = () => {
  const navigate = useNavigate();
  const [login, { error, isError, isLoading, isSuccess }] = useLoginMutation();
  const { search } = useLocation();
  const redirect = search.split("=")[1];

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="px-5">
          <div className="mx-auto max-w-[380px] mt-[10%] sm:mt-[5%] animate__animated animate__fadeInUp">
            {isError && (
              <Alert type="error" show={isError}>
                {error.data.message}
              </Alert>
            )}
            <h2 className="uppercase text-center mb-2 font-[500] text-[24px] sm:text-[36px]">
              Welcome Back
            </h2>
            <p className="mx-auto max-w-[380px] w-full mb-4 text-center">
              Sign into your account
            </p>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Must be a valid email address")
                  .required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                login(values)
                  .unwrap()
                  .then(() => {
                    if (redirect) navigate(`/${redirect}`);
                    else navigate("/");
                    localStorage.removeItem("email");
                  })
                  .catch((error) => {
                    localStorage.setItem("email", values.email);
                    if (error.status === 409) {
                      navigate("/email-notverified");
                    }
                  });
                setSubmitting(false);
              }}
            >
              <Form className="w-full border border-solid border-black/20 shadow-[0_0_20px_0_rgba(0,0,0,0.0.5)] p-[30px] bg-white rounded-[5px]">
                <div className="mb-3">
                  <TextField
                    name="email"
                    type="text"
                    placeholder="Enter email"
                  />
                </div>
                <TextField
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <Link
                  to="/forgot-password"
                  className="text-right block mt-1 text-[14px] text-[#8a8a8a] hover:underline"
                >
                  Forgot password ?
                </Link>
                <button
                  type="submit"
                  className="w-full h-[50px] mt-[20px] p-4 rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
                >
                  {isLoading ? (
                    <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                  ) : (
                    "LOGIN"
                  )}
                </button>
                <p className="text-center mt-[30px] text-[14px] text-[#7a7a7a]">
                  Don't have an account?{" "}
                  <Link to="/register" className="hover:underline">
                    Register here
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

export default Login;
