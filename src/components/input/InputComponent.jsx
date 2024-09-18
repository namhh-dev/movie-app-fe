import React from 'react';

export default function InputComponent({title, id, type, placeholder, value, onChange}) {
  return (
    <div className="flex flex-col mb-2">
        <label for={id} class="block mb-2 font-bold text-[#1496d5]">{title}</label>
        <input type={type} id={id} class="bg-gray-700 placeholder-slate-300 text-white text-sm rounded-md block w-full p-2 " placeholder={placeholder}
            value={value} 
            onChange={onChange} 
        />
    </div>
  )
}
