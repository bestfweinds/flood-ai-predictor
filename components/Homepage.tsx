
import React from 'react';
import type { Language } from '../types';
import { translations } from '../utils/translations';

interface HomepageProps {
    onEnterApp: () => void;
    onViewData: () => void;
    onNavigateToAboutAi: () => void;
    language: Language;
    setLanguage: (language: Language) => void;
}

const UserCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

const LanguageToggle: React.FC<{ language: Language, setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => (
    <div className="inline-flex items-center bg-gray-700 rounded-md p-1">
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

export const Homepage: React.FC<HomepageProps> = ({ onEnterApp, onViewData, onNavigateToAboutAi, language, setLanguage }) => {
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            {/* Hero Section */}
            <div className="relative text-center py-20 lg:py-32 px-4 bg-gray-800/50">
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10" 
                    style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%233b82f6' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 670l-49.5-49.5-34-34-19.5-19.5-15-15-9-9-7-7-5-5-3-3-2-2-1-1z'/%3E%3Cpath d='M-23 72l117-259.9 137 34.5 142.5 61.5-149.5 150-134 159.5-155.5-22.5z'/%3E%3Cpath d='M1012 364l-232 232-219 219-138 138-119 119-7-7-21-21-21-21-13-13-11-11-9-9-5-5-4-4-2-2-1-1z'/%3E%3Cpath d='M-270 23l3.5-89.5 34.5-9.5 35 16.5 28 32 24 45.5 32 64.5-55 43-41 21-42-12-21-18-24-32-15-18z'/%3E%3Cpath d='M815 204l-106-106-23-23-44-44-43-43-34-34-28-28-14-14-9-9-6-6-4-4-2-2-1-1z'/%3E%3Cpath d='M-403 499l106-106 128-128 95-95 62-62 26-26 14-14 12-12 7-7 6-6 3-3 2-2 1-1z'/%3E%3C/g%3E%3C/svg%3E")`}}>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                        {t('appTitleFull')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                        {t('appSlogan')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onEnterApp}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                        >
                            {t('accessMap')}
                        </button>
                         <button
                            onClick={onViewData}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 w-full sm:w-auto"
                        >
                           {t('viewDatabase')}
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Mission Section */}
            <div className="py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">{t('ourMissionTitle')}</h2>
                    <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
                       {t('ourMissionDescription')}
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{t('mission1Title')}</h3>
                            <p className="text-gray-400">{t('mission1Description')}</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{t('mission2Title')}</h3>
                            <p className="text-gray-400">{t('mission2Description')}</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{t('mission3Title')}</h3>
                            <p className="text-gray-400">{t('mission3Description')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target Users Section */}
            <div className="bg-gray-800 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">{t('forWhomTitle')}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <UserCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            title={t('user1Title')}
                            description={t('user1Description')}
                        />
                        <UserCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                            title={t('user2Title')}
                            description={t('user2Description')}
                        />
                        <UserCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>}
                            title={t('user3Title')}
                            description={t('user3Description')}
                        />
                         <UserCard
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                            title={t('user4Title')}
                            description={t('user4Description')}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center py-8 border-t border-gray-800">
                <LanguageToggle language={language} setLanguage={setLanguage} />
                <div className="text-gray-500 mt-4 text-sm">
                    <span>&copy; {new Date().getFullYear()} {t('footerText')}</span>
                    <span className="mx-2">·</span>
                    <button onClick={onNavigateToAboutAi} className="hover:underline">{t('aboutAi')}</button>
                </div>
            </footer>
        </div>
    );
};
