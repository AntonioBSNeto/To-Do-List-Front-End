import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface DropdownCardProps {
  title: string;
  children: JSX.Element;
  dropdownContent: JSX.Element;
  dropdown: boolean;
}


export const DropdownCard = ({ title, children, dropdownContent, dropdown = true }: DropdownCardProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between p-4 h-24 border-gray-regular">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-2 w-56">
              <span
                className="font-semibold text-2xl leading-none w-56 truncate"
                title={title}
              >
                {title}
              </span>
            </div>
          </div>
        </div>
        <div className="w-auto flex items-center p-4 gap-5">
          {dropdown && (
            <button onClick={toggleDropdown} className="text-4xl">
              {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
          )}
        </div>

      </div>
      <div className="flex flex-col px-5 mb-4 ml-3 gap-y-2">
        {children}
        {isDropdownOpen && dropdownContent}
      </div>
    </div >
  )
}