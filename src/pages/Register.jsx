import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="relative">
      <Navbar />
      <div className="py-[50px] px-[20px] flex justify-center">
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
            password: Yup.string().required("Password is required"),
            confirmPassword: Yup.string()
              .required("Confirm password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            // login(dispatch, values);
            setSubmitting(false);
          }}
        >
          <Form className="max-w-[500px] w-full shadow-lg py-[35px] px-[30px] bg-white rounded-[5px]">
            <div className="flex w-full mb-5 sm:space-x-4 flex-col sm:flex-row">
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
            <div className="mb-5">
              <TextField name="email" type="text" placeholder="Enter email" />
            </div>
            <div className="mb-5">
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
              className="w-full h-[60px] mt-[20px] p-[20px] rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
            >
              {loading ? (
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

export default Register;
