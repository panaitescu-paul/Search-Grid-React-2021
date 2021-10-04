import React from 'react';

// Interface used for Type-checking
interface IFilterProps {
    onFilterChange: (newValue: string) => void
}
function Filter(props: IFilterProps) {
    function handleOnChange(event : React.ChangeEvent<HTMLInputElement>) {
        props.onFilterChange(event.target.value);
    }

    return (
        <div className="filter">
            <input
                data-testid="filter-input"
                className="form-control form-control-lg"
                type="text"
                placeholder="Type to search"
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Filter;