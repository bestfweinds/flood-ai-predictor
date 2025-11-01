
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { VietnamMap } from './components/VietnamMap';
import { InfoPanel } from './components/InfoPanel';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { Homepage } from './components/Homepage';
import { DataPage } from './components/DataPage';
import { AboutAiPage } from './components/AboutAiPage';
import type { Province, Region, ProvinceRawData, Language } from './types';
import { MONTHLY_PROVINCE_DATA } from './constants';
import { translations } from './utils/translations';
import { calculateAllProvinces } from './services/riskCalculator';

type Page = 'homepage' | 'map' | 'data' | 'aboutAi';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('homepage');
    const [selectedMonth, setSelectedMonth] = useState<string>('11');
    const [language, setLanguage] = useState<Language>('vi');

    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    
    const currentMonthData = useMemo(() => {
        return MONTHLY_PROVINCE_DATA[selectedMonth] || [];
    }, [selectedMonth]);

    const [provinces, setProvinces] = useState<Province[]>([]);
    
    useEffect(() => {
        setProvinces(calculateAllProvinces(currentMonthData));
        setSelectedProvince(null);
    }, [currentMonthData]);

    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [activeRegion, setActiveRegion] = useState<Region>('All');

    const handleSelectProvince = useCallback((provinceId: string) => {
        const province = provinces.find(p => p.id === provinceId);
        if (province) {
            setSelectedProvince(province);
        }
    }, [provinces]);

    const handleClearSelection = useCallback(() => {
        setSelectedProvince(null);
    }, []);

    const provinceDataMap = useMemo(() => 
        provinces.reduce((acc, province) => {
            acc[province.id] = province;
            return acc;
        }, {} as Record<string, Province>), 
    [provinces]);
    
    const provinceRawDataForSearch: ProvinceRawData[] = useMemo(() => currentMonthData, [currentMonthData]);

    if (currentPage === 'homepage') {
        return <Homepage 
            onEnterApp={() => setCurrentPage('map')} 
            onViewData={() => setCurrentPage('data')} 
            onNavigateToAboutAi={() => setCurrentPage('aboutAi')}
            language={language}
            setLanguage={setLanguage}
        />;
    }
    
    if (currentPage === 'data') {
        return <DataPage 
            onBackToMap={() => setCurrentPage('map')} 
            onNavigateToHome={() => setCurrentPage('homepage')}
            language={language}
            setLanguage={setLanguage}
        />;
    }

    if (currentPage === 'aboutAi') {
        return <AboutAiPage
            onBackToMap={() => setCurrentPage('map')}
            onNavigateToHome={() => setCurrentPage('homepage')}
            language={language}
            setLanguage={setLanguage}
        />;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
            <Header 
                activeRegion={activeRegion} 
                setActiveRegion={setActiveRegion} 
                provinces={provinceRawDataForSearch}
                onSelectProvince={handleSelectProvince}
                selectedMonth={selectedMonth}
                onSelectMonth={setSelectedMonth}
                onNavigateToData={() => setCurrentPage('data')}
                onNavigateToHome={() => setCurrentPage('homepage')}
                onNavigateToAboutAi={() => setCurrentPage('aboutAi')}
                language={language}
                setLanguage={setLanguage}
            />
            <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
                <div className="flex-grow lg:w-2/3 flex flex-col bg-gray-800 rounded-lg shadow-lg p-4 relative">
                    <VietnamMap 
                        provinceDataMap={provinceDataMap}
                        onSelectProvince={handleSelectProvince} 
                        selectedProvinceId={selectedProvince?.id || null} 
                        activeRegion={activeRegion}
                        onClearSelection={handleClearSelection}
                    />
                    <Legend language={language} />
                </div>
                <div className="lg:w-1/3 flex flex-col gap-4 overflow-y-auto">
                    {selectedProvince ? (
                        <InfoPanel province={selectedProvince} language={language} />
                    ) : (
                         <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex-grow flex flex-col justify-center items-center text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-white">{t('selectProvincePrompt')}</h3>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;