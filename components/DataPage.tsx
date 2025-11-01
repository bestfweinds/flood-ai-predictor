import React, { useState, useMemo } from 'react';
import { MONTHLY_PROVINCE_DATA, BASE_PROVINCE_DATA } from '../constants';
import type { ProvinceRawData, Language } from '../types';
import { translations } from '../utils/translations';

interface DataPageProps {
    onBackToMap: () => void;
    onNavigateToHome: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const MonthButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
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

export const DataPage: React.FC<DataPageProps> = ({ onBackToMap, onNavigateToHome, language, setLanguage }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>('11');
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    const tMap = (map: keyof typeof translations.vi.maps, key: string) => (translations[language].maps[map] as Record<string, string>)[key] || key;

    const MONTHS = [
        { key: '11', label: t('month11') },
        { key: '12', label: t('month12') },
        { key: '1', label: t('month1') },
    ];

    const currentWeatherData = useMemo(() => {
        const monthData = MONTHLY_PROVINCE_DATA[selectedMonth] || [];
        return monthData.reduce((acc, province) => {
            acc[province.id] = province.riskFactors.weather;
            return acc;
        }, {} as Record<string, ProvinceRawData['riskFactors']['weather']>);
    }, [selectedMonth]);

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{t('dataPageTitle')}</h1>
                        <p className="text-gray-400 mt-1">{t('dataPageDescription')}</p>
                    </div>
                     <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={onBackToMap}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        >
                            &larr; {t('backToMap')}
                        </button>
                         <button
                            onClick={onNavigateToHome}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                        >
                            {t('home')}
                        </button>
                        <LanguageToggle language={language} setLanguage={setLanguage} />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                     <div className="flex items-center justify-center sm:justify-start space-x-2">
                         <span className="text-sm font-medium text-gray-400 mr-2">{t('selectMonthWeather')}</span>
                         {MONTHS.map(({ key, label }) => (
                            <MonthButton
                                key={key}
                                label={label}
                                isActive={selectedMonth === key}
                                onClick={() => setSelectedMonth(key)}
                            />
                         ))}
                    </div>
                </div>

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl">
                    <div className="max-h-[70vh] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800 sticky top-0 z-10">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">{t('thProvince')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">{t('thGeography')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">{t('thInfrastructure')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">{t('thFlood1Y')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">{t('thFlood5Y')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">{t('thFlood10Y')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-center text-sm font-semibold text-white">{t('thRainfall')}</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">{t('thWeatherForecast')} ({t('monthShort')} {selectedMonth})</th>
                                    <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-white">{t('thWeatherStatus')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {BASE_PROVINCE_DATA.map((province, index) => {
                                    const weather = currentWeatherData[province.id];
                                    return (
                                        <tr key={province.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'}>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-white">{tMap('provinceNameMap', province.name)}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{tMap('geographyMap', province.riskFactors.geography)}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">{tMap('infrastructureMap', province.riskFactors.infrastructure)}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-center text-gray-300">{province.riskFactors.history.lastYear}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-center text-gray-300">{province.riskFactors.history.last5Years}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-center text-gray-300">{province.riskFactors.history.last10Years}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-center text-gray-300">{weather ? `${weather.predictedRainfall_mm}` : 'N/A'}</td>
                                            <td className="py-4 px-4 text-sm text-gray-300 max-w-xs">{weather ? tMap('weatherContentMap', weather.summary) : 'N/A'}</td>
                                            <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    weather?.status === 'above_average' ? 'bg-yellow-900 text-yellow-300' :
                                                    weather?.status === 'storm_warning' ? 'bg-red-900 text-red-300' :
                                                    'bg-green-900 text-green-300'
                                                }`}>
                                                    {tMap('weatherStatusMap', weather?.status || 'normal')}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};
