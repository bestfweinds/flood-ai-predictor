import React from 'react';
import { RiskLevel, Language } from '../types';
import { translations } from '../utils/translations';


interface LegendProps {
    language: Language;
}

// Hex values for the gradient, corresponding to the Tailwind colors in constants.ts
// green-500, lime-400, yellow-400, amber-500, orange-500, red-500, red-700
const gradientStyle = {
    background: 'linear-gradient(to right, #22c55e, #a3e635, #facc15, #f59e0b, #f97316, #ef4444, #b91c1c)'
};

export const Legend: React.FC<LegendProps> = ({ language }) => {
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    return (
        <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-80 p-3 rounded-lg shadow-lg w-48">
            <h4 className="font-bold text-sm mb-2 text-white text-center">{t('riskLevelLabel')}</h4>
            <div className="w-full h-4 rounded" style={gradientStyle}></div>
            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-300">{t('riskSafe')}</span>
                <span className="text-xs text-gray-300">{t('riskCritical')}</span>
            </div>
        </div>
    );
};
