import { type ProvinceRawData, RiskLevel, WeatherForecast } from './types';

export const RISK_LEVELS_ORDER: RiskLevel[] = [
    RiskLevel.Safe,
    RiskLevel.Low,
    RiskLevel.Medium,
    RiskLevel.High,
    RiskLevel.VeryHigh,
    RiskLevel.Alarm,
    RiskLevel.Critical,
];

export const RISK_COLORS: Record<RiskLevel, string> = {
    [RiskLevel.Safe]: 'fill-green-500',     // An toàn
    [RiskLevel.Low]: 'fill-lime-400',       // Thấp (Chartreuse)
    [RiskLevel.Medium]: 'fill-yellow-400',   // Trung bình
    [RiskLevel.High]: 'fill-amber-500',      // Cao (Amber)
    [RiskLevel.VeryHigh]: 'fill-orange-500',   // Rất cao
    [RiskLevel.Alarm]: 'fill-red-500',        // Báo động (Vermillion)
    [RiskLevel.Critical]: 'fill-red-700',      // Nghiêm trọng
};


// Based on the 34 administrative units map
export const REGIONS: Record<string, string[]> = {
    North: ["VN-01-HG-TQ", "VN-02-CB", "VN-03-LC", "VN-04-LCI-YB", "VN-05-BK-TN", "VN-06-DB", "VN-07-LS", "VN-08-SL", "VN-09-PT-VP-HB", "VN-10-BG-BN", "VN-11-QN", "VN-12-HN", "VN-13-HP-HD", "VN-14-HY-TB", "VN-15-HNA-ND-NB"],
    Central: ["VN-16-TH", "VN-17-NA", "VN-18-HT", "VN-19-QB-QT", "VN-20-TTH", "VN-21-DN-QNA", "VN-22-QNG", "VN-23-KT-GL-BD", "VN-24-DL-PY", "VN-25-KH-NT", "VN-26-DNO-LD-BTH", "VN-HS", "VN-TS"],
    South: ["VN-27-BP-DNA", "VN-28-TNI", "VN-29-HCM-BD-BRVT", "VN-30-DT-TG", "VN-31-KG-AG", "VN-32-VL-TV-BTR", "VN-33-CT-HG-ST", "VN-34-BL-CM"]
};

