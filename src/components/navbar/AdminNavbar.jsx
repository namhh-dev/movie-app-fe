import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Thumb from '../../assets/image/thumb.png';
import { Link } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminNavbar({ page }) {
  
  const navigation = [
    { name: 'Danh sách phim', href: '/admin/movie' },
    { name: 'Tạo phim', href: '/admin/create-movie' },
  ]

  return (
    <Disclosure as="nav" className="fixed top-0 z-50 backdrop-blur-lg w-full bg-transparent border-gray-400 border-b-[1px]">
      <div className="">
        <div className="relative flex h-14 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className='px-4'>
              <Link to="/admin/movie" div className="flex flex-shrink-0 items-center justify-center">
                  <img alt="Your Company" src={Thumb} className="h-10 w-auto"/>
              </Link>
            </div>
            <div className="hidden laptop-m:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item, index) => (
                  <Link key={item.name} to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      index === page ? 'bg-gray-500 text-white' : 'hover:bg-[#8b5cf6]',
                      'rounded-md px-3 py-2 text-[15px] text-white font-medium cursor-pointer',
                    )}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item, index) => (
            <DisclosureButton
              key={item.name} as="a"
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                index === page ? 'bg-gray-500 text-white' : 'hover:bg-[#8b5cf6]',
                'block rounded-md px-3 py-2 text-base text-white font-medium hover:cursor-pointer',
              )}>
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
