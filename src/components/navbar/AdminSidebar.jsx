import React from 'react';

import Thumb from '../../assets/image/thumb.png';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {

    return (
        <aside id="default-sidebar" class="fixed top-0 left-0 border-gray-400 border-r-[1px] z-40 w-52 h-screen transition-transform -translate-x-full laptop-m:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-[rgb(16,20,44)]">
                <Link to="/" div className="flex flex-shrink-0 items-center justify-center">
                    <img alt="Your Company" src={Thumb} className="h-12 w-auto"/>
                </Link>
                <ul class="space-y-2 mt-5 font-medium">
                    <li>
                        <Link to="/admin/movie" class="flex items-center p-2 text-white rounded-lg hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <svg class="w-6 h-6 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M21 4h-4.18a3 3 0 00-5.64 0H5a3 3 0 00-3 3v10a3 3 0 003 3h16a1 1 0 001-1V5a1 1 0 00-1-1zM7 9a1 1 0 110 2 1 1 0 010-2zm10 0a1 1 0 110 2 1 1 0 010-2zm0 6a1 1 0 110 2 1 1 0 010-2zM7 15a1 1 0 110 2 1 1 0 010-2zM19 18H5a1 1 0 01-1-1v-4h1a3 3 0 006 0h2a3 3 0 006 0h1v4a1 1 0 01-1 1z"/>
                            </svg>
                            <span class="ms-3">Movie</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
