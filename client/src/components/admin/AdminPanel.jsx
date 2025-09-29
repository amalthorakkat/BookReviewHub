import React from "react";
import AddBookForm from "../admin/AddBookForm";

const AdminPanel = () => {
  return (
    <div className="px-[15px] pb-10">
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-medium text-[30px] text-center pt-20 px-6 pb-4">
          Admin Panel
        </h1>
        <p className="text-center max-w-[500px] pb-8 mx-auto text-gray-600">
          Manage books by adding new titles to the BookReviewHub.
        </p>
      </div>
      <div className="flex justify-center">
        <AddBookForm />
      </div>
    </div>
  );
};

export default AdminPanel;
