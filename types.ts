export enum RiskLevel {
    Safe = 'SAFE',
    Low = 'LOW',
    Medium = 'MEDIUM',
    High = 'HIGH',
    VeryHigh = 'VERY_HIGH',
    Alarm = 'ALARM',
    Critical = 'CRITICAL',
}

export interface WeatherForecast {
    summary: string;
    peakRainfallDays: string;
    predictedRainfall_mm: number;
    status: 'normal' | 'above_average' | 'storm_warning';
    sources: string;
}

export interface RiskFactors {
    history: {
        lastYear: number;
        last5Years: number;
        last10Years: number;
        sources: string;
    };
    geography: 'mountain' | 'coastal_plain' | 'delta' | 'high_ground';
    weather: WeatherForecast;
    infrastructure: 'advanced' | 'standard' | 'developing';
}

export interface ProvinceRawData {
    id: string;
    name: string;
    riskFactors: RiskFactors;
    riskClarification?: string;
}

export interface Province extends ProvinceRawData {
    riskLevel: RiskLevel;
    riskScore: number;
}

export type Region = 'All' | 'North' | 'Central' | 'South';

export type Language = 'vi' | 'en';