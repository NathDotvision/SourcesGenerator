import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { auth, signOut } from "../pages/firebase"
import { Link } from "react-router-dom"

/**
 * Navigation data for the NavBar component.
 * @type {Array<{ name: string, href: string, current: boolean }>}
 */
const navigation = [
  { name: "Dashboard", href: "../", current: true },
  { name: "Links", href: "/links", current: false },
  { name: "Projets", href: "/projets", current: false },
  { name: "Abouts", href: "/about", current: false },
]

/**
 * Represents an array of parameters.
 * @typedef {Object[]} Parameter
 * @property {string} name - The name of the parameter.
 * @property {string} href - The URL of the parameter.
 * @property {boolean} current - Indicates if the parameter is currently active.
 * @property {Function} [action] - The action to be performed when the parameter is clicked.
 */
const Parameter = [
  { name: "Profile", href: "#", current: true },
  { name: "Settings", href: "#", current: false },
  {
    name: "Sign out",
    href: "#",
    current: true,
    action: () => {
      console.log("Sign out")
      signOut(auth).then(() => {
        console.log("Sign out")
      })
    },
  },
  { name: "Sign in", href: "/signIn", current: false },
  { name: "Log in ", href: "#", current: false },
]

/**
 * Returns a string of concatenated class names.
 * @param {...string} classes - The class names to be concatenated.
 * @returns {string} - The concatenated class names.
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Renders the navigation bar component.
 * @returns {JSX.Element} The rendered navigation bar.
 */
export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-main_color">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 bg-secondary_color_light hover:bg-bg-secondary_color hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="icon-removebg.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-secondary_color text-white"
                            : "text-secondary_color_light hover:bg-secondary_color_light hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        onClick={() => {
                          //alert("You clicked on " + item.name)
                          navigation.forEach((nav) => (nav.current = false))
                          item.current = true
                        }}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 h-24">
                <button
                  type="button"
                  className="relative rounded-full bg-main_color p-1 bg-secondary_color hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-main_color"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-main_color text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-main_color">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full bg-secondary_color_light"
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {Parameter.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? "bg-secondary_color_light" : "",
                                "block px-4 py-2 text-sm text-secondary_color"
                              )}
                              onClick={() => {
                                //alert("You clicked on " + item.name)
                                navigation.forEach(
                                  (nav) => (nav.current = false)
                                )
                                item.action()
                              }}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-secondary_color text-white"
                      : "text-black hover:bg-secondary_color_light",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
