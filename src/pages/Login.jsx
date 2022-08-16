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
      <div className="container px-[20px] py-[50px] flex justify-center">
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
          <Form className="max-w-[450px] w-full shadow-lg py-[35px] px-[30px] bg-white rounded-[5px]">
            {isError && (
              <Alert type="error" show={isError}>
                {error.data.message}
              </Alert>
            )}
            <div className="mb-[20px]">
              <TextField
                name="email"
                type="text"
                placeholder="Enter email"
                className="w-full focus:outline-none border border-solid border-[#e4e4e4] p-[20px] rounded-[5px] text-[#8a8a8a]"
              />
            </div>
            <TextField
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <button
              type="submit"
              className="w-full h-[60px] mt-[20px] p-[20px] rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
            >
              {isLoading ? (
                <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
              ) : (
                "LOGIN"
              )}
            </button>
            <p className="text-center mt-[30px] text-[#7a7a7a]">
              Don't have an account?{" "}
              <Link to="/register" className="hover:underline">
                Register here
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
