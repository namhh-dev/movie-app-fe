import React from 'react';

export default function InputComponent({title, id, type, placeholder, value, onChange}) {
  return (
    <div className="flex flex-col mb-2">
        <label for={id} class="block mb-2 font-bold text-[10px] mobile-l:text-sm text-[#1496d5]">{title}</label>
        <input type={type} id={id} class="bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-l:text-sm rounded-md block w-full p-2 " placeholder={placeholder}
            value={value} 
            onChange={onChange} 
        />
    </div>
  )
}

export function FilterInput({type, placeholder, value, onChange}) {
  return (
    <input type={type} class="bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-l:text-sm rounded-full block w-full px-2 py-0 mobile-l:py-1" placeholder={placeholder}
        value={value} 
        onChange={onChange} 
    />
  )
}

