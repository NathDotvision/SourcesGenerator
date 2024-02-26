import React from "react"

/**
 * Renders a notification component with a success message and a close button.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.message - The success message to display.
 * @param {Function} props.onClose - The function to call when the close button is clicked.
 * @returns {JSX.Element} The rendered notification component.
 */
const SavedNotification = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 right-0 m-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6 text-green-500 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-green-600 font-semibold">{message}</p>
        </div>
        <p className="text-gray-700">
          Anyone with a link can now view this file.
        </p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SavedNotification
