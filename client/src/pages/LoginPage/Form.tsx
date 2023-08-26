import { Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { setUser } from "../../store/authSlice";
import { Button } from "@mui/material";
import { UseAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

interface FormValuesRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File;
}

type FormikType = FormikHelpers<FormValuesRegister | FormValuesLogin>;

interface FormValuesLogin {
  email: string;
  password: string;
}
const loginSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initValueLogin = {
  email: "",
  password: "",
};

export default function Form() {
  const [currentPage, setCurrentPage] = useState("login");
  const navigate = useNavigate();
  const isLogin = currentPage === "login";
  const isRegister = currentPage === "register";
  const dispatch = UseAppDispatch();
  // const dispatch = useDispatch();

  const register = async (
    values: FormValuesRegister,
    submitProps: FormikType
  ) => {
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("location", values.location);
    formData.append("occupation", values.occupation);
    formData.append("picturePath", values.picture.name);

    console.log(formData);
    const saveUserRes = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
    });

    const saveUser = await saveUserRes.json();
    // submitProps.resetForm();
    if (saveUser) {
      setCurrentPage("login");
    }
    submitProps.resetForm();
  };

  const login = async (values: FormValuesLogin, onSubmitProps: FormikType) => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setUser({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (
    values: FormValuesRegister | FormValuesLogin,
    submitProps: FormikHelpers<FormValuesRegister | FormValuesLogin>
  ) => {
    if (isRegister) await register(values as FormValuesRegister, submitProps);
    if (isLogin) await login(values, submitProps);
  };

  return (
    <div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initValueLogin : initValueRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }: FormikProps<FormValuesRegister | FormValuesLogin>) => (
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="gird grid-cols-4 py-8 px-4 md:p-4 ">
                <div className="flex flex-col md: justify-between md:flex-row">
                  <div className="flex flex-col gap-x-2">
                    <label>FirstName</label>
                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(values as FormValuesRegister).firstName}
                      name="firstName"
                      type="text"
                    />
                  </div>
                  <div className="flex  flex-col ">
                    <label>LastName</label>
                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(values as FormValuesRegister).lastName}
                      name="lastName"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col md: justify-between md:flex-row">
                  <div className="flex  flex-col ">
                    <label>Location</label>
                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(values as FormValuesRegister).location}
                      name="location"
                      type="text"
                    />
                  </div>
                  <div className="flex  flex-col ">
                    <label>Occupation</label>
                    <input
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={(values as FormValuesRegister).occupation}
                      name="occupation"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values as FormValuesRegister).email}
                    name="email"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values as FormValuesRegister).password}
                    name="password"
                    type="password"
                  />
                </div>
                <div className=" border  border-blue-400 flex my-6">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles: File[]) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }: any) => (
                      <div
                        {...getRootProps()}
                        className=" p-4 w-full cursor-pointer h-full"
                      >
                        <input {...getInputProps()} />
                        {!(values as FormValuesRegister).picture ? (
                          <div className="flex">
                            <span className="text-blue-300">
                              Add Picture Here
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-between">
                            <p className="max-w-[600px]">
                              {(values as FormValuesRegister).picture?.name}
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            )}
            {/* Login */}

            {isLogin && (
              <div className="px-4 py-6">
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values as FormValuesRegister).email}
                    name="email"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={(values as FormValuesRegister).password}
                    name="password"
                    type="password"
                  />
                </div>
              </div>
            )}

            {/* Button */}
            <div className="p-4">
              <Button
                variant="contained"
                color="success"
                type="submit"
                className=" flex w-full justify-center text-slate-100 bg-green-500 py-2 rounded-md"
              >
                {isRegister ? "Register" : "Login"}
              </Button>

              <div
                className="pt-8 pb-2 text-green-400 cursor-pointer"
                onClick={() => {
                  setCurrentPage(isLogin ? "register" : "login");
                  resetForm();
                }}
              >
                <p>
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </p>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
