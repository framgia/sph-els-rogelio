import React from "react";
import withAdminProtection from "../utilities/withAdminProtection";
import PageLayout from "./components/layout/PageLayout";
import DataTable from "react-data-table-component";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";

const AdminLessonsPage = () => {
	const columns = [
		{
			name: "Title",
			selector: (row) => row.title,
			wrap: true,
			width: "25%",
		},
		{
			name: "Description",
			selector: (row) => row.description,
			wrap: true,
			style: {},
			width: "50%",
		},
		{
			name: "Actions",
			cell: (row) => (
				<div className="w-100 d-flex gap-1">
					<Button
						className="btn btn-primary btn-sm"
						label="Add word"
						isValid={true}
					/>
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

	const lessons = [
		{
			id: 1,
			title: "Lorem Ipsum",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		},
		{
			id: 2,
			title: "Lorem Ipsum",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		},
		{
			id: 3,
			title: "Lorem Ipsum",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
		},
	];
	return (
		<PageLayout pageTitle={"Admin Dashboard"}>
			<DataTable
				title="Lessons/Categories"
				columns={columns}
				data={lessons}
				customStyles={customStyles}
				pagination
			/>
		</PageLayout>
	);
};

export default withAdminProtection(AdminLessonsPage);
