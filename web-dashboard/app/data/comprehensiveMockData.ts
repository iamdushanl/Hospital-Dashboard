// Additional comprehensive mock data for presentation-ready dashboard

// Real-time metrics simulation
export const realTimeMetrics = {
    currentOccupancy: 78,
    emergencyWaitTime: 32, // minutes
    availableICUBeds: 3,
    surgeryInProgress: 6,
    patientsInER: 24,
    dischargesExpected: 12,
    admissionsExpected: 15
}

// Financial Performance - Monthly Trend (12 months)
export const monthlyFinancialTrend = [
    { month: 'Feb 2025', revenue: 1420, cost: 1180, patients: 385, margin: 16.9 },
    { month: 'Mar 2025', revenue: 1510, cost: 1240, patients: 402, margin: 17.9 },
    { month: 'Apr 2025', revenue: 1490, cost: 1260, patients: 395, margin: 15.4 },
    { month: 'May 2025', revenue: 1580, cost: 1290, patients: 418, margin: 18.4 },
    { month: 'Jun 2025', revenue: 1640, cost: 1350, patients: 412, margin: 17.7 },
    { month: 'Jul 2025', revenue: 1720, cost: 1390, patients: 435, margin: 19.2 },
    { month: 'Aug 2025', revenue: 1680, cost: 1420, patients: 428, margin: 15.5 },
    { month: 'Sep 2025', revenue: 1780, cost: 1440, patients: 458, margin: 19.1 },
    { month: 'Oct 2025', revenue: 1810, cost: 1465, patients: 467, margin: 19.1 },
    { month: 'Nov 2025', revenue: 1850, cost: 1510, patients: 485, margin: 18.4 },
    { month: 'Dec 2025', revenue: 1920, cost: 1555, patients: 498, margin: 19.0 },
    { month: 'Jan 2026', revenue: 2010, cost: 1615, patients: 521, margin: 19.7 }
]

// Quality Metrics - Historical Trend
export const qualityTrend = [
    { month: 'Aug', mortality: 1.4, infection: 1.1, readmission: 13.2, satisfaction: 84 },
    { month: 'Sep', mortality: 1.3, infection: 1.0, readmission: 12.8, satisfaction: 85 },
    { month: 'Oct', mortality: 1.3, infection: 0.9, readmission: 12.5, satisfaction: 86 },
    { month: 'Nov', mortality: 1.2, infection: 0.9, readmission: 12.4, satisfaction: 86 },
    { month: 'Dec', mortality: 1.2, infection: 0.8, readmission: 12.3, satisfaction: 87 },
    { month: 'Jan', mortality: 1.1, infection: 0.7, readmission: 12.0, satisfaction: 88 }
]

// Patient Satisfaction by Category
export const satisfactionByCategory = [
    { category: 'Doctor Care', score: 92, benchmark: 88 },
    { category: 'Nursing Care', score: 89, benchmark: 86 },
    { category: 'Food Quality', score: 78, benchmark: 75 },
    { category: 'Room Cleanliness', score: 94, benchmark: 90 },
    { category: 'Communication', score: 85, benchmark: 82 },
    { category: 'Discharge Process', score: 81, benchmark: 80 },
    { category: 'Wait Times', score: 76, benchmark: 78 },
    { category: 'Billing Clarity', score: 73, benchmark: 72 }
]

// Operational Efficiency Metrics
export const operationalMetrics = [
    {
        metric: 'Bed Turnover Rate',
        value: 2.3,
        target: 2.0,
        unit: 'hours',
        trend: 'improving',
        impact: 'High'
    },
    {
        metric: 'ED Length of Stay',
        value: 4.2,
        target: 4.0,
        unit: 'hours',
        trend: 'improving',
        impact: 'High'
    },
    {
        metric: 'Surgery On-Time Start',
        value: 87,
        target: 90,
        unit: '%',
        trend: 'stable',
        impact: 'Medium'
    },
    {
        metric: 'Lab TAT (<1hr)',
        value: 91,
        target: 95,
        unit: '%',
        trend: 'improving',
        impact: 'Medium'
    },
    {
        metric: 'Radiology TAT',
        value: 45,
        target: 40,
        unit: 'min',
        trend: 'declining',
        impact: 'Low'
    },
    {
        metric: 'Discharge Before Noon',
        value: 42,
        target: 50,
        unit: '%',
        trend: 'stable',
        impact: 'High'
    }
]

