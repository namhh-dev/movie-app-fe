import React from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Thumb from '../../assets/image/thumb.png';
import Dropdown from './Dropdown';
import { useStore } from '../../hooks/useStore';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const context = useStore();

  const [query, setQuery] = useState("");
  
  const navigation = [
    ...(context.Types && context.Types.length > 0
      ? context.Types.map((type) => ({
          name: type.type_name,
          href: `/movie/type/${type.type_id}`,
          current: false,
        }))
      : [
          { name: 'Phim bộ', href: '/movie/type/series', current: false },
          { name: 'Phim lẻ', href: '/movie/type/single', current: false },
          { name: 'TV Show', href: '/movie/type/tvshows', current: false },
          { name: 'Hoạt hình', href: '/movie/type/hoathinh', current: false },
    ])
  ];

  return (
    <Disclosure as="nav" className="fixed top-0 z-50 backdrop-blur-lg w-full bg-transparent border-gray-400 border-b-[1px]">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center">
          <div className="absolute inset-y-0 right-0 flex items-center laptop-m:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-between md:items-stretch md:justify-between">
            <div className='flex items-center'>
              <a href="/" className="flex flex-shrink-0 items-center">
                <img alt="Your Company" src={Thumb} className="h-12 w-auto"/>
              </a>

              <div className="ml-5 rounded-lg hidden tablet-xl:block">
                <form method='GET' action="/movie/search">
                  <input id="search" name="query" type="text" placeholder="Tìm kiếm phim..."
                    value={query}
                    onChange={(e) => {setQuery(e.target.value)}}
                    className="block w-[20rem] rounded-3xl border-0 py-1.5 px-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <input type="hidden" value={1} name="page"/>
                </form>
              </div>
            </div>

            <div className="hidden md:ml-6 laptop-m:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-[#1496d5]',
                      'rounded-md px-3 py-2 text-sm font-bold',
                    )}>
                    {item.name}
                  </Link>
                ))}
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="laptop-m:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link to={item.href}>
              <DisclosureButton key={item.name} as="a" aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}>
                  {item.name}
              </DisclosureButton>
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
