'use client';

import React from 'react';
import UserIcon from '../icon/UserIcon';
import SettingIcon from '../icon/SettingIcon';

function UserButtonGroup() {
  const username = sessionStorage.getItem('name');
  return (
    <div className="flex justify-between items-center gap-5">
      <span className="font-medium text-base text-lightGray-600 cursor-pointer">
        {username}
      </span>
      <span className="font-medium text-base text-lightGray-600">|</span>
      <UserIcon className="h-6 w-6 text-lightGray-600 cursor-pointer" />
      <SettingIcon className="h-6 w-6 text-lightGray-600 cursor-pointer" />
    </div>
  );
}

export default UserButtonGroup;
