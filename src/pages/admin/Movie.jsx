import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import CreateMovieApi from "../../components/admin/movie/create-movie/CreateMovieApi";
import ListMovieAdmin from "../../components/admin/movie/list-movie/ListMovieAdmin";
import { IconArrowDown, IconArrowUp } from "../../components/icon/Icon";
import Scroll from "../../components/common/Scroll";

const childComponent = [<ListMovieAdmin />, <CreateMovieApi />];

export default function Movie() {
  const [index, setIndex] = useState(0);
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
    <>
      <AdminLayout >
        <div className="bg-[rgb(16,20,44)] w-full h-full">
          <div class="py-4">
            <AdminNavbar setIndex={setIndex} />
          </div>
          <div class="pt-10 laptop-m:py-4 laptop-m:mt-8">
            <div class="py-2 px-10 mobile-xl:px-16 rounded-lg backdrop-blur-lg">
              {childComponent[index]}
            </div>

            <Scroll isVisible={isVisible}/>
          </div>
        </div>
      </AdminLayout >
    </>
  );
}
