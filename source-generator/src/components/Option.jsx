import { deleteLinks } from "../pages/firebase"

/**
   * Renders an options item with edit and delete buttons.
   * 
   * @param {Object} id - The ID of the item.
   * @returns {JSX.Element} The rendered options item.
   */
const OptionsItem = (id) => {
    return (
        <div className="absolute bg-white rounded-md shadow-lg">
            <div className="flex flex-col p-2">
                <button
                    onClick={() => {
                        alert("Want to edit " + id.id)
                        console.log("You clicked on ", id.id)
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Edit
                </button>
                <button
                    onClick={() => {
                        const strint = "Want to Delete " + id.id
                        alert(strint)
                        console.log(strint)
                        deleteLinks(id.id)
                    }}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default OptionsItem