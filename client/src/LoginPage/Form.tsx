import { Formik, FormikHelpers, FormikProps } from "formik";

import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useState } from "react";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string(),
});

interface UserState {
  user: FormValuesRegister[];
  token: string;
}
interface FormValuesRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture?: File;
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
  picture: "",
};

const initValueLogin = {
  email: "",
  password: "",
};

export default function Form() {
  const [currentPage, setCurrentPage] = useState("login");
  // const navigate = useNavigate();
  const isLogin = currentPage === "login";
  const isRegister = currentPage === "register";

  const [user, setUser] = useState<UserState | null>(null);

  console.log(user);
  const register = async (
    values: FormValuesRegister,
    submitProps: FormikType
  ) => {
    const forData = new FormData();

    forData.append("firstName", values.firstName);
    forData.append("lastName", values.lastName);
    forData.append("email", values.email);
    forData.append("password", values.password);
    forData.append("location", values.location);
    forData.append("occupation", values.occupation);

    if (values.picture) {
      forData.append("picture", values.picture.name);
    }

    const saveUserRes = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: forData,
    });

    const saveUser = await saveUserRes.json();
    console.log(saveUser);
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
      setUser({
        user: loggedIn.user,
        token: loggedIn.token,
      });
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
                    type="text"
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
                            <p>add Picture Here</p>
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
                    type="text"
                  />
                </div>
              </div>
            )}

            {/* Button */}
            <div className="p-4">
              <button
                type="submit"
                className="text-white   rounded-md bg-green-400 flex justify-center mx-auto w-full py-4 font-semibold"
              >
                {isRegister ? "Register" : "Login"}
              </button>

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
