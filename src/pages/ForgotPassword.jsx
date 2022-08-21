import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { BiLoaderCircle } from "react-icons/bi";
import { useForgotPwdMutation } from "../apps/services/auth";
import Alert from "../components/reuseables/Alert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPwd, { error, isError, isLoading, isSuccess }] =
    useForgotPwdMutation();

  if (isSuccess) {
    navigate("/email-verification-sent");
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="mx-auto max-w-[380px] mt-[10%] sm:mt-[5%] animate__animated animate__fadeInUp">
          {isError && (
            <Alert type="error" show={isError}>
              {error.data.message}
            </Alert>
          )}
          <div className="px-5">
            <h2 className="uppercase text-center mb-2 font-[500] text-[20px] sm:text-[30px]">
              Forgot your password?
            </h2>
            <p className="w-full sm:mb-[24px] text-center">
              Sorry, happens to the best of us. Give us your email address and
              we’ll fix this together.
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Must be a valid email address")
                .required("Email is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              forgotPwd(values);
              setSubmitting(false);
            }}
          >
            <Form className="w-full sm:border border-solid border-black/20 sm:shadow-[0_0_20px_0_rgba(0,0,0,0.0.05)] p-[30px] bg-white rounded-[5px]">
              <div className="mb-[20px]">
                <TextField name="email" type="text" placeholder="Enter email" />
              </div>
              <button
                type="submit"
                className="w-full upercase h-[50px] mt-[20px] p-4 rounded-[5px] text-white bg-primary flex justify-center items-center box-border"
              >
                {isLoading ? (
                  <BiLoaderCircle className="text-[30px] animate-spin duration-1000" />
                ) : (
                  "Submit"
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
