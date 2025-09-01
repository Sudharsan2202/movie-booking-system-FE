import React from 'react'

const Title = ({text1,text2}) => {
  return (
   <h1 className='font-medium text-2xl'>
    {text1} <samp className='underline text-red-500'>
        {text2}
    </samp>
   </h1>
  )
}

export default Title
