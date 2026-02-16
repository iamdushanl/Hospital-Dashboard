// Enhanced Mock Data for Hospital Analytics Dashboard
// Sri Lankan Healthcare Context

export interface PatientDemographic {
    id: string;
    age: number;
    gender: 'M' | 'F';
    district: string;
    ethnicity: string;
    insuranceType: string;
    nationality: string;
    language: string;
    diagnosis: string;
    admissionDate: string;
    dischargeDate: string;
    lengthOfStay: number;
}

export interface StaffMember {
    id: string;
    name: string;
    role: 'Doctor' | 'Nurse' | 'Technician' | 'Admin';
    specialty?: string;
    department: string;
    patientsPerDay: number;
    revenueGenerated: number;
    overtimeHours: number;
    satisfactionScore: number;
}

// Sri Lankan Districts
export const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Monaragala', 'Ratnapura', 'Kegalle'
];

// Sri Lankan Insurance Providers
export const insuranceProviders = [
    'Ceylinco Life', 'Softlogic Life', 'AIA Insurance', 'Union Assurance',
    'Sri Lanka Insurance', 'Government Scheme (GOSL)', 'Military/Police',
    'Corporate Direct', 'Cash/Self-Pay', 'Foreign/Medical Tourism'
];

// Common Diagnoses (ICD-10 codes simplified)
export const commonDiagnoses = [
    'Dengue Fever', 'Diabetes Mellitus', 'Hypertension', 'Ischemic Heart Disease',
    'Pneumonia', 'Chronic Kidney Disease', 'Stroke', 'Road Traffic Accident',
    'Acute Gastroenteritis', 'Malaria', 'COVID-19', 'Appendicitis',
    'Coronary Artery Disease', 'Heart Failure', 'COPD', 'Cancer (Various)',
    'Pregnancy/Childbirth', 'Fractures', 'Malnutrition', 'Thalassemia'
];

// Generate Patient Demographics Data
export const patientDemographics: PatientDemographic[] = Array.from({ length: 1000 }, (_, i) => {
    const age = Math.floor(Math.random() * 85) + 1;
    const district = sriLankanDistricts[Math.floor(Math.random() * sriLankanDistricts.length)];
    const los = Math.floor(Math.random() * 14) + 1;

    return {
        id: `P${String(i + 1).padStart(6, '0')}`,
        age,
        gender: Math.random() > 0.5 ? 'M' : 'F',
        district,
        ethnicity: Math.random() > 0.7 ? 'Sinhala' : Math.random() > 0.5 ? 'Tamil' : 'Muslim',
        insuranceType: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)],
        nationality: Math.random() > 0.9 ? 'Foreign' : 'Sri Lankan',
        language: Math.random() > 0.7 ? 'Sinhala' : Math.random() > 0.5 ? 'Tamil' : 'English',
        diagnosis: commonDiagnoses[Math.floor(Math.random() * commonDiagnoses.length)],
        admissionDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        dischargeDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        lengthOfStay: los
    };
});

// Age Distribution Analysis
export const ageDistribution = [
    { ageGroup: '0-10', male: 45, female: 42 },
    { ageGroup: '11-20', male: 38, female: 41 },
    { ageGroup: '21-30', male: 67, female: 73 },
    { ageGroup: '31-40', male: 89, female: 92 },
    { ageGroup: '41-50', male: 112, female: 105 },
    { ageGroup: '51-60', male: 98, female: 94 },
    { ageGroup: '61-70', male: 76, female: 71 },
    { ageGroup: '71-80', male: 52, female: 49 },
    { ageGroup: '80+', male: 28, female: 31 }
];

// Insurance Distribution
export const insuranceDistribution = [
    { type: 'Ceylinco Life', count: 187, color: '#3b82f6' },
    { type: 'Softlogic Life', count: 156, color: '#10b981' },
    { type: 'AIA Insurance', count: 134, color: '#f59e0b' },
    { type: 'Government Scheme', count: 289, color: '#8b5cf6' },
    { type: 'Cash/Self-Pay', count: 145, color: '#ec4899' },
    { type: 'Foreign/Medical Tourism', count: 89, color: '#06b6d4' }
];

// Geographic Distribution (Top 10 Districts)
export const geographicDistribution = [
    { district: 'Colombo', patients: 342, revenue: 2850 },
    { district: 'Gampaha', patients: 198, revenue: 1640 },
    { district: 'Kalutara', patients: 87, revenue: 720 },
    { district: 'Kandy', patients: 156, revenue: 1290 },
    { district: 'Galle', patients: 92, revenue: 760 },
    { district: 'Matara', patients: 54, revenue: 450 },
    { district: 'Jaffna', patients: 43, revenue: 360 },
    { district: 'Kurunegala', patients: 67, revenue: 550 },
    { district: 'Anuradhapura', patients: 38, revenue: 310 },
    { district: 'Batticaloa', patients: 23, revenue: 190 }
];

