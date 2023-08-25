import React, { ReactNode } from 'react';

interface DropdownProps {
  label: string | ReactNode;
  children: ReactNode;
  tabIndex: number;
}
const Dropdown = ({ label, children, tabIndex }: DropdownProps) => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={tabIndex}
        className="input flex bg-white p-2.5 border border-gray-300  cursor-pointer"
      >
        {label}
      </label>
      <div
        tabIndex={tabIndex}
        className="dropdown-content z-[1] p-2 shadow bg-white rounded-box w-60"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
