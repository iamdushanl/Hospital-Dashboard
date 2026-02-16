'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'
import { useState, useEffect } from 'react'

export default function ComprehensiveHospitalDashboard() {
    const [activeTab, setActiveTab] = useState('executive')
    const [timeRange, setTimeRange] = useState('30d')
    const [livePatients, setLivePatients] = useState(142)
    const [liveERWait, setLiveERWait] = useState(28)

    // Simulate real-time data
    useEffect(() => {
        const interval = setInterval(() => {
            setLivePatients(prev => Math.max(120, Math.min(180, prev + Math.floor(Math.random() * 7) - 3)))
            setLiveERWait(prev => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 7) - 3)))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    // Colors
    const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140', '#30cfd0']

    // Mock Data - Financial
    const monthlyRevenue = [
        { month: 'Jan', revenue: 2850, cost: 2340, margin: 17.9, patients: 612 },
        { month: 'Feb', revenue: 2920, cost: 2380, margin: 18.5, patients: 628 },
        { month: 'Mar', revenue: 3100, cost: 2450, margin: 21.0, patients: 654 },
        { month: 'Apr', revenue: 3050, cost: 2510, margin: 17.7, patients: 642 },
        { month: 'May', revenue: 3280, cost: 2590, margin: 21.0, patients: 671 },
        { month: 'Jun', revenue: 3150, cost: 2620, margin: 16.8, patients: 658 },
        { month: 'Jul', revenue: 3320, cost: 2650, margin: 20.2, patients: 683 },
        { month: 'Aug', revenue: 3450, cost: 2710, margin: 21.4, patients: 695 },
        { month: 'Sep', revenue: 3280, cost: 2730, margin: 16.8, patients: 672 },
        { month: 'Oct', revenue: 3520, cost: 2780, margin: 21.0, patients: 702 },
        { month: 'Nov', revenue: 3680, cost: 2850, margin: 22.6, patients: 724 },
        { month: 'Dec', revenue: 3850, cost: 2920, margin: 24.2, patients: 745 }
    ]

    const payerMix = [
        { name: 'Government Insurance', value: 38, revenue: 1462 },
        { name: 'Private Insurance', value: 32, revenue: 1232 },
        { name: 'Self-Pay', value: 18, revenue: 693 },
        { name: 'Medicare', value: 12, revenue: 462 }
    ]

    const topServices = [
        { service: 'Surgery', revenue: 945, patients: 156 },
        { service: 'Cardiology', revenue: 812, patients: 189 },
        { service: 'Oncology', revenue: 756, patients: 124 },
        { service: 'Orthopedics', revenue: 623, patients: 142 },
        { service: 'Neurology', revenue: 534, patients: 98 },
        { service: 'Emergency', revenue: 487, patients: 423 },
        { service: 'Imaging', revenue: 398, patients: 672 },
        { service: 'Laboratory', revenue: 295, patients: 1243 }
    ]

    // Clinical Quality Data
    const qualityMetrics = [
        { metric: 'Mortality Rate', value: 1.2, target: 1.5, benchmark: 1.6, status: 'good' },
        { metric: 'HAI Rate', value: 0.8, target: 1.0, benchmark: 1.3, status: 'good' },
        { metric: '30d Readmission', value: 12.3, target: 10.0, benchmark: 14.2, status: 'warning' },
        { metric: 'Patient Satisfaction', value: 87, target: 90, benchmark: 82, status: 'warning' },
        { metric: 'Medication Errors', value: 2.1, target: 2.0, benchmark: 3.2, status: 'warning' }
    ]

    const readmissionByDiagnosis = [
        { diagnosis: 'Heart Failure', rate: 18.5, count: 42 },
        { diagnosis: 'Pneumonia', rate: 15.2, count: 35 },
        { diagnosis: 'COPD', rate: 14.8, count: 28 },
        { diagnosis: 'Sepsis', rate: 12.3, count: 19 },
        { diagnosis: 'Stroke', rate: 9.8, count: 15 }
    ]

    // Patient Analytics
    const ageDistribution = [
        { age: '0-17', male: 45, female: 42 },
        { age: '18-30', male: 68, female: 72 },
        { age: '31-45', male: 92, female: 95 },
        { age: '46-60', male: 115, female: 108 },
        { age: '61-75', male: 89, female: 93 },
        { age: '76+', male: 52, female: 58 }
    ]

    const topDiagnoses = [
        { diagnosis: 'Hypertension', count: 234, avgLOS: 3.2 },
        { diagnosis: 'Diabetes', count: 198, avgLOS: 4.1 },
        { diagnosis: 'COVID-19', count: 176, avgLOS: 6.8 },
        { diagnosis: 'Heart Disease', count: 145, avgLOS: 5.4 },
        { diagnosis: 'Pneumonia', count: 132, avgLOS: 5.9 },
        { diagnosis: 'COPD', count: 98, avgLOS: 6.2 },
        { diagnosis: 'Stroke', count: 87, avgLOS: 7.5 },
        { diagnosis: 'Kidney Disease', count: 76, avgLOS: 5.1 }
    ]

    // Operations Data
    const bedUtilization = [
        { ward: 'ICU', capacity: 24, occupied: 22, utilization: 92, avgLOS: 4.2 },
        { ward: 'General', capacity: 120, occupied: 95, utilization: 79, avgLOS: 5.8 },
        { ward: 'Private', capacity: 45, occupied: 31, utilization: 69, avgLOS: 3.9 },
        { ward: 'Pediatric', capacity: 30, occupied: 18, utilization: 60, avgLOS: 4.5 },
        { ward: 'Maternity', capacity: 25, occupied: 20, utilization: 80, avgLOS: 2.8 }
    ]

    const edMetrics = [
        { time: '00:00', arrivals: 8, admitted: 2, lwbs: 0 },
        { time: '04:00', arrivals: 5, admitted: 1, lwbs: 0 },
        { time: '08:00', arrivals: 23, admitted: 8, lwbs: 1 },
        { time: '12:00', arrivals: 35, admitted: 12, lwbs: 2 },
        { time: '16:00', arrivals: 42, admitted: 15, lwbs: 3 },
        { time: '20:00', arrivals: 31, admitted: 10, lwbs: 2 }
    ]

    // Workforce Data
    const doctorProductivity = [
        { name: 'Dr. Silva', patients: 28, revenue: 145, satisfaction: 93 },
        { name: 'Dr. Perera', patients: 26, revenue: 138, satisfaction: 91 },
        { name: 'Dr. Fernando', patients: 24, revenue: 125, satisfaction: 89 },
        { name: 'Dr. Jayawardena', patients: 23, revenue: 118, satisfaction: 88 },
        { name: 'Dr. Wickramasinghe', patients: 22, revenue: 112, satisfaction: 90 }
    ]

    const staffingLevels = [
        { dept: 'Emergency', nurses: 18, required: 22, gap: -4, overtime: 45 },
        { dept: 'ICU', nurses: 24, required: 28, gap: -4, overtime: 52 },
        { dept: 'General Ward', nurses: 42, required: 45, gap: -3, overtime: 28 },
        { dept: 'OR', nurses: 16, required: 16, gap: 0, overtime: 15 }
    ]

    // Predictive Analytics
    const predictions = {
        admissions: { current: 672, predicted: 718, confidence: 94, change: 6.8 },
        revenue: { current: 3850, predicted: 4120, confidence: 91, change: 7.0 },
        occupancy: { current: 78, predicted: 84, confidence: 89, change: 7.7 },
        erVisits: { current: 1243, predicted: 1356, confidence: 87, change: 9.1 }
    }

    const forecast30Days = [
        { day: 'Week 1', admissions: 172, lower: 165, upper: 179 },
        { day: 'Week 2', admissions: 178, lower: 169, upper: 187 },
        { day: 'Week 3', admissions: 182, lower: 171, upper: 193 },
        { day: 'Week 4', admissions: 186, lower: 174, upper: 198 }
    ]

    const tabs = [
        { id: 'executive', name: 'Executive Summary', icon: '📊' },
        { id: 'financial', name: 'Financial', icon: '💰' },
        { id: 'clinical', name: 'Clinical Quality', icon: '🏥' },
        { id: 'patients', name: 'Patient Analytics', icon: '👥' },
        { id: 'operations', name: 'Operations', icon: '⚙️' },
        { id: 'workforce', name: 'Workforce', icon: '👨‍⚕️' },
        { id: 'predictive', name: 'Predictive', icon: '🔮' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
                <div className="max-w-[1800px] mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">🏥 Hospital Analytics Dashboard</h1>
                            <p className="text-blue-100">Comprehensive Data Intelligence Platform</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="text-right bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <div className="text-xs text-blue-100">Live Patients</div>
                                <div className="text-3xl font-bold animate-pulse">{livePatients}</div>
                            </div>
                            <div className="text-right bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <div className="text-xs text-blue-100">ER Wait (min)</div>
                                <div className="text-3xl font-bold">{liveERWait}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white shadow-lg border-b-2 border-gray-200 sticky top-0 z-50">
                <div className="max-w-[1800px] mx-auto px-8">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-b-4 border-blue-600 text-blue-600 bg-blue-50'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-[1800px] mx-auto px-8 py-6">
                {/* Executive Summary Tab */}
                {activeTab === 'executive' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Executive Summary</h2>

                        {/* Hero KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg">
                                <div className="text-sm opacity-90">Monthly Revenue</div>
                                <div className="text-4xl font-bold mt-2">$3.85M</div>
                                <div className="text-sm mt-2">↑ +24.2% vs last month</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                                <div className="text-sm opacity-90">Bed Occupancy</div>
                                <div className="text-4xl font-bold mt-2">78%</div>
                                <div className="text-sm mt-2">Target: 85%</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                                <div className="text-sm opacity-90">Patient Satisfaction</div>
                                <div className="text-4xl font-bold mt-2">87%</div>
                                <div className="text-sm mt-2">Goal: 90%</div>
                            </div>
                            <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white p-6 rounded-xl shadow-lg">
                                <div className="text-sm opacity-90">ER Wait Time</div>
                                <div className="text-4xl font-bold mt-2">{liveERWait} min</div>
                                <div className="text-sm mt-2">Target: ≤30 min</div>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Revenue Trend (12 Months)</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={monthlyRevenue}>
                                        <defs>
                                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="revenue" stroke="#667eea" fillOpacity={1} fill="url(#colorRev)" name="Revenue ($K)" />
                                        <Line type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={2} name="Margin (%)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Insight:</strong> Revenue up 35% YoY. Margin at 24.2% - highest in 12 months.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Payer Mix Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={payerMix} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                                            {payerMix.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Opportunity:</strong> Government insurance 38% - negotiate better rates for +$180K/yr.</p>
                                </div>
                            </div>
                        </div>

                        {/* Predictions */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">🔮 30-Day ML Predictions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {Object.entries(predictions).map(([key, data]) => (
                                    <div key={key} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                        <div className="text-sm text-gray-600 capitalize">{key}</div>
                                        <div className="text-3xl font-bold text-purple-600 mt-2">{data.predicted}</div>
                                        <div className="text-xs text-gray-500 mt-1">Current: {data.current}</div>
                                        <div className="text-sm text-green-600 mt-2">↑ +{data.change}%</div>
                                        <div className="text-xs text-gray-500 mt-1">{data.confidence}% confidence</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Financial Tab */}
                {activeTab === 'financial' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Financial Performance</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Top Revenue Services</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={topServices} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="service" type="category" width={100} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="revenue" fill="#667eea" name="Revenue ($K)" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Actionable:</strong> Surgery generates $945K. Increase OR capacity to boost by 15% = +$142K/month.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Revenue vs Cost Trend</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={monthlyRevenue}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($K)" />
                                        <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} name="Cost ($K)" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Performance:</strong> Revenue growth outpacing cost growth. Margin expanding from 17.9% to 24.2%.</p>
                                </div>
                            </div>
                        </div>

                        {/* Financial KPIs Table */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Monthly Financial Summary</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-3 text-left">Month</th>
                                            <th className="p-3 text-right">Revenue</th>
                                            <th className="p-3 text-right">Cost</th>
                                            <th className="p-3 text-right">Margin %</th>
                                            <th className="p-3 text-right">Patients</th>
                                            <th className="p-3 text-right">Rev/Patient</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyRevenue.slice(-6).map((row, idx) => (
                                            <tr key={idx} className="border-b hover:bg-gray-50">
                                                <td className="p-3 font-semibold">{row.month}</td>
                                                <td className="p-3 text-right">${(row.revenue).toFixed(0)}K</td>
                                                <td className="p-3 text-right">${(row.cost).toFixed(0)}K</td>
                                                <td className="p-3 text-right font-semibold text-green-600">{row.margin}%</td>
                                                <td className="p-3 text-right">{row.patients}</td>
                                                <td className="p-3 text-right">${((row.revenue * 1000) / row.patients).toFixed(0)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Clinical Quality Tab */}
                {activeTab === 'clinical' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Clinical Quality Metrics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {qualityMetrics.map((metric, idx) => (
                                <div key={idx} className={`p-4 rounded-xl shadow-lg ${metric.status === 'good' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-600'} text-white`}>
                                    <div className="text-xs opacity-90">{metric.metric}</div>
                                    <div className="text-3xl font-bold mt-2">{metric.value}{metric.metric.includes('Rate') || metric.metric.includes('Readmission') ? '%' : metric.metric.includes('Satisfaction') ? '%' : ''}</div>
                                    <div className="text-xs mt-2">Target: {metric.target}</div>
                                    <div className="text-xs">Benchmark: {metric.benchmark}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">30-Day Readmission by Diagnosis</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={readmissionByDiagnosis}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="diagnosis" angle={-45} textAnchor="end" height={100} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="rate" fill="#ef4444" name="Readmission Rate %" />
                                        <Bar dataKey="count" fill="#3b82f6" name="Count" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Critical:</strong> Heart failure readmission 18.5%. Deploy care coordination team - save $420K/yr.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Quality Scorecard</h3>
                                <div className="space-y-4">
                                    {qualityMetrics.map((metric, idx) => (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="font-semibold">{metric.metric}</span>
                                                <span className={metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'}>
                                                    {metric.value} / {metric.target}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div className={`h-3 rounded-full ${metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${(metric.value / metric.benchmark) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Overall:</strong> 3/5 metrics meet target. Focus on readmissions & satisfaction for Q1 goals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Patient Analytics Tab */}
                {activeTab === 'patients' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Patient Analytics</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Age & Gender Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={ageDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="age" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="male" fill="#3b82f6" name="Male" />
                                        <Bar dataKey="female" fill="#ec4899" name="Female" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Demographics:</strong> Peak patients 46-60 age group. Plan geriatric services expansion.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Top Diagnoses</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={topDiagnoses.slice(0, 6)} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="diagnosis" type="category" width={100} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#10b981" name="Patient Count" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Prevalence:</strong> Chronic diseases (HTN, Diabetes) dominate. Launch prevention program.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Operations Tab */}
                {activeTab === 'operations' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Operations & Efficiency</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Bed Utilization by Ward</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={bedUtilization}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="ward" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="utilization" fill="#8b5cf6" name="Utilization %" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Alert:</strong> ICU at 92% capacity. Private ward underutilized at 69% - rebalance resources.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Emergency Department Flow</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={edMetrics}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="arrivals" stroke="#f59e0b" strokeWidth={2} name="Arrivals" />
                                        <Line type="monotone" dataKey="admitted" stroke="#10b981" strokeWidth={2} name="Admitted" />
                                        <Line type="monotone" dataKey="lwbs" stroke="#ef4444" strokeWidth={2} name="LWBS" />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Peak Hours:</strong> 4-8PM has 42 arrivals. Add 2 extra docs 3-9PM to reduce wait time.</p>
                                </div>
                            </div>
                        </div>

                        {/* Bed Utilization Table */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Ward Capacity Details</h3>
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left">Ward</th>
                                        <th className="p-3 text-right">Capacity</th>
                                        <th className="p-3 text-right">Occupied</th>
                                        <th className="p-3 text-right">Utilization</th>
                                        <th className="p-3 text-right">Avg LOS</th>
                                        <th className="p-3 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bedUtilization.map((ward, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-semibold">{ward.ward}</td>
                                            <td className="p-3 text-right">{ward.capacity}</td>
                                            <td className="p-3 text-right">{ward.occupied}</td>
                                            <td className="p-3 text-right">
                                                <span className={`font-semibold ${ward.utilization > 90 ? 'text-red-600' : ward.utilization > 80 ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {ward.utilization}%
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">{ward.avgLOS}d</td>
                                            <td className="p-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${ward.utilization > 90 ? 'bg-red-100 text-red-800' : ward.utilization > 75 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {ward.utilization > 90 ? '⚠ High' : ward.utilization > 75 ? '✓ Optimal' : '→ Low'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Workforce Tab */}
                {activeTab === 'workforce' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Workforce Analytics</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Doctor Productivity Leaderboard</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={doctorProductivity} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={120} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="patients" fill="#3b82f6" name="Patients/Day" />
                                        <Bar dataKey="revenue" fill="#10b981" name="Revenue ($K)" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Top Performer:</strong> Dr. Silva sees 28 patients/day, $145K revenue, 93% satisfaction.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Nursing Staffing Gaps</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={staffingLevels}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="dept" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="nurses" fill="#10b981" name="Current Staff" />
                                        <Bar dataKey="required" fill="#ef4444" name="Required" />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Critical Shortage:</strong> Emergency & ICU need 4 nurses each. High overtime (45-52 hrs/week).</p>
                                </div>
                            </div>
                        </div>

                        {/* Staffing Table */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Department Staffing Analysis</h3>
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left">Department</th>
                                        <th className="p-3 text-right">Current Nurses</th>
                                        <th className="p-3 text-right">Required</th>
                                        <th className="p-3 text-right">Gap</th>
                                        <th className="p-3 text-right">Overtime (hrs/week)</th>
                                        <th className="p-3 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffingLevels.map((dept, idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-semibold">{dept.dept}</td>
                                            <td className="p-3 text-right">{dept.nurses}</td>
                                            <td className="p-3 text-right">{dept.required}</td>
                                            <td className="p-3 text-right">
                                                <span className={`font-semibold ${dept.gap < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                    {dept.gap}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className={dept.overtime > 40 ? 'text-red-600 font-semibold' : ''}>{dept.overtime}</span>
                                            </td>
                                            <td className="p-3">
                                                {dept.gap < 0 ? (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Hire {Math.abs(dept.gap)} nurses</span>
                                                ) : (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Adequate</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Predictive Analytics Tab */}
                {activeTab === 'predictive' && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-3xl font-bold text-gray-900">Predictive Analytics & Forecasting</h2>

                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-xl shadow-2xl">
                            <h3 className="text-2xl font-bold mb-6">🔮 ML-Powered 30-Day Forecast</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {Object.entries(predictions).map(([key, data]) => (
                                    <div key={key} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                                        <div className="text-sm opacity-90 capitalize">{key}</div>
                                        <div className="text-4xl font-bold mt-2">{data.predicted}</div>
                                        <div className="text-sm mt-2">Current: {data.current}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-2xl">↑</span>
                                            <span className="text-lg font-semibold">+{data.change}%</span>
                                        </div>
                                        <div className="text-xs mt-2 opacity-80">{data.confidence}% confidence</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Weekly Admission Forecast</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={forecast30Days}>
                                        <defs>
                                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="admissions" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorForecast)" name="Predicted Admissions" />
                                        <Line type="monotone" dataKey="upper" stroke="#ef4444" strokeDasharray="5 5" name="Upper Bound" />
                                        <Line type="monotone" dataKey="lower" stroke="#10b981" strokeDasharray="5 5" name="Lower Bound" />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                    <p className="text-sm text-gray-700"><strong>Forecast:</strong> Admissions trending up to 186/week. Prepare 15 additional beds by Week 4.</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Key Predictions Summary</h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm text-gray-600">Predicted Admissions</div>
                                                <div className="text-3xl font-bold text-blue-600">718</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">+6.8%</div>
                                                <div className="text-xs text-gray-500">94% confidence</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm text-gray-600">Predicted Revenue</div>
                                                <div className="text-3xl font-bold text-green-600">$4.12M</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">+7.0%</div>
                                                <div className="text-xs text-gray-500">91% confidence</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm text-gray-600">Predicted Occupancy</div>
                                                <div className="text-3xl font-bold text-purple-600">84%</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">+7.7%</div>
                                                <div className="text-xs text-gray-500">89% confidence</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm text-gray-600">Predicted ER Visits</div>
                                                <div className="text-3xl font-bold text-orange-600">1,356</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-green-600 font-semibold">+9.1%</div>
                                                <div className="text-xs text-gray-500">87% confidence</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-2 border-red-300">
                                    <div className="font-bold text-red-700 mb-2">⚠️ Capacity Planning Alert</div>
                                    <p className="text-sm text-gray-700">Next month predictions indicate 9.1% increase in ER visits + 7.7% higher occupancy. Recommend:</p>
                                    <ul className="text-sm text-gray-700 mt-2 ml-4 list-disc">
                                        <li>Add 2 ER physicians for evening shift</li>
                                        <li>Prepare 20 overflow beds</li>
                                        <li>Schedule extra nursing staff</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}
