import { useState, useEffect, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";

interface SDDropdownProps {
  items: DropDownItem[];
  children: React.ReactNode;
  buttonClassName?: string;
  chevronClassName?: string;
}

const SDDropdown: React.FC<SDDropdownProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleShow(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShow((show) => !show);
  }

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function calculateMenuHeight() {
      if (menuRef.current) {
        const list = menuRef.current.querySelector("ul");
        // const menuItemHeight = menuItems.length > 0 ? menuItems[0].offsetHeight : 0;
        // const menuHeight = menuItems.length * menuItemHeight;
        menuRef.current.style.height = `${list?.offsetHeight}px`;
      }
    }

    calculateMenuHeight();
  }, [show]);

  return (
    <div className="relative">
      <button
        onClick={toggleShow}
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className={`${props.buttonClassName || ''} font-medium rounded-lg  px-4 py-2.5 text-center inline-flex items-center  h-[40px]`}
        type="button"
      >
        {props.children}
        <svg
          className={`${props.chevronClassName || ''} w-4 h-4 mr-2`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        id="dropdownDivider"
        className={`${
          !show && "hidden"
        } z-20 absolute top-[43px] left-0 inset-y-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 overflow-y-auto`}
        ref={menuRef}
      >
        <ul
          className="py-2 text-sm rounded-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
          {props.items.map((item, index) => {
            return (
              <SDDropDownItem
                key={index}
                handleLiClick={() => setShow(false)}
                {...item}
              ></SDDropDownItem>
            );
          })}

          {/* Add more menu items dynamically */}
        </ul>
      </div>
    </div>
  );
};

export interface DropDownItem {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  mode?: "Link" | "Button";
  href?: string;
  title: string;
  icon?: React.ReactNode;
}

interface SDDropdownItemProps extends DropDownItem {
  handleLiClick?: (event: MouseEvent<HTMLLIElement>) => void;
}

export const SDDropDownItem: React.FC<SDDropdownItemProps> = ({
  handleLiClick,
  onClick,
  mode = "Link",
  href,
  title,
  icon,
}) => {
  return (
    <li
      onClick={handleLiClick}
      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      {mode === "Link" ? (
        <Link to={href || ""}>
          <div className="flex gap-2 items-center py-1">
            {icon ? icon : ""}
            {title}
          </div>
        </Link>
      ) : (
        <button className="flex gap-2 items-center py-1" onClick={onClick}>
          {icon ? icon : ""}
          {title}
        </button>
      )}
    </li>
  );
};

export default SDDropdown;
