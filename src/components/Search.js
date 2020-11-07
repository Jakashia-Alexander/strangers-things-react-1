import {React, useState} from 'react';



const Search = (props) => {
    const {filterTerm, setFilterTerm} = props;

    return <form id="search" onSubmit={(event) => {
        event.preventDefault();
    }}>
<label htmlFor='keywords'> SEARCH </label>
        <input id='keywords' type='text' placeholder='Enter Keywords'
        value={ filterTerm }
        onChange={(event) => {
            setFilterTerm(event.target.value)
        }} />
        <button onClick={() => setFilterTerm('') }>RESET FILTER</button>
    </form>
}












export default Search;
