// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Footer from "../components/default/Footer";
// import Header from "../components/default/Header";
// import { clearErrorsAction, signUpError } from "../reducks/users/actions";
// import { signUp } from "../reducks/users/operations";
// import { getUser } from "../reducks/users/selectors";

// export default function SignUp() {
// 	const navigate = useNavigate();
// 	const { search } = useLocation();
// 	const dispatch = useDispatch();
// 	const selector = useSelector((state) => state);
// 	const errors = getUser(selector).errors;

// 	const initialValues = {
// 		name: "",
// 		email: "",
// 		password: "",
// 		password_confirmation: "",
// 	};

//     const [values, setValues] = useState(initialValues);
// 	const [isLoading, setIsLoading] = useState(false);

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;

// 		setValues({
// 			...values,
// 			[name]: value,
// 		});
// 	};

//     const onSubmitSignUp = () => {
// 		if (values.password !== values.password_confirmation) {
// 			dispatch(signUpError({ password_confirm: ["Password are not the same."] }));
// 			return;
// 		}

// 		setIsLoading(true);
// 		dispatch(
// 			signUp(values, () => {
// 				navigate({ pathname: "/", search });
// 				dispatch(clearErrorsAction());
// 			})
// 		);
// 		setIsLoading(false);
// 	};

//     return (
// 		<>
// 			<Header search={search} />
// 			<section className="main-wrapper">
// 				<div className="sign-up">
// 					<p className="title">SIGN UP</p>
// 					<div className="form-container">
// 						<label htmlFor="email">Name</label>
// 						<input
// 							className="custom-input"
// 							type="text"
// 							name="name"
// 							placeholder="Enter Name"
// 							value={values.name}
// 							onChange={handleInputChange}
// 						/>
// 						<label htmlFor="email">Email Address</label>
// 						<input
// 							className="custom-input"
// 							type="email"
// 							name="email"
// 							placeholder="Enter Email"
// 							value={values.email}
// 							onChange={handleInputChange}
// 						/>
// 						{errors.email ? <span className="error-text">{errors.email[0]}</span> : null}
// 						<label className="mt-2" htmlFor="email">
// 							Password
// 						</label>
// 						<input
// 							className="custom-input"
// 							type="password"
// 							name="password"
// 							placeholder="Enter Password"
// 							value={values.password}
// 							onChange={handleInputChange}
// 						/>
// 						{errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
// 						<label className="mt-2" htmlFor="email">
// 							Confirm Password
// 						</label>
// 						<input
// 							className="custom-input"
// 							type="password"
// 							name="password_confirmation"
// 							placeholder="Enter Confirm Password"
// 							value={values.password_confirmation}
// 							onChange={handleInputChange}
// 						/>
// 						{errors.password_confirm ? (
// 							<span className="error-text">{errors.password_confirm[0]}</span>
// 						) : null}
// 						<button className="custom-btn" onClick={onSubmitSignUp}>
// 							{isLoading ? "SIGNING UP..." : "SIGN UP"}
// 						</button>
// 						<p>
// 							Have an account ? <Link to={{ pathname: "/sign-in", search }}>Sign In</Link>
// 						</p>
// 					</div>
// 				</div>
// 			</section>
// 			<Footer />
// 		</>
// 	);
// }


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import { clearErrorsAction, signUpError } from "../reducks/users/actions";
import { signUp } from "../reducks/users/operations";
import { getUser } from "../reducks/users/selectors";

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = useLocation();
    const selector = useSelector((state) => state);
    const errors = getUser(selector).errors;

    const initialValues = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // const onSubmitSignUp = () => {
    //     if (values.password !== values.password_confirmation) {
    //         dispatch(signUpError({ password_confirm: ["Passwords do not match."] }));
    //         return;
    //     }

    //     setIsLoading(true);
    //     dispatch(
    //         signUp(values, () => {
    //             navigate({ pathname: "/", search });
    //             dispatch(clearErrorsAction());
    //         })
    //     ).finally(() => {
    //         setIsLoading(false);
    //     });
    // };

	const onSubmitSignUp = async () => {
  if (values.password !== values.password_confirmation) {
    dispatch(signUpError({ password_confirm: ["Passwords do not match."] }));
    return;
  }

  setIsLoading(true);
  try {
    await dispatch(
      signUp(values, () => {
        navigate({ pathname: "/", search });
        dispatch(clearErrorsAction());
      })
    );
  } catch (err) {
    console.error("Sign-up failed:", JSON.stringify(err, null, 2));
    // error already dispatched in operations
  } finally {
    setIsLoading(false);
  }
};


    return (
        <>
            <Header search={search} />
            <section className="main-wrapper">
                <div className="sign-up">
                    <p className="title">SIGN UP</p>
                    <div className="form-container">
                        <label htmlFor="name">Name</label>
                        <input
                            className="custom-input"
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={values.name}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="email">Email Address</label>
                        <input
                            className="custom-input"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="error-text">{errors.email[0]}</span>}

                        <label className="mt-2" htmlFor="password">Password</label>
                        <input
                            className="custom-input"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <span className="error-text">{errors.password[0]}</span>}

                        <label className="mt-2" htmlFor="password_confirmation">Confirm Password</label>
                        <input
                            className="custom-input"
                            type="password"
                            name="password_confirmation"
                            placeholder="Enter Confirm Password"
                            value={values.password_confirmation}
                            onChange={handleInputChange}
                        />
                        {errors.password_confirm && (
                            <span className="error-text">{errors.password_confirm[0]}</span>
                        )}

                        {errors.message && <span className="error-text">{errors.message}</span>}
                        {errors.error && <span className="error-text">{errors.error}</span>}

                        <button className="custom-btn" onClick={onSubmitSignUp}>
                            {isLoading ? "SIGNING UP..." : "SIGN UP"}
                        </button>

                        <p>
                            Have an account? <Link to={{ pathname: "/sign-in", search }}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
