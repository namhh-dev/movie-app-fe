import React from 'react';
import Scroll from '../common/Scroll';
import AdminNavbar from '../navbar/AdminNavbar';

export default function AdminLayout({ children, isVisible, index }) {
  return (
    <div className="bg-[rgb(16,20,44)] w-full h-full">
        <div class="py-4">
          <AdminNavbar page={index}/>
        </div>
        <div class="pt-10 laptop-m:py-4 laptop-m:mt-8">
          <div class="py-2 px-10 mobile-xl:px-16 rounded-lg backdrop-blur-lg">
          { children }
          </div>

          <Scroll isVisible={isVisible}/>
        </div>
    </div>
  )
}
