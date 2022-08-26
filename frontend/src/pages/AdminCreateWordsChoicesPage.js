import React from "react";
import PageLayout from "./components/layout/PageLayout";
import { useFormik } from "formik";
import { wordChoiceValidationSchema } from "../utilities/validation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "./components/button/Button";
import withAdminProtection from "../utilities/withAdminProtection";

const AdminCreateWordsChoicesPage = () => {
	const handleFormSubmit = async () => {};
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		setFieldValue,
		setFieldError,
		setFieldTouched,
		values,
		errors,
		isValid,
		touched,
	} = useFormik({
		initialValues: {
			word: "",
			usage: "",
			choices: [],
			is_correct: 0,
		},
		enableReinitialize: true,
		validationSchema: wordChoiceValidationSchema,
		onSubmit: handleFormSubmit,
	});
	const handleAddChoice = async (e) => {
		let temp = [...values.choices];
		temp.push({ choice: "", is_correct: false });
		setFieldValue("choices", [...temp]);
	};
	const handleRemoveChoice = async (e, i) => {
		e.stopPropagation();
		if (Array.isArray(errors.choices)) {
			let errorTemp = errors.choices;
			errorTemp.splice(i, 1);
			setFieldError("choices", errorTemp);
		}
		if (Array.isArray(touched.choices)) {
			let touchTemp = touched.choices;
			touchTemp.splice(i, 1);
			setFieldTouched("choices", touchTemp);
		}
		let temp = [...values.choices];
		temp.splice(i, 1);
		setFieldValue("choices", temp);
	};
	const handleFieldChange = async (e, i) => {
		let temp = [...values.choices];
		temp[i].is_correct = !values.choices?.[i]?.is_correct;
		let count = values.is_correct;
		count += temp[i].is_correct === true ? 1 : -1;
		setFieldValue("choices", temp);
		setFieldValue("is_correct", count);
	};
	return (
		<PageLayout pageTitle={"Admin Words and Choices | Create Word"}>
			<div className="d-flex my-3 align-items-center">
				<h1 className="me-4">Words and Choices</h1>
			</div>
			<Row>
				<Col>
					<h5>Word</h5>
					<div className="mb-2 my-3">
						<input
							type="text"
							onChange={handleChange("word")}
							onBlur={handleBlur("word")}
							value={values.word}
							className={`form-control ${
								errors.word && touched.word ? "border-danger" : ""
							}`}
							placeholder="Word"
						/>
						{errors.word && touched.word && (
							<span className="error small text-danger">{errors.word}</span>
						)}
					</div>
					<div>
						<textarea
							onChange={handleChange("usage")}
							onBlur={handleBlur("usage")}
							value={values.usage}
							className={`form-control ${
								errors.usage && touched.usage ? "border-danger" : ""
							}`}
							placeholder="Sample usage of the word"
							cols="30"
							rows="5"
						/>
						{errors.usage && touched.usage && (
							<span className="error small text-danger">{errors.usage}</span>
						)}
					</div>
					<Button
						className={"mt-3 btn btn-lg w-100 btn-primary text-center"}
						isValid={isValid}
						handleClick={handleSubmit}
						label={"Add Word"}
					/>
				</Col>
				<Col>
					<div className="d-flex align-items-center">
						<h5 className="me-4">Choices (check the box for correct answer)</h5>
						<Button
							className={"btn btn-sm btn-success my-auto"}
							isValid={true}
							handleClick={handleAddChoice}
							label={"Add Choice"}
						/>
					</div>
					{errors.choices && touched.choices && (
						<span className="error small text-danger d-block">
							{!Array.isArray(errors.choices) ? errors.choices : ""}
						</span>
					)}
					{errors.is_correct && touched.is_correct && (
						<span className="error small text-danger">{errors.is_correct}</span>
					)}
					{values.choices.length ? (
						values.choices.map((choice, i) => {
							return (
								<div key={i}>
									<div className="my-2">
										<div className="input-group">
											<input
												type="text"
												onChange={handleChange(`choices[${i}].choice`)}
												onBlur={handleBlur(`choices[${i}].choice`)}
												value={values.choices[i].choice}
												className={`form-control ${
													errors.choices?.[i]?.choice &&
													touched.choices?.[i]?.choice
														? "border-danger"
														: ""
												}`}
												placeholder="Choice"
											/>
											<div className="input-group-text">
												<input
													className="form-check-input mt-0"
													type="checkbox"
													onChange={(e) => handleFieldChange(e, i)}
													onBlur={handleBlur(`choices[${i}].is_correct`)}
													checked={values.choices[i].is_correct}
													aria-label="Checkbox for following text input"
												/>
											</div>

											<button
												className="btn btn-danger"
												type="button"
												onClick={(e) => handleRemoveChoice(e, i)}
											>
												<span className={`material-icons-outlined small`}>
													close
												</span>
											</button>
										</div>
										{errors.choices?.[i]?.choice &&
											touched.choices?.[i]?.choice && (
												<span className="error small text-danger">
													{errors.choices?.[i]?.choice}
												</span>
											)}
									</div>
								</div>
							);
						})
					) : (
						<div>No choices added yet</div>
					)}
				</Col>
			</Row>
		</PageLayout>
	);
};

export default withAdminProtection(AdminCreateWordsChoicesPage);