// Cost per Case by Service Line
export const costPerCase = [
    { service: 'Cardiac Surgery', cost: 18500, benchmark: 19200, cases: 45 },
    { service: 'Orthopedic Surgery', cost: 12800, benchmark: 13500, cases: 89 },
    { service: 'General Surgery', cost: 8200, benchmark: 8500, cases: 156 },
    { service: 'Obstetrics', cost: 4500, benchmark: 4800, cases: 234 },
    { service: 'Cardiology', cost: 6800, benchmark: 7200, cases: 312 },
    { service: 'Oncology', cost: 15200, benchmark: 16000, cases: 67 },
    { service: 'Neurology', cost: 9800, benchmark: 10200, cases: 98 }
]

// Patient Risk Stratification
export const riskStratification = [
    { category: 'Critical Risk', count: 45, readmission: 28, avgCost: 18500, color: '#ef4444' },
    { category: 'High Risk', count: 128, readmission: 22, avgCost: 12800, color: '#f59e0b' },
    { category: 'Medium Risk', count: 312, readmission: 14, avgCost: 7200, color: '#eab308' },
    { category: 'Low Risk', count: 515, readmission: 5, avgCost: 3800, color: '#22c55e' }
]

// Readmission Analysis by Diagnosis
export const readmissionByDiagnosis = [
    { diagnosis: 'Heart Failure', rate: 24.5, volume: 89, cost: 428000 },
    { diagnosis: 'COPD', rate: 22.1, volume: 67, cost: 312000 },
    { diagnosis: 'Pneumonia', rate: 18.7, volume: 134, cost: 385000 },
    { diagnosis: 'Sepsis', rate: 16.8, volume: 45, cost: 298000 },
    { diagnosis: 'Diabetes', rate: 14.2, volume: 156, cost: 245000 },
    { diagnosis: 'Stroke', rate: 12.3, volume: 78, cost: 412000 }
]

// Emergency Department Metrics
export const edMetrics = {
    totalVisits: 1234,
    admitRate: 18.5,
    lwbs: 3.2, // Left without being seen
    avgWaitTime: 32,
    fastTrackPercent: 42,
    severity: {
        trauma: 8,
        urgent: 35,
        semiUrgent: 42,
        nonUrgent: 15
    },
    hourlyPattern: [
        { hour: '00-06', volume: 45, acuity: 3.2 },
        { hour: '06-12', volume: 285, acuity: 2.8 },
        { hour: '12-18', volume: 512, acuity: 2.5 },
        { hour: '18-24', volume: 392, acuity: 2.9 }
    ]
}

// Length of Stay Analysis
export const losAnalysis = [
    { department: 'General Surgery', target: 5.0, actual: 5.2, variance: 0.2, volume: 234 },
    { department: 'Cardiology', target: 4.5, actual: 4.8, variance: 0.3, volume: 189 },
    { department: 'Orthopedics', target: 6.0, actual: 6.5, variance: 0.5, volume: 156 },
    { department: 'Neurology', target: 7.0, actual: 7.2, variance: 0.2, volume: 98 },
    { department: 'ICU', target: 4.0, actual: 4.5, variance: 0.5, volume: 67 },
    { department: 'Pediatrics', target: 3.0, actual: 2.8, variance: -0.2, volume: 312 }
]

