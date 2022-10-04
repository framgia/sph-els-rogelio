import React, { useState } from "react";
import withAdminProtection from "utilities/withAdminProtection";
import PageLayout from "pages/components/layout/PageLayout";
import DataTable from "react-data-table-component";
import Button from "pages/components/button/Button";
import { customStyles } from "pages/components/datatable/datatable";
import {
  useDeleteLessonMutation,
  useGetLessonsQuery,
} from "store/lessonsSlice";
import DataLoading from "pages/components/loading/DataLoading";
import ErrorPage from "pages/components/error/ErrorPage";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "pages/components/modals/ConfirmationModal";
import { toast } from "react-toastify";

const AdminLessonsPage = () => {
  const { data: lessons, isLoading, isError, isSuccess } = useGetLessonsQuery();
  const [show, setShow] = useState(false);
  const [rowID, setRowID] = useState(-1);
  const [deleteLesson, { isLoading: deleteLoading }] =
    useDeleteLessonMutation();
  const navigate = useNavigate();
  const handleDeleteButton = (id) => {
    setRowID(id);
    setShow(true);
  };
  const handleDeleteModal = async () => {
    try {
      const res = await deleteLesson(rowID).unwrap();
      toast.success(res.message);
      setShow(false);
    } catch (error) {
      if (error && error.status === 500) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    }
  };
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
            label="View words"
            handleClick={() => navigate(`/lessons/${row.id}/words`)}
            isValid={true}
          />
          <Button
            className="btn btn-warning btn-sm"
            label="Edit"
            handleClick={() => navigate(`/lessons/update/${row.id}`)}
            isValid={true}
          />
          <Button
            className="btn btn-danger btn-sm"
            label="Delete"
            isValid={true}
            handleClick={() => handleDeleteButton(row.id)}
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
    output = (
      <ErrorPage
        errorStatus={401}
        errorType={"Unauthorized Access"}
        errorMessage={"You are not authorized to access this page."}
      />
    );
  }
  if (isSuccess) {
    output = (
      <>
        <DataTable
          columns={columns}
          data={lessons}
          customStyles={customStyles}
          pagination
        />
        <ConfirmationModal
          title={"Delete Lesson"}
          body={"Are you sure to delete this lesson?"}
          show={show}
          setShow={setShow}
          isLoading={deleteLoading}
          closeLabel={"Close"}
          actionLabel={"Delete Lesson"}
          handleModalClick={handleDeleteModal}
        />
      </>
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
