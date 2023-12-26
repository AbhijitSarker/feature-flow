import React, { useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="flex w-full shadow-lg rounded bg-white" x-data="{ search: '' }">
            <input
                type="search"
                className="w-full border-none bg-transparent px-4 py-1 text-gray-900 focus:outline-none"
                placeholder="search"
                x-model="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                className={`m-2 rounded px-4 py-2 font-semibold text-gray-100 ${search ? 'bg-secondary' : 'bg-gray-500 cursor-not-allowed'
                    }`}
                disabled={!search}
            >
                search
            </button>
        </div>
    );
};

export default Search;