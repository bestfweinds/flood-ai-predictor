import { type ProvinceRawData, type RiskFactors, RiskLevel, type Province } from '../types';

// --- Scoring Weights ---
const WEIGHTS = {
    GEOGRAPHY: {
        delta: 25,
        coastal_plain: 20,
        mountain: 15,
        high_ground: 5,
    },
    WEATHER: {
        storm_warning: 15,
        above_average: 10,
        normal: 0,
    },
    INFRASTRUCTURE: {
        advanced: -10,
        standard: 0,
        developing: 5,
    }
};

const HISTORY_MAX_SCORE = 50;

// --- Score Thresholds for 7 Levels ---
const THRESHOLDS = {
    SAFE: 14,
    LOW: 28,
    MEDIUM: 42,
    HIGH: 56,
    VERY_HIGH: 70,
    ALARM: 84,
};

/**
 * Calculates the risk score based on historical flood data.
 * Assumes the input data is cumulative (e.g., last5Years includes lastYear).
 */
const calculateHistoryScore = (history: RiskFactors['history']): number => {
    const floodsLastYear = history.lastYear;
    // Floods from 2 to 5 years ago
    const floods2to5Years = Math.max(0, history.last5Years - history.lastYear);
    // Floods from 6 to 10 years ago
    const floods6to10Years = Math.max(0, history.last10Years - history.last5Years);

    const score =
        (floodsLastYear * 5) +       // 5 pts for each flood in the last year
        (floods2to5Years * 3) +      // 3 pts for each flood from 2-5 years ago
        (floods6to10Years * 1);      // 1 pt for each flood from 6-10 years ago

    return Math.min(score, HISTORY_MAX_SCORE);
}


const calculateRiskScore = (factors: RiskFactors): number => {
    let score = 0;

    // History Score
    score += calculateHistoryScore(factors.history);

    // Geography Score
    score += WEIGHTS.GEOGRAPHY[factors.geography];

    // Weather Score
    score += WEIGHTS.WEATHER[factors.weather.status];
    
    // Infrastructure Score
    score += WEIGHTS.INFRASTRUCTURE[factors.infrastructure];

    return Math.max(0, Math.round(score)); // Ensure score is not negative and is an integer
};

const getRiskLevel = (score: number): RiskLevel => {
    if (score <= THRESHOLDS.SAFE) return RiskLevel.Safe;
    if (score <= THRESHOLDS.LOW) return RiskLevel.Low;
    if (score <= THRESHOLDS.MEDIUM) return RiskLevel.Medium;
    if (score <= THRESHOLDS.HIGH) return RiskLevel.High;
    if (score <= THRESHOLDS.VERY_HIGH) return RiskLevel.VeryHigh;
    if (score <= THRESHOLDS.ALARM) return RiskLevel.Alarm;
    return RiskLevel.Critical;
};

export const calculateAllProvinces = (rawData: ProvinceRawData[]): Province[] => {
    return rawData.map(province => {
        const riskScore = calculateRiskScore(province.riskFactors);
        const riskLevel = getRiskLevel(riskScore);
        return {
            ...province,
            riskScore,
            riskLevel,
        };
    });
};

export const getFactorScore = (factor: keyof Omit<RiskFactors, 'weather'> | 'weather', factors: RiskFactors): number => {
     switch (factor) {
        case 'history':
            return calculateHistoryScore(factors.history);
        case 'geography':
            return WEIGHTS.GEOGRAPHY[factors.geography];
        case 'weather':
            return WEIGHTS.WEATHER[factors.weather.status];
        case 'infrastructure':
            return WEIGHTS.INFRASTRUCTURE[factors.infrastructure];
        default:
            return 0;
    }
}
