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
      padding: '0px 2px', // Padding mặc định
      '@media (min-width: 550px)': {
        padding: '0px 2px', // Padding cho màn hình nhỏ
      },
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff', // Màu chữ của input khi đang nhập
    '@media (min-width: 550px)': {
        padding: '0px 2px', // Padding cho màn hình nhỏ
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#374151' : state.isFocused ? '#374151' : '#374151',
    color: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black'
    },
    '@media (min-width: 550px)': {
        padding: '0px 2px', // Padding cho màn hình nhỏ
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
    color: 'white',
    '@media (max-width: 550px)': {
        padding: '0px 2px', // Padding cho màn hình nhỏ
    },
  }),
};

export function SelectComponent({title, placeholder, id, options, value, onChange, zIndex}) {
  return(
      <div className={`relative mb-2 z-${zIndex}`}>
          <label for={id} class="block mb-2 text-[10px] mobile-xl:text-sm font-bold text-[#1496d5]">{title}</label>
          <Select className='text-[10px] mobile-xl:text-sm'
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
        <label for={id} class="block mb-2 text-[10px] mobile-xl:text-sm font-bold text-[#1496d5]">{title}</label>
        <select value={value} onChange={onChange} id="quality" className="w-full py-0 mobile-xl:py-2 px-2 bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-xl:text-sm rounded-md block">
          {options.map((op, index)=> {
              return <option key={index} value={op.value}>{op.label}</option>
          })}
        </select>
    </div>
  )
}


export function FiterSelect({ name, title, value, options, onChange }) {
  return(
    <select name={name} value={value?value:''} onChange={onChange} className="w-full py-0 mobile-xl:py-1 px-2 bg-gray-700 placeholder-slate-300 text-white text-[10px] mobile-xl:text-sm rounded-full block">
      <option value=''>{title}</option>
      {options.map((op, index)=> {
          return <option key={index} value={op.value}>{op.label}</option>
      })}
    </select>
  )
}
