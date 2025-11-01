import React from 'react';
import type { Province, Language } from '../types';
import { RISK_COLORS } from '../constants';
import { getFactorScore } from '../services/riskCalculator';
import { translations, riskLevelMap } from '../utils/translations';

interface InfoPanelProps {
    province: Province;
    language: Language;
}

const FactorRow: React.FC<{ label: string; score: number, language: Language }> = ({ label, score, language }) => {
    const scoreColor = score > 0 ? 'text-red-400' : (score < 0 ? 'text-green-400' : 'text-gray-300');
    const scoreSign = score > 0 ? '+' : '';
    return (
        <div className="flex justify-between items-center text-sm py-1 border-b border-gray-700">
            <span className="text-gray-400">{label}:</span>
            <span className={`font-semibold ${scoreColor}`}>{scoreSign}{score} {language === 'vi' ? 'điểm' : 'points'}</span>
        </div>
    );
};

export const InfoPanel: React.FC<InfoPanelProps> = ({ province, language }) => {
    const t = (key: Exclude<keyof typeof translations.vi, 'maps'>) => translations[language][key] || key;
    const tMap = (map: keyof typeof translations.vi.maps, key: string) => (translations[language].maps[map] as Record<string, string>)[key] || key;
    
    const riskColorClass = RISK_COLORS[province.riskLevel].replace('fill-', 'bg-');

    const combinedSources = [
        province.riskFactors.history.sources,
        province.riskFactors.weather.sources
    ].join(',');
    
    const uniqueSourceKeys = [...new Set(
        combinedSources.split(',')
            .map(s => s.trim())
            .filter(s => s && s.toLowerCase() !== 'src_na')
    )];

    const translatedRiskLevel = riskLevelMap[language][province.riskLevel];
    const translatedProvinceName = tMap('provinceNameMap', province.name);
    const translatedWeatherSummary = tMap('weatherContentMap', province.riskFactors.weather.summary);
    const translatedPeakRainfall = tMap('weatherContentMap', province.riskFactors.weather.peakRainfallDays);


    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-2">{translatedProvinceName}</h2>
            
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-gray-400 font-medium">{t('riskLevelLabel')}</span>
                <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full ${riskColorClass}`}></span>
                    <span className="font-semibold text-lg">{translatedRiskLevel}</span>
                </div>
            </div>

            {province.riskClarification && (
                <div className="mb-4 bg-blue-900/50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-200">{tMap('clarificationMap', province.riskClarification)}</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="flex justify-between items-baseline mb-3">
                     <h3 className="font-bold text-gray-200">{t('riskScoreAnalysis')}</h3>
                     <p className="text-2xl font-bold text-white">{province.riskScore}<span className="text-sm font-normal text-gray-400">/100</span></p>
                </div>
               
                <div className="space-y-1">
                    <FactorRow label={t('historyFactor')} score={getFactorScore('history', province.riskFactors)} language={language} />
                    <FactorRow label={t('geographyFactor')} score={getFactorScore('geography', province.riskFactors)} language={language} />
                    <FactorRow label={t('weatherFactor')} score={getFactorScore('weather', province.riskFactors)} language={language} />
                    <FactorRow label={t('infrastructureFactor')} score={getFactorScore('infrastructure', province.riskFactors)} language={language} />
                </div>
            </div>

            <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <h3 className="font-bold text-gray-200">{t('weatherForecast')}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2 leading-relaxed">{translatedWeatherSummary}</p>
                <div className="text-sm space-y-2 border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between">
                         <span className="font-semibold text-gray-400">{t('peakRainfall')}</span>
                         <span className="font-bold text-blue-300">{translatedPeakRainfall || t('unspecified')}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-semibold text-gray-400">{t('predictedRainfall')}</span>
                        <span className="font-bold text-blue-300">{province.riskFactors.weather.predictedRainfall_mm} mm</span>
                    </div>
                </div>
            </div>

            {uniqueSourceKeys.length > 0 && (
                 <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="font-bold text-gray-200">{t('dataSources')}</h3>
                    </div>
                    <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                        {uniqueSourceKeys.map((sourceKey, index) => (
                            <li key={index}>{tMap('sourcesMap', sourceKey)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
