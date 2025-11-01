
import React from 'react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutAiPageProps {
    onBackToMap: () => void;
    onNavigateToHome: () => void;
    language: Language;
    setLanguage: (language: Language) => void;
}

const LanguageToggle: React.FC<{ language: Language, setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => (
    <div className="flex items-center bg-gray-700 rounded-md p-1">
        <button 
            onClick={() => setLanguage('vi')}
            className={`px-3 py-1 text-sm font-bold rounded ${language === 'vi' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
        >
            Tiếng Việt
        </button>
        <button 
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 text-sm font-bold rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
        >
            English
        </button>
    </div>
);

const InfoCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-md flex items-start gap-4">
        <div className="flex-shrink-0 text-blue-400">{icon}</div>
        <div>
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

export const AboutAiPage: React.FC<AboutAiPageProps> = ({ onBackToMap, onNavigateToHome, language, setLanguage }) => {
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    
    return (
        <div className="bg-gray-900 min-h-screen text-gray-200 font-sans">
             <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                 <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white">{t('aboutAiPageTitle')}</h1>
                        <p className="text-gray-400 mt-2">{t('aboutAiPageDescription')}</p>
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
                    </div>
                </div>

                {/* How AI Works Section */}
                <div className="mb-12">
                     <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">{t('howAiWorksTitle')}</h2>
                     <div className="space-y-6">
                        <InfoCard 
                            title={t('howAiWorks1Title')}
                            description={t('howAiWorks1Desc')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                        />
                         <InfoCard 
                            title={t('howAiWorks2Title')}
                            description={t('howAiWorks2Desc')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                        />
                         <InfoCard 
                            title={t('howAiWorks3Title')}
                            description={t('howAiWorks3Desc')}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        />
                     </div>
                </div>

                {/* Terms of Use Section */}
                <div>
                     <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">{t('termsOfUseTitle')}</h2>
                     <div className="space-y-6">
                        <div className="bg-gray-800 border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-md">
                             <h3 className="text-xl font-semibold mb-2 text-yellow-300">{t('termsOfUse1Title')}</h3>
                             <p className="text-gray-400">{t('termsOfUse1Desc')}</p>
                        </div>
                         <div className="bg-gray-800 border-l-4 border-red-500 p-6 rounded-r-lg shadow-md">
                             <h3 className="text-xl font-semibold mb-2 text-red-400">{t('termsOfUse2Title')}</h3>
                             <p className="text-gray-400 font-medium">{t('termsOfUse2Desc')}</p>
                        </div>
                     </div>
                </div>

                 <footer className="text-center py-10 mt-10 border-t border-gray-800">
                    <LanguageToggle language={language} setLanguage={setLanguage} />
                </footer>
             </div>
        </div>
    );
};