// Top 10 Diagnoses
export const topDiagnoses = [
    { diagnosis: 'Diabetes Mellitus', count: 156, avgLOS: 4.2, cost: 1250 },
    { diagnosis: 'Hypertension', count: 134, avgLOS: 3.8, cost: 980 },
    { diagnosis: 'Dengue Fever', count: 112, avgLOS: 5.6, cost: 1680 },
    { diagnosis: 'Ischemic Heart Disease', count: 98, avgLOS: 7.3, cost: 3450 },
    { diagnosis: 'Pneumonia', count: 89, avgLOS: 6.1, cost: 2100 },
    { diagnosis: 'Stroke', count: 76, avgLOS: 9.2, cost: 4200 },
    { diagnosis: 'Road Traffic Accident', count: 67, avgLOS: 8.5, cost: 3800 },
    { diagnosis: 'Chronic Kidney Disease', count: 54, avgLOS: 5.4, cost: 2800 },
    { diagnosis: 'COVID-19', count: 43, avgLOS: 7.8, cost: 2950 },
    { diagnosis: 'Heart Failure', count: 38, avgLOS: 6.9, cost: 3150 }
];

// Staff Productivity Data
export const staffProductivity = [
    { name: 'Dr. Perera', specialty: 'Cardiology', patientsPerDay: 24, revenue: 125000, satisfaction: 92, department: 'Cardiology' },
    { name: 'Dr. Silva', specialty: 'Orthopedics', patientsPerDay: 18, revenue: 98000, satisfaction: 88, department: 'Orthopedics' },
    { name: 'Dr. Fernando', specialty: 'Neurology', patientsPerDay: 16, revenue: 87000, satisfaction: 90, department: 'Neurology' },
    { name: 'Dr. Jayawardena', specialty: 'Pediatrics', patientsPerDay: 32, revenue: 76000, satisfaction: 95, department: 'Pediatrics' },
    { name: 'Dr. Wickramasinghe', specialty: 'General Surgery', patientsPerDay: 12, revenue: 112000, satisfaction: 87, department: 'Surgery' },
    { name: 'Dr. Mendis', specialty: 'Emergency Medicine', patientsPerDay: 28, revenue: 82000, satisfaction: 84, department: 'Emergency' },
    { name: 'Dr. Rajapaksa', specialty: 'Oncology', patientsPerDay: 14, revenue: 145000, satisfaction: 93, department: 'Oncology' },
    { name: 'Dr. Gunasekara', specialty: 'Nephrology', patientsPerDay: 16, revenue: 95000, satisfaction: 89, department: 'Nephrology' }
];

// Department Workforce Metrics
export const departmentWorkforce = [
    { department: 'Emergency', nurses: 28, targetNurses: 32, nursePatientRatio: 1.2, overtimeHours: 156, turnoverRate: 8.2 },
    { department: 'Cardiology', nurses: 18, targetNurses: 20, nursePatientRatio: 0.9, overtimeHours: 87, turnoverRate: 5.1 },
    { department: 'Orthopedics', nurses: 16, targetNurses: 18, nursePatientRatio: 1.0, overtimeHours: 76, turnoverRate: 6.3 },
    { department: 'Pediatrics', nurses: 22, targetNurses: 22, nursePatientRatio: 0.8, overtimeHours: 45, turnoverRate: 3.8 },
    { department: 'Neurology', nurses: 14, targetNurses: 16, nursePatientRatio: 1.1, overtimeHours: 92, turnoverRate: 7.5 },
    { department: 'ICU', nurses: 24, targetNurses: 26, nursePatientRatio: 0.5, overtimeHours: 134, turnoverRate: 9.2 }
];

// Staff Turnover Trend
export const staffTurnoverTrend = [
    { month: 'Jul', doctors: 2, nurses: 8, support: 5, total: 15 },
    { month: 'Aug', doctors: 1, nurses: 6, support: 4, total: 11 },
    { month: 'Sep', doctors: 3, nurses: 9, support: 6, total: 18 },
    { month: 'Oct', doctors: 2, nurses: 7, support: 5, total: 14 },
    { month: 'Nov', doctors: 1, nurses: 5, support: 3, total: 9 },
    { month: 'Dec', doctors: 2, nurses: 8, support: 7, total: 17 }
];

// Resource Utilization - Bed Management
export const bedUtilizationByWard = [
    { ward: 'General Medical', beds: 45, occupied: 38, turnoverTime: 2.3, blockedBeds: 2 },
    { ward: 'General Surgical', beds: 38, occupied: 32, turnoverTime: 2.8, blockedBeds: 1 },
    { ward: 'ICU', beds: 18, occupied: 16, turnoverTime: 1.5, blockedBeds: 0 },
    { ward: 'Cardiology', beds: 24, occupied: 21, turnoverTime: 2.1, blockedBeds: 1 },
    { ward: 'Orthopedics', beds: 28, occupied: 22, turnoverTime: 3.2, blockedBeds: 2 },
    { ward: 'Pediatrics', beds: 32, occupied: 24, turnoverTime: 2.0, blockedBeds: 1 },
    { ward: 'Maternity', beds: 26, occupied: 19, turnoverTime: 1.8, blockedBeds: 0 },
    { ward: 'Private Ward A', beds: 15, occupied: 13, turnoverTime: 1.5, blockedBeds: 0 },
    { ward: 'Private Ward B', beds: 12, occupied: 10, turnoverTime: 1.7, blockedBeds: 0 }
];

