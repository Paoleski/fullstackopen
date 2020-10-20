import React from 'react';

const Filter = ({filteredText, handleFilter}) => {
    return (
        <div>
            filter shown with <input value={filteredText} onChange={handleFilter}></input>
        </div>
    )
}

export default Filter;

