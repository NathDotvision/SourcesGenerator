import * as component from './index';

/**
 * Renders a list of items.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Determines whether to show the list or not.
 * @param {Array} props.data - The data to be rendered in the list.
 * @returns {JSX.Element|null} The rendered list component.
 */
export const List = ({ show, data }) => (
    show && (
        <div role="list" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 tele:grid-cols-5 gap-7">
            {data.map((source, index) => (
                <component.CardItem data={source} key={index} />
            ))}
        </div>
    )
);

export default List;