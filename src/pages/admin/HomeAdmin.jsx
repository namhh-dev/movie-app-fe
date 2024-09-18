import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Movie from "./Movie";

export default function HomeAdmin() {
  return (
    <>
      <AdminLayout >
        <Movie />
      </AdminLayout >
    </>
  );
}
