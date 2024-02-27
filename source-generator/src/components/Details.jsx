import React from 'react';
import Links from '../pages/Links';

const ProfileComponent = () => {
  return (
    <div className="fixed right-0 top-0 bottom-0 bg-white z-20 shadow-left">
      <div className='h-16 bg-main_color'></div>
      <Links />
      <div className='mt-8 h-24 bg-main_color'></div>
    </div>
  );
};

export default ProfileComponent;