// OR Utilization by Hour
export const orUtilizationByHour = [
    { hour: '08:00', or1: 90, or2: 85, or3: 95, or4: 80 },
    { hour: '09:00', or1: 95, or2: 90, or3: 100, or4: 85 },
    { hour: '10:00', or1: 100, or2: 95, or3: 100, or4: 90 },
    { hour: '11:00', or1: 100, or2: 100, or3: 95, or4: 95 },
    { hour: '12:00', or1: 95, or2: 90, or3: 90, or4: 85 },
    { hour: '13:00', or1: 85, or2: 80, or3: 85, or4: 75 },
    { hour: '14:00', or1: 90, or2: 95, or3: 90, or4: 85 },
    { hour: '15:00', or1: 95, or2: 100, or3: 95, or4: 90 },
    { hour: '16:00', or1: 85, or2: 90, or3: 80, or4: 75 },
    { hour: '17:00', or1: 70, or2: 75, or3: 65, or4: 60 }
];

// Equipment Utilization
export const equipmentUtilization = [
    { equipment: 'CT Scanner 1', utilization: 78, target: 85, revenue: 285000, downtime: 12 },
    { equipment: 'CT Scanner 2', utilization: 82, target: 85, revenue: 310000, downtime: 8 },
    { equipment: 'MRI Machine', utilization: 71, target: 80, revenue: 425000, downtime: 18 },
    { equipment: 'Cath Lab 1', utilization: 85, target: 90, revenue: 580000, downtime: 6 },
    { equipment: 'Cath Lab 2', utilization: 79, target: 90, revenue: 520000, downtime: 14 },
    { equipment: 'Mammography', utilization: 65, target: 75, revenue: 145000, downtime: 22 },
    { equipment: 'X-Ray 1', utilization: 92, target: 85, revenue: 98000, downtime: 4 },
    { equipment: 'X-Ray 2', utilization: 88, target: 85, revenue: 92000, downtime: 5 },
    { equipment: 'Ultrasound 1', utilization: 94, target: 85, revenue: 112000, downtime: 3 },
    { equipment: 'Ultrasound 2', utilization: 91, target: 85, revenue: 108000, downtime: 4 }
];

// High-Cost Consumables (Pareto Analysis)
export const highCostConsumables = [
    { item: 'Cardiac Stents', monthlyCost: 1250000, quantity: 45, wasteRate: 2.1 },
    { item: 'Orthopedic Implants', monthlyCost: 980000, quantity: 38, wasteRate: 1.5 },
    { item: 'IV Antibiotics (Premium)', monthlyCost: 540000, quantity: 2340, wasteRate: 5.2 },
    { item: 'Surgical Sutures (Premium)', monthlyCost: 380000, quantity: 1890, wasteRate: 3.8 },
    { item: 'Dialysis Filters', monthlyCost: 320000, quantity: 890, wasteRate: 1.2 },
    { item: 'Ventilator Circuits', monthlyCost: 280000, quantity: 450, wasteRate: 4.5 },
    { item: 'Contrast Media (CT/MRI)', monthlyCost: 245000, quantity: 780, wasteRate: 6.8 },
    { item: 'Blood Products', monthlyCost: 210000, quantity: 560, wasteRate: 2.9 },
    { item: 'Surgical Gloves (Specialty)', monthlyCost: 185000, quantity: 12000, wasteRate: 8.2 },
    { item: 'IV Fluids (Specialty)', monthlyCost: 145000, quantity: 5600, wasteRate: 4.1 }
];

// Bed Occupancy Heat Map Data (by ward and time)
export const bedOccupancyHeatMap = [
    { ward: 'ICU', '00:00': 95, '04:00': 94, '08:00': 98, '12:00': 96, '16:00': 97, '20:00': 95 },
    { ward: 'Emergency', '00:00': 78, '04:00': 65, '08:00': 85, '12:00': 92, '16:00': 98, '20:00': 88 },
    { ward: 'General Medical', '00:00': 82, '04:00': 82, '08:00': 86, '12:00': 84, '16:00': 85, '20:00': 83 },
    { ward: 'Cardiology', '00:00': 88, '04:00': 87, '08:00': 90, '12:00': 89, '16:00': 91, '20:00': 88 },
    { ward: 'Orthopedics', '00:00': 75, '04:00': 75, '08:00': 79, '12:00': 78, '16:00': 80, '20:00': 77 },
    { ward: 'Pediatrics', '00:00': 72, '04:00': 71, '08:00': 76, '12:00': 75, '16:00': 78, '20:00': 74 }
];
