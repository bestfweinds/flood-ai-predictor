import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { ProvinceRawData, Language } from '../types';
import { translations } from '../utils/translations';


interface SearchBarProps {
    provinces: ProvinceRawData[];
    onSelect: (provinceId: string) => void;
    language: Language;
}

export const SearchBar: React.FC<SearchBarProps> = ({ provinces, onSelect, language }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    const tMap = (map: keyof typeof translations.vi.maps, key: string) => (translations[language].maps[map] as Record<string, string>)[key] || key;


    const suggestions = useMemo(() => {
        if (!query) return [];
        const lowerCaseQuery = query.toLowerCase();
        return provinces
            .filter(p => {
                 const originalName = p.name.toLowerCase();
                 const translatedName = tMap('provinceNameMap', p.name).toLowerCase();
                 return originalName.includes(lowerCaseQuery) || translatedName.includes(lowerCaseQuery);
            })
            .slice(0, 7); // Limit suggestions
    }, [query, provinces, language]);

    const handleSelect = (provinceId: string) => {
        onSelect(provinceId);
        setQuery('');
        setIsFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full sm:w-64" ref={searchContainerRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder={t('searchPlaceholder')}
                    className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 text-white focus:outline-none focus:bg-gray-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            {isFocused && suggestions.length > 0 && (
                <ul className="absolute z-20 mt-1 w-full bg-gray-700 shadow-lg rounded-md max-h-60 overflow-auto">
                    {suggestions.map(province => (
                        <li
                            key={province.id}
                            onClick={() => handleSelect(province.id)}
                            className="cursor-pointer select-none relative py-2 px-4 text-gray-300 hover:bg-blue-600 hover:text-white"
                        >
                            {tMap('provinceNameMap', province.name)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
