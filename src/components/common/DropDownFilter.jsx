import React from 'react'
import { IconSort } from '../icon/Icon'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DropDownFilter({ curent, sortOptions }) {
    
  return (
    <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <IconSort />
                <ChevronDownIcon aria-hidden="true" className="-mr-1 mobile-xl:h-5 mobile-xl:w-5 w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
            </MenuButton>

            <MenuItems transition className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-[#23262D] shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                        <Link to={option.href}
                            className={classNames(curent==option.value?'bg-gray-600':'','font-medium text-white block px-2 py-1 mobile-xl:py-2 mobile-xl:px-4 mobile-xl:text-sm text-[12px] data-[focus]:bg-[#8b5cf6]')}>
                            {option.name}
                        </Link>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    </div>
  )
}
