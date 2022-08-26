import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import withAdminProtection from "../utilities/withAdminProtection";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";
import PageLayout from "./components/layout/PageLayout";

const AdminWordsChoicesPage = () => {
	const columns = [
		{
			name: "Word",
			selector: (row) => row.word,
			wrap: true,
			width: "20%",
		},
		{
			name: "Usage",
			selector: (row) => row.usage,
			wrap: true,
			style: {},
			width: "25%",
		},
		{
			name: "Choices",
			cell: (row) =>
				row.choices.map((choice) => {
					return (
						<span key={choice.id} className="d-flex align-items-center">
							<span
								className={`material-icons-outlined text-${
									choice.is_correct ? "success" : "danger"
								}`}
							>
								{choice.is_correct ? "check" : "close"}
							</span>
							{choice.is_correct ? <b>{choice.choice}</b> : choice.choice}
						</span>
					);
				}),
		},
		{
			name: "Actions",
			cell: (row) => (
				<div className="w-100 d-flex gap-1">
					<Button
						className="btn btn-warning btn-sm"
						label="Edit"
						isValid={true}
					/>
					<Button
						className="btn btn-danger btn-sm"
						label="Delete"
						isValid={true}
					/>
				</div>
			),
		},
	];
	const words = [
		{
			id: 1,
			word: "Sample",
			usage: "Sample",
			choices: [
				{
					id: 1,
					choice: "Choice 1",
					is_correct: false,
				},
				{
					id: 2,
					choice: "Choice 2",
					is_correct: true,
				},
				{
					id: 3,
					choice: "Choice 2",
					is_correct: false,
				},
				{
					id: 4,
					choice: "Choice 2",
					is_correct: false,
				},
			],
		},
		{
			id: 2,
			word: "Sample",
			usage:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
			choices: [
				{
					id: 1,
					choice: "Choice 1",
					is_correct: false,
				},
				{
					id: 2,
					choice: "Choice 2",
					is_correct: true,
				},
				{
					id: 3,
					choice: "Choice 2",
					is_correct: false,
				},
				{
					id: 4,
					choice: "Choice 2",
					is_correct: false,
				},
			],
		},
	];
	return (
		<PageLayout pageTitle={"Admin Words and Choices"}>
			<div className="d-flex mt-3 align-items-center">
				<h1 className="me-4">Words and Choices</h1>
				<Link
					className="btn btn-success my-auto"
					replace
					to="/lessons/:id/words/create"
				>
					Add Word
				</Link>
			</div>
			<hr />
			<div className="mb-3">
				<h4>Lesson Details</h4>
				<h6>Title: </h6>
				<h6>Description: </h6>
			</div>
			<DataTable
				columns={columns}
				data={words}
				customStyles={customStyles}
				pagination
			/>
		</PageLayout>
	);
};

export default withAdminProtection(AdminWordsChoicesPage);
