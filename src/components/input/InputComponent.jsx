import React from 'react';

export default function InputComponent({title, id, type, placeholder, value, onChange}) {
  return (
    <div>
        <label for={id} class="block mb-2 text-md font-bold text-gray-900 dark:text-white">{title}</label>
        <input type={type} id={id} class="bg-white border border-gray-200 placeholder-slate-300 text-black text-sm rounded-md block w-full p-2 " placeholder={placeholder}
            value={value} 
            onChange={onChange} 
        />
    </div>
  )
}
