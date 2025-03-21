import React, {useId} from 'react'

 function Select({
    options,
    label,
    className='',
    ...props
},ref)   {

    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1' htmlFor={id}></label>}
        <select 
        className={`px-3 py-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
        ref={ref}
        {...props}>
        {options?.map((option)=>(
            <option key={id} value={option}>{option}</option>
        ))}
        </select>
      
    </div>
  )
};

export default React.forwardRef(Select)
