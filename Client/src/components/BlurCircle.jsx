import React from 'react';

const BlurCircle = ({ top = 'auto', left = 'auto', right = 'auto', bottom = 'auto' }) => {
  return (
    <div
      className='absolute -z-50 h-60 w-60 aspect-square rounded-full bg-red-500/30 blur-3xl'
      style={{ top, left, right, bottom }}
    ></div>
  );
};

export default BlurCircle;
