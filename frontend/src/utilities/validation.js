import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
	name: yup
		.string()
		.matches(/^[A-Za-z ]*$/, "Please enter valid name")
		.max(40)
		.required("Name is required"),
	email: yup
		.string()
		.email("Email must be valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required("Password is required"),
	repeatPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Password must match")
		.required("Repeat Password is required"),
});

export const loginValidationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Email must be valid")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, ({ min }) => `Password must be at least ${min} characters`)
		.required("Password is required"),
});

export const lessonValidationSchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
});