// Payer Mix Revenue Distribution
export const payerMixRevenue = [
    { payer: 'Out-of-Pocket', revenue: 7020, percentage: 38, margin: 22 },
    { payer: 'SLPA', revenue: 4625, percentage: 25, margin: 15 },
    { payer: 'NHIF', revenue: 3330, percentage: 18, margin: 12 },
    { payer: 'Private Insurance', revenue: 2220, percentage: 12, margin: 18 },
    { payer: 'Arogya', revenue: 925, percentage: 5, margin: 8 },
    { payer: 'International', revenue: 370, percentage: 2, margin: 28 }
]

// Top 10 DRGs (Diagnosis Related Groups) by Revenue
export const topDRGs = [
    { drg: 'Major Joint Replacement', volume: 89, revenue: 1245000, margin: 28, los: 3.2 },
    { drg: 'Cardiac Valve Procedures', volume: 34, revenue: 982000, margin: 25, los: 6.5 },
    { drg: 'Coronary Bypass', volume: 45, revenue: 875000, margin: 22, los: 7.2 },
    { drg: 'Major Bowel Procedures', volume: 67, revenue: 658000, margin: 20, los: 8.1 },
    { drg: 'Septicemia', volume: 123, revenue: 612000, margin: 15, los: 5.8 },
    { drg: 'Heart Failure', volume: 156, revenue: 545000, margin: 12, los: 4.5 },
    { drg: 'Pneumonia', volume: 189, revenue: 498000, margin: 14, los: 4.2 },
    { drg: 'Stroke', volume: 78, revenue: 476000, margin: 16, los: 6.8 },
    { drg: 'Kidney & UTI', volume: 234, revenue: 445000, margin: 18, los: 3.5 },
    { drg: 'Diabetes', volume: 312, revenue: 412000, margin: 16, los: 3.8 }
]

// Workforce Productivity Benchmarks
export const workforceProductivity = [
    { role: 'Physician', fte: 68, patients: 21.3, benchmark: 20.0, status: 'above' },
    { role: 'RN', fte: 142, patients: 4.8, benchmark: 5.0, status: 'optimal' },
    { role: 'LPN', fte: 34, patients: 8.2, benchmark: 8.0, status: 'optimal' },
    { role: 'Pharmacist', fte: 12, orders: 285, benchmark: 250, status: 'above' },
    { role: 'Radiologist', fte: 8, studies: 142, benchmark: 130, status: 'above' },
    { role: 'Lab Tech', fte: 18, tests: 520, benchmark: 500, status: 'optimal' }
]

// Predictive Analytics - 30 Day Forecast
export const forecast30Days = {
    admissions: { current: 485, predicted: 520, confidence: 94, change: 7.2 },
    revenue: { current: 1850000, predicted: 1985000, confidence: 91, change: 7.3 },
    costs: { current: 1510000, predicted: 1615000, confidence: 89, change: 6.9 },
    icuDemand: { current: 15, predicted: 18, confidence: 87, change: 20.0 },
    edVisits: { current: 1234, predicted: 1312, confidence: 92, change: 6.3 },
    surgeries: { current: 156, predicted: 168, confidence: 88, change: 7.7 }
}

// Strategic Initiatives Tracking
export const strategicInitiatives = [
    {
        initiative: 'Reduce Readmissions',
        target: 10.0,
        current: 12.3,
        progress: 45,
        deadline: '2026-Q2',
        roi: 280000,
        status: 'on-track'
    },
    {
        initiative: 'Improve OR Utilization',
        target: 90,
        current: 82,
        progress: 35,
        deadline: '2026-Q1',
        roi: 145000,
        status: 'at-risk'
    },
    {
        initiative: 'Increase Patient Satisfaction',
        target: 90,
        current: 87,
        progress: 60,
        deadline: '2026-Q2',
        roi: 95000,
        status: 'on-track'
    },
    {
        initiative: 'Reduce LOS',
        target: 5.0,
        current: 5.8,
        progress: 25,
        deadline: '2026-Q3',
        roi: 320000,
        status: 'delayed'
    }
]
