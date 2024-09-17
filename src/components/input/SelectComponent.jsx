import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export function SelectComponent({title, placeholder, id, options, value, onChange}) {
    return(
        <div className="mb-4">
            <label for={id} class="block mb-2 text-md font-bold text-gray-900 dark:text-white">{title}</label>
            <Select className='text-sm'
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={options}
                value={value}
                onChange={onChange}
                isMulti={true}
                placeholder={placeholder}
            />
        </div>
    )
}

export function SingleSelectComponent({value, title, id, options, onChange}) {
    return(
        <div>
            <label for={id} class="block mb-2 text-md font-bold text-gray-900 dark:text-white">{title}</label>
            <select value={value} onChange={onChange} id="quality" className="w-full p-2 bg-white border border-gray-200 placeholder-slate-300 text-black text-sm rounded-md block">
                <option disabled>Chọn {id}</option>
                {options.map((op, index)=> {
                    return <option key={index} value={op.value}>{op.label}</option>
                })}
            </select>
        </div>
    )
}
