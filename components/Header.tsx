import React from 'react';
import type { Region, ProvinceRawData, Language } from '../types';
import { SearchBar } from './SearchBar';
import { translations } from '../utils/translations';


interface HeaderProps {
    activeRegion: Region;
    setActiveRegion: (region: Region) => void;
    provinces: ProvinceRawData[];
    onSelectProvince: (provinceId: string) => void;
    selectedMonth: string;
    onSelectMonth: (month: string) => void;
    onNavigateToData: () => void;
    onNavigateToHome: () => void;
    onNavigateToAboutAi: () => void;
    language: Language;
    setLanguage: (language: Language) => void;
}

const NavButton: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );
};

const LanguageToggle: React.FC<{ language: Language, setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => (
    <div className="flex items-center bg-gray-700 rounded-md p-0.5">
        <button 
            onClick={() => setLanguage('vi')}
            className={`px-2 py-1 text-xs font-bold rounded ${language === 'vi' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
        >
            VI
        </button>
        <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 text-xs font-bold rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
        >
            EN
        </button>
    </div>
);


export const Header: React.FC<HeaderProps> = ({ 
    activeRegion, setActiveRegion, 
    provinces, onSelectProvince,
    selectedMonth, onSelectMonth,
    onNavigateToData, onNavigateToHome, onNavigateToAboutAi,
    language, setLanguage
}) => {
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;

    const MONTHS = [
        { key: '11', label: t('month11') },
        { key: '12', label: t('month12') },
        { key: '1', label: t('month1') },
    ];

    return (
        <header className="flex-shrink-0 bg-gray-800 shadow-lg z-20">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-y-4">
                <div className="flex flex-wrap justify-between items-center gap-y-3">
                    <div className="flex items-center gap-2 sm:gap-4 order-1">
                        <div className="flex items-center gap-2">
                             <button onClick={onNavigateToHome} className="text-sm text-blue-400 hover:underline">
                                {t('home')}
                            </button>
                            <span className="text-gray-600">|</span>
                             <button onClick={onNavigateToData} className="text-sm text-blue-400 hover:underline">
                                {t('database')}
                            </button>
                             <span className="text-gray-600">|</span>
                             <button onClick={onNavigateToAboutAi} className="text-sm text-blue-400 hover:underline">
                                {t('aboutAi')}
                            </button>
                        </div>
                        <h1 className="text-base md:text-xl font-bold text-white hidden sm:block">
                           {t('appTitleShort')}
                        </h1>
                    </div>
                     <div className="order-3 sm:order-2 w-full sm:w-auto">
                        <SearchBar provinces={provinces} onSelect={onSelectProvince} language={language} />
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 order-2 sm:order-3">
                        <NavButton label={t('allVietnam')} isActive={activeRegion === 'All'} onClick={() => setActiveRegion('All')} />
                        <NavButton label={t('north')} isActive={activeRegion === 'North'} onClick={() => setActiveRegion('North')} />
                        <NavButton label={t('central')} isActive={activeRegion === 'Central'} onClick={() => setActiveRegion('Central')} />
                        <NavButton label={t('south')} isActive={activeRegion === 'South'} onClick={() => setActiveRegion('South')} />
                        <LanguageToggle language={language} setLanguage={setLanguage} />
                    </div>
                </div>
                 <div className="flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 border-t border-gray-700 pt-3">
                     <span className="text-sm font-medium text-gray-400 mr-2">{t('selectMonth')}</span>
                     {MONTHS.map(({ key, label }) => (
                        <NavButton
                            key={key}
                            label={label}
                            isActive={selectedMonth === key}
                            onClick={() => onSelectMonth(key)}
                        />
                     ))}
                </div>
            </div>
        </header>
    );
};
