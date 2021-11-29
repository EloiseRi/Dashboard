import { Menu, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import AnchorLink from "./AnchorLink";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="flex fixed w-full items-center justify-between px-6 h-20 bg-white text-gray-700 border-b border-gray-200 z-10">
      <div className="flex items-center">
        {!isLoading && user && (
          <button className="mr-2" aria-label="Open Menu" onClick={toggle}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-8 h-8"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="w-24"
        />
        <span className="text-xl">OCTOBOARD</span>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex md:justify-between md:bg-transparent">
          {!isLoading && !user && (
            <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
              <Link
                href="/api/auth/login"
                tabIndex={0}
                testId="navbar-login-desktop"
              >
                Log In
              </Link>
            </button>
          )}
          {user && (
            <div className="w-30 text-right">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-desktop"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-black"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <EditActiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            ) : (
                              <EditInactiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            )}
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <AnchorLink
                            href="/api/auth/logout"
                            className={`${
                              active
                                ? "bg-violet-500 text-black"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <MoveActiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            ) : (
                              <MoveInactiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            )}
                            Log out
                          </AnchorLink>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <aside
        className={
          isOpen
            ? "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
            : "transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 -translate-x-full"
        }
      >
        <span
          onClick={toggle}
          className="flex items-center ml-4 p-2 border-b h-20"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </span>
        <span
          onClick={toggle}
          className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
        >
          <span className="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <span>Home</span>
        </span>
        <span
          onClick={toggle}
          className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
        >
          <span className="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
          </span>
          <span>New Widget</span>
        </span>
        <span
          onClick={toggle}
          className="flex items-center p-4 hover:bg-indigo-500 hover:text-white "
        >
          <span className="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </span>
          <span>About</span>
        </span>
      </aside>
    </nav>
  );
};

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46 26c0 6.1-3.4 11.5-7 14.8V44c0 2 1 5.1 11 7a15.5 15.5 0 0 1 12 11H2a13.4 13.4 0 0 1 11-11c10-1.8 12-5 12-7v-3.2c-3.6-3.3-7-8.6-7-14.8v-9.6C18 6 25.4 2 32 2s14 4 14 14.4z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46 26c0 6.1-3.4 11.5-7 14.8V44c0 2 1 5.1 11 7a15.5 15.5 0 0 1 12 11H2a13.4 13.4 0 0 1 11-11c10-1.8 12-5 12-7v-3.2c-3.6-3.3-7-8.6-7-14.8v-9.6C18 6 25.4 2 32 2s14 4 14 14.4z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoveInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

export default NavBar;