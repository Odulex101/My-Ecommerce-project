import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            showResults,
            setShowResults
        }}>
            {children}
        </SearchContext.Provider>
    );
};