// Base data with static factors (history, geography, infrastructure)
// NOTE: All user-facing strings have been replaced with keys for translation.
export const BASE_PROVINCE_DATA = [
    // North (Miền Bắc)
    { id: 'VN-01-HG-TQ', name: 'Hà Giang - Tuyên Quang', riskFactors: { history: { lastYear: 2, last5Years: 8, last10Years: 15, sources: 'src_vndma' }, geography: 'mountain', infrastructure: 'developing' } },
    { id: 'VN-02-CB', name: 'Cao Bằng', riskFactors: { history: { lastYear: 1, last5Years: 6, last10Years: 12, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'developing' } },
    { id: 'VN-03-LC', name: 'Lai Châu', riskFactors: { history: { lastYear: 3, last5Years: 10, last10Years: 18, sources: 'src_vndma' }, geography: 'mountain', infrastructure: 'developing' } },
    { id: 'VN-04-LCI-YB', name: 'Lào Cai - Yên Bái', riskFactors: { history: { lastYear: 2, last5Years: 9, last10Years: 16, sources: 'src_vndma' }, geography: 'mountain', infrastructure: 'standard' } },
    { id: 'VN-05-BK-TN', name: 'Bắc Kạn - Thái Nguyên', riskFactors: { history: { lastYear: 1, last5Years: 4, last10Years: 9, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'standard' } },
    { id: 'VN-06-DB', name: 'Điện Biên', riskFactors: { history: { lastYear: 1, last5Years: 7, last10Years: 14, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'developing' } },
    { id: 'VN-07-LS', name: 'Lạng Sơn', riskFactors: { history: { lastYear: 1, last5Years: 3, last10Years: 7, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'standard' } },
    { id: 'VN-08-SL', name: 'Sơn La', riskFactors: { history: { lastYear: 2, last5Years: 8, last10Years: 15, sources: 'src_vndma' }, geography: 'mountain', infrastructure: 'standard' } },
    { id: 'VN-09-PT-VP-HB', name: 'Phú Thọ - Vĩnh Phúc - Hòa Bình', riskFactors: { history: { lastYear: 1, last5Years: 5, last10Years: 11, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-10-BG-BN', name: 'Bắc Giang - Bắc Ninh', riskFactors: { history: { lastYear: 1, last5Years: 4, last10Years: 8, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-11-QN', name: 'Quảng Ninh', riskFactors: { history: { lastYear: 2, last5Years: 6, last10Years: 10, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-12-HN', name: 'TP. Hà Nội', riskFactors: { history: { lastYear: 0, last5Years: 2, last10Years: 5, sources: 'src_hanoi_drainage' }, geography: 'delta', infrastructure: 'advanced' }, riskClarification: 'clarification_hanoi' },
    { id: 'VN-13-HP-HD', name: 'TP. Hải Phòng - Hải Dương', riskFactors: { history: { lastYear: 1, last5Years: 3, last10Years: 6, sources: 'src_local_report' }, geography: 'coastal_plain', infrastructure: 'advanced' } },
    { id: 'VN-14-HY-TB', name: 'Hưng Yên - Thái Bình', riskFactors: { history: { lastYear: 0, last5Years: 2, last10Years: 4, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-15-HNA-ND-NB', name: 'Hà Nam - Nam Định - Ninh Bình', riskFactors: { history: { lastYear: 1, last5Years: 3, last10Years: 7, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'standard' } },
    // Central (Miền Trung)
    { id: 'VN-16-TH', name: 'Thanh Hóa', riskFactors: { history: { lastYear: 2, last5Years: 8, last10Years: 17, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-17-NA', name: 'Nghệ An', riskFactors: { history: { lastYear: 3, last5Years: 11, last10Years: 20, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-18-HT', name: 'Hà Tĩnh', riskFactors: { history: { lastYear: 3, last5Years: 12, last10Years: 22, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-19-QB-QT', name: 'Quảng Bình - Quảng Trị', riskFactors: { history: { lastYear: 4, last5Years: 15, last10Years: 25, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-20-TTH', name: 'TP. Huế', riskFactors: { history: { lastYear: 2, last5Years: 10, last10Years: 19, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'advanced' } },
    { id: 'VN-21-DN-QNA', name: 'TP. Đà Nẵng - Quảng Nam', riskFactors: { history: { lastYear: 1, last5Years: 9, last10Years: 18, sources: 'src_vndma' }, geography: 'coastal_plain', infrastructure: 'advanced' }, riskClarification: 'clarification_danang' },
    { id: 'VN-22-QNG', name: 'Quảng Ngãi', riskFactors: { history: { lastYear: 1, last5Years: 7, last10Years: 15, sources: 'src_local_report' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-23-KT-GL-BD', name: 'Kon Tum - Gia Lai - Bình Định', riskFactors: { history: { lastYear: 1, last5Years: 5, last10Years: 12, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'standard' } },
    { id: 'VN-24-DL-PY', name: 'Đắk Lắk - Phú Yên', riskFactors: { history: { lastYear: 0, last5Years: 4, last10Years: 9, sources: 'src_local_report' }, geography: 'mountain', infrastructure: 'developing' } },
    { id: 'VN-25-KH-NT', name: 'Khánh Hòa - Ninh Thuận', riskFactors: { history: { lastYear: 0, last5Years: 2, last10Years: 5, sources: 'src_local_report' }, geography: 'coastal_plain', infrastructure: 'standard' } },
    { id: 'VN-26-DNO-LD-BTH', name: 'Đắk Nông - Lâm Đồng - Bình Thuận', riskFactors: { history: { lastYear: 0, last5Years: 3, last10Years: 6, sources: 'src_local_report' }, geography: 'high_ground', infrastructure: 'standard' } },
    { id: 'VN-HS', name: 'Quần đảo Hoàng Sa', riskFactors: { history: { lastYear: 0, last5Years: 0, last10Years: 0, sources: 'src_na' }, geography: 'high_ground', infrastructure: 'developing' } },
    { id: 'VN-TS', name: 'Quần đảo Trường Sa', riskFactors: { history: { lastYear: 0, last5Years: 0, last10Years: 0, sources: 'src_na' }, geography: 'high_ground', infrastructure: 'developing' } },
    // South (Miền Nam)
    { id: 'VN-27-BP-DNA', name: 'Bình Phước - Đồng Nai', riskFactors: { history: { lastYear: 0, last5Years: 2, last10Years: 4, sources: 'src_local_report' }, geography: 'high_ground', infrastructure: 'standard' } },
    { id: 'VN-28-TNI', name: 'Tây Ninh - Long An', riskFactors: { history: { lastYear: 1, last5Years: 4, last10Years: 9, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-29-HCM-BD-BRVT', name: 'TP. HCM - Bình Dương - Bà Rịa-Vũng Tàu', riskFactors: { history: { lastYear: 1, last5Years: 3, last10Years: 6, sources: 'src_hcmc_flood_control' }, geography: 'delta', infrastructure: 'advanced' }, riskClarification: 'clarification_hcmc' },
    { id: 'VN-30-DT-TG', name: 'Đồng Tháp - Tiền Giang', riskFactors: { history: { lastYear: 2, last5Years: 8, last10Years: 16, sources: 'src_vndma' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-31-KG-AG', name: 'Kiên Giang - An Giang', riskFactors: { history: { lastYear: 3, last5Years: 10, last10Years: 18, sources: 'src_vndma' }, geography: 'delta', infrastructure: 'standard' } },
    { id: 'VN-32-VL-TV-BTR', name: 'Vĩnh Long - Trà Vinh - Bến Tre', riskFactors: { history: { lastYear: 2, last5Years: 7, last10Years: 14, sources: 'src_local_report' }, geography: 'delta', infrastructure: 'developing' } },
    { id: 'VN-33-CT-HG-ST', name: 'Cần Thơ - Hậu Giang - Sóc Trăng', riskFactors: { history: { lastYear: 2, last5Years: 6, last10Years: 13, sources: 'src_cantho_uni' }, geography: 'delta', infrastructure: 'advanced' }, riskClarification: 'clarification_cantho' },
    { id: 'VN-34-BL-CM', name: 'Bạc Liêu - Cà Mau', riskFactors: { history: { lastYear: 3, last5Years: 9, last10Years: 15, sources: 'src_vndma' }, geography: 'delta', infrastructure: 'developing' } }
];

// Weather Data for different months
const WEATHER_DATA_11: Record<string, WeatherForecast> = {
    // North: Drier
    'VN-01-HG-TQ': { summary: 'summary_11_hagiang', peakRainfallDays: 'peak_11_weeks_1_3', predictedRainfall_mm: 80, status: 'normal', sources: 'src_nchmf' },
    'VN-03-LC': { summary: 'summary_11_laichau', peakRainfallDays: 'peak_11_days_5_10', predictedRainfall_mm: 70, status: 'normal', sources: 'src_nchmf' },
    'VN-04-LCI-YB': { summary: 'summary_11_laocai', peakRainfallDays: 'peak_11_week_2', predictedRainfall_mm: 90, status: 'normal', sources: 'src_nchmf' },
    'VN-06-DB': { summary: 'summary_11_dienbien', peakRainfallDays: 'peak_11_after_day_20', predictedRainfall_mm: 60, status: 'normal', sources: 'src_nchmf' },
    'VN-08-SL': { summary: 'summary_11_sonla', peakRainfallDays: 'peak_11_weeks_2_4', predictedRainfall_mm: 75, status: 'normal', sources: 'src_nchmf' },
    'VN-11-QN': { summary: 'summary_11_quangninh', peakRainfallDays: 'peak_11_end_of_month', predictedRainfall_mm: 120, status: 'normal', sources: 'src_nchmf,src_jtwc' },
    // Central: Still rainy, but storms are less frequent
    'VN-17-NA': { summary: 'summary_11_nghean', peakRainfallDays: 'peak_11_early_mid_month', predictedRainfall_mm: 300, status: 'above_average', sources: 'src_nchmf,src_jtwc' },
    'VN-18-HT': { summary: 'summary_11_hatinh', peakRainfallDays: 'peak_11_scattered', predictedRainfall_mm: 320, status: 'above_average', sources: 'src_nchmf,src_jtwc' },
    'VN-19-QB-QT': { summary: 'summary_11_quangbinh', peakRainfallDays: 'peak_11_weeks_1_2', predictedRainfall_mm: 350, status: 'above_average', sources: 'src_nchmf,src_jtwc' },
    'VN-20-TTH': { summary: 'summary_11_hue', peakRainfallDays: 'peak_11_mid_month', predictedRainfall_mm: 400, status: 'above_average', sources: 'src_nchmf' },
    // South: Mekong flood receding
    'VN-28-TNI': { summary: 'summary_11_tayninh', peakRainfallDays: 'peak_11_end_of_month', predictedRainfall_mm: 150, status: 'normal', sources: 'src_southern_hydro_meteo,src_mekong_commission' },
    'VN-30-DT-TG': { summary: 'summary_11_dongthap', peakRainfallDays: 'peak_11_late_half_month', predictedRainfall_mm: 180, status: 'normal', sources: 'src_mekong_commission' },
    'VN-31-KG-AG': { summary: 'summary_11_kiengiang', peakRainfallDays: 'peak_11_late_half_month', predictedRainfall_mm: 200, status: 'normal', sources: 'src_mekong_commission' },
    'VN-32-VL-TV-BTR': { summary: 'summary_11_vinhlong', peakRainfallDays: 'peak_11_days_15_25', predictedRainfall_mm: 170, status: 'normal', sources: 'src_southern_hydro_meteo' },
    'VN-33-CT-HG-ST': { summary: 'summary_11_cantho', peakRainfallDays: 'peak_11_week_3', predictedRainfall_mm: 160, status: 'normal', sources: 'src_southern_hydro_meteo' },
    'VN-34-BL-CM': { summary: 'summary_11_baclieu', peakRainfallDays: 'peak_11_scattered_late', predictedRainfall_mm: 190, status: 'normal', sources: 'src_nchmf' },
     // Unchanged from previous month (generic forecasts)
    'VN-02-CB': { summary: 'summary_generic_stable', peakRainfallDays: 'peak_11_mid_month', predictedRainfall_mm: 100, status: 'normal', sources: 'src_nchmf' },
    'VN-05-BK-TN': { summary: 'summary_generic_normal_rain', peakRainfallDays: 'peak_generic_unclear', predictedRainfall_mm: 110, status: 'normal', sources: 'src_nchmf' },
    'VN-07-LS': { summary: 'summary_generic_stable_nw', peakRainfallDays: 'peak_generic_insignificant', predictedRainfall_mm: 95, status: 'normal', sources: 'src_nchmf' },
    'VN-09-PT-VP-HB': { summary: 'summary_generic_downstream_risk', peakRainfallDays: 'peak_generic_river_flow', predictedRainfall_mm: 130, status: 'normal', sources: 'src_nchmf' },
    'VN-10-BG-BN': { summary: 'summary_generic_urban_flooding', peakRainfallDays: 'peak_11_mid_month', predictedRainfall_mm: 125, status: 'normal', sources: 'src_nchmf' },
    'VN-12-HN': { summary: 'summary_generic_hanoi_flooding', peakRainfallDays: 'peak_11_days_15_20', predictedRainfall_mm: 140, status: 'normal', sources: 'src_nchmf' },
    'VN-13-HP-HD': { summary: 'summary_generic_sea_surge', peakRainfallDays: 'peak_11_week_3', predictedRainfall_mm: 180, status: 'above_average', sources: 'src_nchmf' },
    'VN-14-HY-TB': { summary: 'summary_generic_agricultural_flooding', peakRainfallDays: 'peak_generic_unclear', predictedRainfall_mm: 135, status: 'normal', sources: 'src_nchmf' },
    'VN-15-HNA-ND-NB': { summary: 'summary_generic_coastal_tides', peakRainfallDays: 'peak_11_days_18_22', predictedRainfall_mm: 150, status: 'normal', sources: 'src_nchmf' },
    'VN-16-TH': { summary: 'summary_generic_thanhhoa_heavy_rain', peakRainfallDays: 'peak_11_week_2', predictedRainfall_mm: 250, status: 'above_average', sources: 'src_nchmf' },
    'VN-21-DN-QNA': { summary: 'summary_generic_danang_heavy_rain', peakRainfallDays: 'peak_11_all_week_3', predictedRainfall_mm: 420, status: 'above_average', sources: 'src_nchmf' },
    'VN-22-QNG': { summary: 'summary_generic_quangngai_high_rain', peakRainfallDays: 'peak_11_mid_end_month', predictedRainfall_mm: 380, status: 'above_average', sources: 'src_nchmf' },
    'VN-23-KT-GL-BD': { summary: 'summary_generic_taynguyen_rain', peakRainfallDays: 'peak_11_scattered', predictedRainfall_mm: 180, status: 'normal', sources: 'src_taynguyen_hydro_meteo' },
    'VN-24-DL-PY': { summary: 'summary_generic_dry_low_risk', peakRainfallDays: 'peak_generic_insignificant', predictedRainfall_mm: 120, status: 'normal', sources: 'src_taynguyen_hydro_meteo' },
    'VN-25-KH-NT': { summary: 'summary_generic_very_low_rain', peakRainfallDays: 'peak_generic_none', predictedRainfall_mm: 40, status: 'normal', sources: 'src_nchmf' },
    'VN-26-DNO-LD-BTH': { summary: 'summary_generic_plateau_showers', peakRainfallDays: 'peak_11_scattered', predictedRainfall_mm: 100, status: 'normal', sources: 'src_taynguyen_hydro_meteo' },
    'VN-HS': { summary: 'summary_generic_islands', peakRainfallDays: 'peak_generic_typhoon_dependent', predictedRainfall_mm: 50, status: 'normal', sources: 'src_nchmf' },
    'VN-TS': { summary: 'summary_generic_islands', peakRainfallDays: 'peak_generic_typhoon_dependent', predictedRainfall_mm: 50, status: 'normal', sources: 'src_nchmf' },
    'VN-27-BP-DNA': { summary: 'summary_generic_high_terrain_urban', peakRainfallDays: 'peak_11_mid_month', predictedRainfall_mm: 160, status: 'normal', sources: 'src_southern_hydro_meteo' },
    'VN-29-HCM-BD-BRVT': { summary: 'summary_generic_hcmc_urban_tide', peakRainfallDays: 'peak_11_days_1_5_15_20', predictedRainfall_mm: 220, status: 'normal', sources: 'src_southern_hydro_meteo' },
};

const WEATHER_DATA_12: Record<string, WeatherForecast> = {
    ...WEATHER_DATA_11, // Start with November data and override
    // North: Cold and dry
    'VN-01-HG-TQ': { ...WEATHER_DATA_11['VN-01-HG-TQ'], summary: 'summary_12_north_dry', predictedRainfall_mm: 30, status: 'normal' },
    'VN-04-LCI-YB': { ...WEATHER_DATA_11['VN-04-LCI-YB'], summary: 'summary_12_north_winter', predictedRainfall_mm: 40, status: 'normal' },
    'VN-12-HN': { ...WEATHER_DATA_11['VN-12-HN'], summary: 'summary_12_hanoi_dry', predictedRainfall_mm: 50, status: 'normal' },
    // Central: Some rain remains
    'VN-21-DN-QNA': { ...WEATHER_DATA_11['VN-21-DN-QNA'], summary: 'summary_12_danang_unseasonal_rain', predictedRainfall_mm: 200, status: 'normal' },
    'VN-22-QNG': { ...WEATHER_DATA_11['VN-22-QNG'], summary: 'summary_12_quangngai_improving', predictedRainfall_mm: 180, status: 'normal' },
    // South: Dry season
    'VN-29-HCM-BD-BRVT': { ...WEATHER_DATA_11['VN-29-HCM-BD-BRVT'], summary: 'summary_12_saigon_dry', predictedRainfall_mm: 80, status: 'normal' },
    'VN-30-DT-TG': { ...WEATHER_DATA_11['VN-30-DT-TG'], summary: 'summary_12_mekong_receded', predictedRainfall_mm: 70, status: 'normal' },
    'VN-31-KG-AG': { ...WEATHER_DATA_11['VN-31-KG-AG'], summary: 'summary_12_mekong_dry_good', predictedRainfall_mm: 60, status: 'normal' },
};

const WEATHER_DATA_01: Record<string, WeatherForecast> = {
    ...WEATHER_DATA_12, // Start with December data and override
    // All regions are generally safe
    'VN-01-HG-TQ': { ...WEATHER_DATA_12['VN-01-HG-TQ'], summary: 'summary_01_north_driest', predictedRainfall_mm: 15, status: 'normal' },
    'VN-17-NA': { ...WEATHER_DATA_12['VN-17-NA'], summary: 'summary_01_central_stable', predictedRainfall_mm: 80, status: 'normal' },
    'VN-18-HT': { ...WEATHER_DATA_12['VN-18-HT'], summary: 'summary_01_central_stable', predictedRainfall_mm: 90, status: 'normal' },
    'VN-19-QB-QT': { ...WEATHER_DATA_12['VN-19-QB-QT'], summary: 'summary_01_central_safe', predictedRainfall_mm: 100, status: 'normal' },
    'VN-20-TTH': { ...WEATHER_DATA_12['VN-20-TTH'], summary: 'summary_01_central_safe', predictedRainfall_mm: 120, status: 'normal' },
    'VN-34-BL-CM': { ...WEATHER_DATA_12['VN-34-BL-CM'], summary: 'summary_01_south_drought_risk', predictedRainfall_mm: 30, status: 'normal' },
};

// Helper to generate full data for a month
const generateMonthData = (weatherData: Record<string, WeatherForecast>): ProvinceRawData[] => {
    return BASE_PROVINCE_DATA.map(p => ({
        ...p,
        riskFactors: {
            ...p.riskFactors,
            weather: weatherData[p.id]
        }
    })) as ProvinceRawData[];
};

export const MONTHLY_PROVINCE_DATA: Record<string, ProvinceRawData[]> = {
    '11': generateMonthData(WEATHER_DATA_11),
    '12': generateMonthData(WEATHER_DATA_12),
    '1': generateMonthData(WEATHER_DATA_01),
};
