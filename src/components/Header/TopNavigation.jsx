import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";

const GET_CATEGORY_TREE = gql`
  query GetCategories {
    categories(filters: {}) {
      items {
        id
        name
        url_path
        level
        children {
          id
          name
          url_path
          level
          children {
            id
            name
            url_path
            level
            children {
              id
              name
              url_path
              level
            }
          }
        }
      }
    }
  }
`;

const TopNavigation = () => {
  const { loading, error, data } = useQuery(GET_CATEGORY_TREE);
  const [openDropdownId, setOpenDropdownId] = useState(null);  // Hook is now unconditionally called
  const [hoverTimeout, setHoverTimeout] = useState(null);  // Same with the timeout state

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Handle hover in (open dropdown)
  const handleHoverIn = (id) => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear existing timeout if any
    setOpenDropdownId(id);  // Open the dropdown
  };

  // Handle hover out (close dropdown after 500ms delay)
  const handleHoverOut = () => {
    setHoverTimeout(setTimeout(() => setOpenDropdownId(null), 500));  // 500ms delay
  };

  // Recursively render categories
  const renderCategories = (categories, level = 0) => {
    if (!Array.isArray(categories)) return null;

    return (
      <ul
        className={`${
          level === 0
            ? "flex space-x-4"  // Parent categories are horizontal
            : "absolute left-0 top-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"  // Dropdown style
        }`}
      >
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative group"
            onMouseEnter={() => handleHoverIn(category.id)}  // Hover in
            onMouseLeave={handleHoverOut}  // Hover out
          >
            <NavLink
              to={`/${category.url_path}`}
              className={({ isActive }) =>
                `px-4 py-2 block hover:bg-gray-100 ${isActive ? "text-blue-700" : "text-gray-900"}`
              }
            >
              {category.name}
              {category.children?.length > 0 && (
                <svg
                  className="w-2.5 h-2.5 ms-2.5 inline-block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              )}
            </NavLink>

            {/* Render child categories */}
            {category.children?.length > 0 && (
              <div
                className={`absolute left-0 top-[50%] bg-white border border-gray-200 shadow-lg min-w-max rounded-md z-20 transition-opacity duration-500 ${
                  openDropdownId === category.id ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {renderCategories(category.children, level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          {renderCategories(data.categories.items)}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
