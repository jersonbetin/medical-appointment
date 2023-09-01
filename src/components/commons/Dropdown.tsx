import React, { ReactNode } from 'react';

interface DropdownProps {
  label: string | ReactNode;
  children: ReactNode;
  tabIndex: number;
  className?: String;
}
const Dropdown = ({
  label,
  children,
  tabIndex,
  className = 'dropdown-end',
}: DropdownProps) => {
  return (
    <div className={`dropdown dropdown-bottom ${className}`}>
      <label
        tabIndex={tabIndex}
        className="input flex bg-white p-2.5 border border-gray-300  cursor-pointer"
      >
        {label}
      </label>
      <div
        tabIndex={tabIndex}
        className="dropdown-content z-[1] p-2 shadow-sm bg-white rounded-box w-min"
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
