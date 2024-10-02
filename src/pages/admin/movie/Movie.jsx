import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import ListMovieAdmin from "../../../components/admin/movie/list-movie/ListMovieAdmin";

export default function Movie() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // When scrolled down, the element will appear
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AdminLayout isVisible={isVisible} index={0}>
      <ListMovieAdmin />
    </AdminLayout>
  );
}
