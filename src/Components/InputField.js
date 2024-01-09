import React from 'react'

function InputField({ label, name, value, onChange , placeholder }) {
  return (
    

    <div className="flex flex-col mb-4">
        <label htmlFor={name} className="mb-2 font-bold text-lg text-gray-900">
            {label}
        </label>
        <input
            className="border py-2 px-3 text-grey-800"
            name={name}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
  )
}

export default InputField