import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
      '&:hover': {
        borderColor: '#374151',
      },
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff', // Màu chữ của input khi đang nhập
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#374151' : state.isFocused ? '#374151' : '#374151',
    color: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
      },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
    color: 'white',
  }),
};

export function SelectComponent({title, placeholder, id, options, value, onChange}) {
  return(
      <div className="mb-2">
          <label for={id} class="block mb-2 text-md font-bold text-[#1496d5]">{title}</label>
          <Select className='text-sm'
              styles={customStyles}
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
    <div className='mb-2'>
        <label for={id} class="block mb-2 text-md font-bold text-[#1496d5]">{title}</label>
        <select value={value} onChange={onChange} id="quality" className="w-full p-2 bg-gray-700 placeholder-slate-300 text-white text-sm rounded-md block">
            <option disabled>Chọn {id}</option>
            {options.map((op, index)=> {
                return <option key={index} value={op.value}>{op.label}</option>
            })}
        </select>
    </div>
  )
}
