import React from 'react';

export default function InputComponent({title, id, type, placeholder, value, onChange, onKeyDown}) {
  return (
    <div className="flex flex-col mb-2">
        <label for={id} class="block mb-2 font-bold text-[10px] mobile-xl:text-sm text-[#1496d5]">{title}</label>
        <input type={type} id={id} class="bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-xl:text-sm rounded-md block w-full p-2 " placeholder={placeholder}
            value={value} 
            onChange={onChange}
            onKeyDown={onKeyDown} 
        />
    </div>
  )
}

export function FilterInput({ name, type, placeholder, value, onKeyDown, onChange }) {
  return (
    <input name={name} type={type} class="bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-xl:text-sm rounded-full block w-full px-2 py-0 mobile-xl:py-1" placeholder={placeholder}
        value={value} 
        onChange={onChange}
        onKeyDown={onKeyDown} 
    />
  )
}

