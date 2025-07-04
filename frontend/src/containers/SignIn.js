import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import { clearErrorsAction } from "../reducks/users/actions";
import { signIn } from "../reducks/users/operations";
import { getUser } from "../reducks/users/selectors";

export default function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();
	const selector = useSelector((state) => state);
	const errors = getUser(selector).errors;

	const initialValues = {
		email: "",
		password: "",
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

	// const onSubmitSignIn = () => {
	// 	setIsLoading(true);
	// 	dispatch(
	// 		signIn(values, () => {
	// 			navigate({ pathname: "/", search });
	// 			dispatch(clearErrorsAction());
	// 		})
	// 	);
	// 	setIsLoading(false);
	// };




const onSubmitSignIn = async () => {
  setIsLoading(true);
  try {
    await dispatch(
      signIn(values, () => {
        navigate({ pathname: "/", search });
        dispatch(clearErrorsAction());
      })
    );
  } catch (err) {
    console.error("Sign-in failed:", JSON.stringify(err, null, 2));
    // No need to manually dispatch error here, handled in operation catch
  } finally {
    setIsLoading(false);
  }
};


	return (
		<>
			<Header search={search} />
			<section className="main-wrapper">
				<div className="sign-in">
					<p className="title">SIGN IN</p>
					<div className="form-container">
						<label htmlFor="email">Email Address</label>
						<input
							className="custom-input"
							type="email"
							name="email"
							placeholder="Enter Email"
							value={values.email}
							onChange={handleInputChange}
						/>
						{errors.email ? <span className="error-text">{errors.email[0]}</span> : null}
						<label className="mt-2" htmlFor="email">
							Password
						</label>
						<input
							className="custom-input"
							type="password"
							name="password"
							placeholder="Enter Password"
							value={values.password}
							onChange={handleInputChange}
						/>
						{errors.password ? <span className="error-text">{errors.password[0]}</span> : null}
						{errors.error ? <span className="error-text">{errors.error}</span> : null}
						<button className="custom-btn" onClick={onSubmitSignIn}>
							{isLoading ? "SIGNING IN..." : "SIGN IN"}
						</button>
						<p>
							New Customer ? <Link to={{ pathname: "sign-up", search }}>Register</Link>
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
