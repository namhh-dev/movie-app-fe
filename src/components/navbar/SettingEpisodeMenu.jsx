import React from "react";
import { Button } from '@material-tailwind/react';
import { IconAdd, IconReOrder } from "../icon/Icon";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function SettingEpisodeMenu({ handleCreateOpen, handleReOrderOpen }) {
  const navigation = [
        { label: "Thêm tập mới", icon: <IconAdd />, onClick: handleCreateOpen, current: true },
        { label: "Sắp xếp", icon: <IconReOrder />, onClick: handleReOrderOpen, current: false }
    ];

  return(
    <Disclosure as="nav" className="z-50 w-full">
      <div className="mx-auto">
        <div className="relative flex h-10 items-center">
          <div className="absolute inset-y-0 right-0 flex items-center laptop-m:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-4 w-4 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-4 w-4 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="hidden laptop-m:flex items-center justify-end w-full">
            <div className="flex gap-2">
              {navigation.map((item) => (
                <Button onClick={item.onClick} key={item.label} variant="gradient" color='green' className="flex rounded-full items-center gap-1 px-3 mobile-xl:px-3 py-1">
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      <DisclosurePanel className="laptop-m:hidden mb-2">
        <div className="grid gap-2">
          {navigation.map((item) => (
            <Button onClick={item.onClick} key={item.label} variant="gradient" color="green" className="flex rounded-full items-center gap-1 px-3 mobile-xl:px-3 py-1 text-[10px]">
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
)}
