import React, { useState, useEffect, useRef } from 'react';
import { fetchCountry } from '../../../services/api/orther';

export default function SelectCountry({ setCountryCode }) {
    const [showSelect, setShowSelect] = useState(false);
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const selectRef = useRef(null); // Create a ref for the select

    // Fetch data on component mount
    useEffect(() => {
        fetchCountry(setCountries, setSearchCountry);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const result = countries.filter((country) =>
            country.name.common.toLowerCase().includes(value)
        );
        setSearchCountry(result);
        
        const selectedCountry = result.find(item => item.name.common.toLowerCase() === value);
        if (selectedCountry) {
            setCountryCode(selectedCountry.cca2);
        }
    };

    // Handle clicks outside the select
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setShowSelect(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <button 
                id="selectSearchButton" 
                onClick={() => setShowSelect(!showSelect)} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-400 block w-full p-2.5   " 
                type="button"
            >
                {searchValue || 'Select Country'}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            {showSelect && (
                <div 
                    id="selectSearch" 
                    ref={selectRef} 
                    className={`absolute z-50 ${showSelect ? '' : 'hidden'} bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
                >
                    <div className="p-3">
                        <label htmlFor="input-group-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                onChange={handleSearch} 
                                value={searchValue}
                                type="text" 
                                id="input-group-search" 
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                                placeholder="Search country"
                            />
                        </div>
                    </div>
                    <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="selectSearchButton">
                        {searchCountry.map((country, index) => (
                            <li key={index} className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => {
                                setSearchValue(country.name.common);
                                setCountryCode(country.cca2);
                            }}>
                                <p>{country.name.common}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}