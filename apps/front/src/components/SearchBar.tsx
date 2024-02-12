import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
    dataList: string[];
};

export const SearchBar: React.FC<SearchBarProps> = ({ dataList }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredResults, setFilteredResults] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === "") {
            setFilteredResults([]);
        } else {
            const filtered = dataList.filter(item =>
                item.toLowerCase().includes(term.toLowerCase())
            ).slice(0, 6);
            setFilteredResults(filtered);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (inputRef.current) {
                setTimeout(() => {
                    inputRef.current?.blur();
                }, 0);
            }
            setFilteredResults([]);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        setSearchTerm(e.currentTarget.textContent || "");
        setFilteredResults([]);
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.relatedTarget === null) {
            setFilteredResults([]);
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [filteredResults]);

    return (
        <div className="search-container">
            <div className="search-icon">
                <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
                className="input"
                type="text"
                placeholder="Recherchez ..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
                ref={inputRef}
            />

            {filteredResults.length > 0 && (
                <ul className="dropdown">
                    {filteredResults.map((result, index) => (
                        <li tabIndex={0} key={index} onClick={handleClick}>{result}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};