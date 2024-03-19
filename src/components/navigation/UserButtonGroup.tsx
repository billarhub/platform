'use client';

import React from 'react';
import UserIcon from '../icon/UserIcon';
import SettingIcon from '../icon/SettingIcon';
import SettingMenu from './SettingMenu';
interface IUserButtonGroupProps {
  username?: string;
  locale: string;
}

function UserButtonGroup({ username, locale }: IUserButtonGroupProps) {
  return (
    <div className="flex justify-between items-center gap-5">
      <span className="font-medium text-base text-lightGray-600 cursor-pointer">
        {username ? username : 'loading...'}
      </span>
      <span className="font-medium text-base text-lightGray-600">|</span>
      <UserIcon className="h-6 w-6 text-lightGray-600 cursor-pointer" />
      <SettingMenu locale={locale} />
    </div>
  );
}

export default UserButtonGroup;
