import React from "react";
import withAdminProtection from "../utilities/withAdminProtection";
import PageLayout from "./components/layout/PageLayout";
import DataTable from "react-data-table-component";
import Button from "./components/button/Button";
import { customStyles } from "./components/datatable/datatable";
import { useGetLessonsQuery } from "../store/lessonsSlice";
import DataLoading from "./components/loading/DataLoading";
import UnauthorizedErrorPage from "./components/error/UnauthorizedErrorPage";
import { Link } from "react-router-dom";

const AdminLessonsPage = () => {
	const { data: lessons, isLoading, isError, isSuccess } = useGetLessonsQuery();
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
	let output;
	if (isLoading) {
		output = <DataLoading />;
	}
	if (isError) {
		output = <UnauthorizedErrorPage />;
	}
	if (isSuccess) {
		output = (
			<DataTable
				columns={columns}
				data={lessons}
				customStyles={customStyles}
				pagination
			/>
		);
	}
	return (
		<PageLayout pageTitle={"Admin Dashboard"}>
			<div className="d-flex my-3 align-items-center">
				<h1 className="mx-4">Lessons/Categories</h1>
				<Link className="btn btn-success my-auto" replace to="/lessons/create">
					Create New Lesson
				</Link>
			</div>
			{output}
		</PageLayout>
	);
};

export default withAdminProtection(AdminLessonsPage);
