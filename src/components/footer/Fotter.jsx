import { Typography } from "@material-tailwind/react";
import React from "react";

export default function Fotter() {
  return (
    <footer className="flex w-full bg-[rgb(16,20,44)] flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-[#202c3c] py-4 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal ml-4 text-sm text-gray-500">
        &copy; 2023 Phim Vip
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 mr-4">
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-sm text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            About Us
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-sm text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            License
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-sm text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            Contribute
          </Typography>
        </li>
        <li>
          <Typography as="a" href="#" color="blue-gray" className="font-normal text-sm text-gray-500 transition-colors hover:text-blue-500 focus:text-blue-500">
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}
