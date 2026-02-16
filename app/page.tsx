'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

export default function ExecutiveDashboard() {
    const [timeRange, setTimeRange] = useState('30d')
    const [selectedDept, setSelectedDept] = useState('All')

    // EXECUTIVE KPIs - What C-Suite Needs Daily
    const executiveKPIs = {
        financial: {
            revenue: 1850000, // This month
            revenueChange: 8.3,
            costPerPatient: 4250,
            costChange: -3.2,
            margin: 18.5,
            marginChange: 2.1,
            arDays: 42, // Accounts receivable days
            arChange: -5
        },
        operational: {
            bedUtilization: 78.5,
            targetUtilization: 85,
            avgLOS: 5.8, // days
            targetLOS: 5.2,
            erWaitTime: 32, // minutes
            targetERWait: 30,
            surgeryUtilization: 82,
            targetSurgery: 90
        },
        clinical: {
            mortalityRate: 1.2,
            industryAvg: 1.5,
            infectionRate: 0.8,
            targetInfection: 1.0,
            readmissionRate: 12.3,
            targetReadmission: 10.0,
            patientSatisfaction: 87,
            targetSatisfaction: 90
        }
    }

    // Financial Performance Trend
    const financialTrend = [
        { month: 'Jul', revenue: 1640, cost: 1350, margin: 17.7, patients: 412 },
        { month: 'Aug', revenue: 1720, cost: 1390, margin: 19.2, patients: 435 },
        { month: 'Sep', revenue: 1680, cost: 1420, margin: 15.5, patients: 428 },
        { month: 'Oct', revenue: 1780, cost: 1440, margin: 19.1, patients: 458 },
        { month: 'Nov', revenue: 1810, cost: 1465, margin: 19.1, patients: 467 },
        { month: 'Dec', revenue: 1850, cost: 1510, margin: 18.4, patients: 485 },
    ]

    // Department Performance Matrix
    const departmentPerformance = [
        {
            dept: 'Emergency',
            revenue: 425000,
            cost: 380000,
            margin: 10.6,
            patients: 1234,
            avgLOS: 0.5,
            satisfaction: 82,
            utilization: 92,
            status: 'warning' // over capacity
        },
        {
            dept: 'Cardiology',
            revenue: 680000,
            cost: 510000,
            margin: 25.0,
            patients: 892,
            avgLOS: 6.2,
            satisfaction: 91,
            utilization: 85,
            status: 'good'
        },
        {
            dept: 'Orthopedics',
            revenue: 520000,
            cost: 390000,
            margin: 25.0,
            patients: 547,
            avgLOS: 8.1,
            satisfaction: 88,
            utilization: 78,
            status: 'good'
        },
        {
            dept: 'Pediatrics',
            revenue: 280000,
            cost: 245000,
            margin: 12.5,
            patients: 823,
            avgLOS: 3.2,
            satisfaction: 93,
            utilization: 71,
            status: 'underutilized'
        },
        {
            dept: 'Neurology',
            revenue: 445000,
            cost: 355000,
            margin: 20.2,
            patients: 654,
            avgLOS: 7.5,
            satisfaction: 85,
            utilization: 82,
            status: 'good'
        },
    ]

    // Patient Flow Analysis
    const patientFlow = [
        { hour: '00:00', admissions: 2, discharges: 0, erVisits: 5, surgeries: 0 },
        { hour: '04:00', admissions: 1, discharges: 0, erVisits: 3, surgeries: 0 },
        { hour: '08:00', admissions: 15, discharges: 8, erVisits: 18, surgeries: 12 },
        { hour: '12:00', admissions: 22, discharges: 12, erVisits: 28, surgeries: 15 },
        { hour: '16:00', admissions: 18, discharges: 15, erVisits: 32, surgeries: 8 },
        { hour: '20:00', admissions: 12, discharges: 5, erVisits: 24, surgeries: 2 },
    ]

    // Clinical Quality Metrics
    const qualityMetrics = [
        { metric: 'Mortality Rate', value: 1.2, target: 1.5, benchmark: 1.5, unit: '%', status: 'good' },
        { metric: 'Infection Rate', value: 0.8, target: 1.0, benchmark: 1.2, unit: '%', status: 'good' },
        { metric: 'Readmission Rate (30d)', value: 12.3, target: 10.0, benchmark: 14.5, unit: '%', status: 'warning' },
        { metric: 'Patient Satisfaction', value: 87, target: 90, benchmark: 85, unit: '%', status: 'warning' },
        { metric: 'ER Wait Time', value: 32, target: 30, benchmark: 45, unit: 'min', status: 'warning' },
        { metric: 'Medication Errors', value: 2.1, target: 2.0, benchmark: 3.5, unit: 'per 1000', status: 'warning' },
    ]

    // Revenue by Service Line
    const revenueByService = [
        { service: 'Surgery', revenue: 680, margin: 28, volume: 156 },
        { service: 'Cardiology', revenue: 520, margin: 25, volume: 892 },
        { service: 'Imaging', revenue: 340, margin: 35, volume: 2340 },
        { service: 'Lab Services', revenue: 280, margin: 22, volume: 4850 },
        { service: 'Emergency', revenue: 425, margin: 11, volume: 1234 },
        { service: 'Outpatient', revenue: 315, margin: 18, volume: 3200 },
    ]

    // Predictive Analytics - Next 30 Days
    const predictions = {
        admissions: { predicted: 1520, confidence: 94, trend: 'up' },
        revenue: { predicted: 1920000, confidence: 91, trend: 'up' },
        criticalBeds: { predicted: 28, confidence: 89, trend: 'up' },
        staffingNeeds: { predicted: 142, confidence: 87, trend: 'stable' },
    }

    // Alerts & Action Items
    const alerts = [
        { priority: 'high', type: 'Operational', message: 'Emergency Dept at 92% capacity - consider diversion protocol', action: 'Add 2 temp staff, activate overflow area' },
        { priority: 'high', type: 'Financial', message: '485 high-risk readmissions predicted - $2.8M at risk', action: 'Deploy care coordination team' },
        { priority: 'medium', type: 'Quality', message: 'Patient satisfaction dropped 3pts in Neurology', action: 'Schedule dept review meeting' },
        { priority: 'medium', type: 'Operational', message: 'Surgery utilization below target (82% vs 90%)', action: 'Review OR scheduling efficiency' },
        { priority: 'low', type: 'Clinical', message: 'Pediatrics bed utilization at 71%', action: 'Opportunity for elective admissions' },
    ]

    const getStatusColor = (status: string) => {
        if (status === 'good') return 'border-green-500 bg-green-50'
        if (status === 'warning') return 'border-yellow-500 bg-yellow-50'
        if (status === 'critical') return 'border-red-500 bg-red-50'
        return 'border-gray-300 bg-gray-50'
    }

    const getTrendIcon = (change: number) => {
        if (change > 0) return <span className="text-green-600">↑ +{change}%</span>
        if (change < 0) return <span className="text-red-600">↓ {change}%</span>
        return <span className="text-gray-600">→ 0%</span>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Executive Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl">
                <div className="max-w-[2000px] mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Hospital Executive Dashboard</h1>
                            <p className="text-gray-300">Real-time KPIs • Financial • Operational • Clinical Quality</p>
                        </div>
                        <div className="flex gap-4">
                            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 90 Days</option>
                                <option value="ytd">Year to Date</option>
                            </select>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">Last Updated</div>
                                <div className="text-lg font-semibold">{new Date().toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[2000px] mx-auto px-8 py-6 space-y-6">

                {/* CRITICAL ALERTS - Top Priority */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🚨 Critical Alerts & Required Actions</h2>
                    <div className="space-y-3">
                        {alerts.map((alert, idx) => (
                            <div key={idx} className={`p-4 rounded-lg border-l-4 ${alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                                alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                                    'border-blue-500 bg-blue-50'
                                }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${alert.priority === 'high' ? 'bg-red-200 text-red-900' :
                                                alert.priority === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                                                    'bg-blue-200 text-blue-900'
                                                }`}>
                                                {alert.priority.toUpperCase()}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-600">{alert.type}</span>
                                        </div>
                                        <p className="font-semibold text-gray-900 mb-2">{alert.message}</p>
                                        <p className="text-sm text-gray-700">→ <strong>Action:</strong> {alert.action}</p>
                                    </div>
                                    <button className="ml-4 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors">
                                        Take Action
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EXECUTIVE KPI SUMMARY - The Money Shot */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Executive KPI Summary</h2>

                    {/* Financial KPIs */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">💰 Financial Performance (This Month)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-green-500">
                                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                                <div className="text-3xl font-bold text-gray-900">${(executiveKPIs.financial.revenue / 1000).toFixed(0)}K</div>
                                <div className="text-sm mt-2">{getTrendIcon(executiveKPIs.financial.revenueChange)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-blue-500">
                                <div className="text-sm text-gray-600 mb-1">Cost per Patient</div>
                                <div className="text-3xl font-bold text-gray-900">${executiveKPIs.financial.costPerPatient}</div>
                                <div className="text-sm mt-2">{getTrendIcon(executiveKPIs.financial.costChange)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-purple-500">
                                <div className="text-sm text-gray-600 mb-1">Operating Margin</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.financial.margin}%</div>
                                <div className="text-sm mt-2">{getTrendIcon(executiveKPIs.financial.marginChange)}</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-amber-500">
                                <div className="text-sm text-gray-600 mb-1">AR Days</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.financial.arDays}</div>
                                <div className="text-sm mt-2">{getTrendIcon(executiveKPIs.financial.arChange)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Operational KPIs */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">⚙️ Operational Efficiency</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-lg p-5">
                                <div className="text-sm text-gray-600 mb-1">Bed Utilization</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.operational.bedUtilization}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${executiveKPIs.operational.bedUtilization}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Target: {executiveKPIs.operational.targetUtilization}%</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5">
                                <div className="text-sm text-gray-600 mb-1">Avg Length of Stay</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.operational.avgLOS} days</div>
                                <div className="text-xs text-gray-500 mt-3">Target: {executiveKPIs.operational.targetLOS} days</div>
                                <div className="text-sm text-yellow-600 mt-1">↑ 0.6d above target</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5">
                                <div className="text-sm text-gray-600 mb-1">ER Wait Time</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.operational.erWaitTime} min</div>
                                <div className="text-xs text-gray-500 mt-3">Target: {executiveKPIs.operational.targetERWait} min</div>
                                <div className="text-sm text-yellow-600 mt-1">↑ 2min above target</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5">
                                <div className="text-sm text-gray-600 mb-1">Surgery Utilization</div>
                                <div className="text-3xl font-bold text-gray-900">{executiveKPIs.operational.surgeryUtilization}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${executiveKPIs.operational.surgeryUtilization}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Target: {executiveKPIs.operational.targetSurgery}%</div>
                            </div>
                        </div>
                    </div>

                    {/* Clinical KPIs */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">🏥 Clinical Quality</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-green-500">
                                <div className="text-sm text-gray-600 mb-1">Mortality Rate</div>
                                <div className="text-3xl font-bold text-green-600">{executiveKPIs.clinical.mortalityRate}%</div>
                                <div className="text-xs text-gray-500 mt-2">Industry: {executiveKPIs.clinical.industryAvg}%</div>
                                <div className="text-sm text-green-600 mt-1">✓ Below industry avg</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-green-500">
                                <div className="text-sm text-gray-600 mb-1">Infection Rate</div>
                                <div className="text-3xl font-bold text-green-600">{executiveKPIs.clinical.infectionRate}%</div>
                                <div className="text-xs text-gray-500 mt-2">Target: {executiveKPIs.clinical.targetInfection}%</div>
                                <div className="text-sm text-green-600 mt-1">✓ Meeting target</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-yellow-500">
                                <div className="text-sm text-gray-600 mb-1">30-Day Readmission</div>
                                <div className="text-3xl font-bold text-yellow-600">{executiveKPIs.clinical.readmissionRate}%</div>
                                <div className="text-xs text-gray-500 mt-2">Target: {executiveKPIs.clinical.targetReadmission}%</div>
                                <div className="text-sm text-yellow-600 mt-1">⚠ 2.3% above target</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-yellow-500">
                                <div className="text-sm text-gray-600 mb-1">Patient Satisfaction</div>
                                <div className="text-3xl font-bold text-yellow-600">{executiveKPIs.clinical.patientSatisfaction}%</div>
                                <div className="text-xs text-gray-500 mt-2">Target: {executiveKPIs.clinical.targetSatisfaction}%</div>
                                <div className="text-sm text-yellow-600 mt-1">⚠ 3% below target</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Performance Trend */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Revenue & Margin Trend (6 Months)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={financialTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" label={{ value: 'Revenue ($K)', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" label={{ value: 'Margin (%)', angle: 90, position: 'insideRight' }} />
                                <Tooltip />
                                <Legend />
                                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Revenue ($K)" />
                                <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={3} name="Margin (%)" />              </AreaChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-700"><strong>Insight:</strong> Revenue up 12.8% vs 6mo ago. Margin stable at 18.4%. Patient volume +17.7%.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">💼 Revenue by Service Line</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueByService} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="service" type="category" width={100} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($K)" />
                                <Bar dataKey="margin" fill="#10b981" name="Margin (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                            <p className="text-sm text-gray-700"><strong>Opportunity:</strong> Surgery has highest margin (28%). Increase OR utilization from 82% to 90% = +$120K/mo.</p>
                        </div>
                    </div>
                </div>

                {/* Department Performance Matrix */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🏥 Department Performance Matrix</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-300">
                                    <th className="text-left p-3 font-semibold">Department</th>
                                    <th className="text-right p-3 font-semibold">Revenue</th>
                                    <th className="text-right p-3 font-semibold">Cost</th>
                                    <th className="text-right p-3 font-semibold">Margin</th>
                                    <th className="text-right p-3 font-semibold">Patients</th>
                                    <th className="text-right p-3 font-semibold">Avg LOS</th>
                                    <th className="text-right p-3 font-semibold">Satisfaction</th>
                                    <th className="text-center p-3 font-semibold">Utilization</th>
                                    <th className="text-center p-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departmentPerformance.map((dept, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 font-semibold text-gray-900">{dept.dept}</td>
                                        <td className="p-3 text-right">${(dept.revenue / 1000).toFixed(0)}K</td>
                                        <td className="p-3 text-right">${(dept.cost / 1000).toFixed(0)}K</td>
                                        <td className="p-3 text-right font-semibold text-green-600">{dept.margin}%</td>
                                        <td className="p-3 text-right">{dept.patients}</td>
                                        <td className="p-3 text-right">{dept.avgLOS}d</td>
                                        <td className="p-3 text-right">{dept.satisfaction}%</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                    <div className={`h-2 rounded-full ${dept.utilization > 90 ? 'bg-red-500' : dept.utilization > 80 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${dept.utilization}%` }}></div>
                                                </div>
                                                <span className="ml-2 text-sm font-semibold">{dept.utilization}%</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${dept.status === 'good' ? 'bg-green-100 text-green-800' :
                                                dept.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {dept.status === 'good' ? '✓ Good' :
                                                    dept.status === 'warning' ? '⚠ Over Cap' :
                                                        '→ Low Util'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Patient Flow & Predictive Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🔄 24-Hour Patient Flow</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={patientFlow}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={2} name="Admissions" />
                                <Line type="monotone" dataKey="discharges" stroke="#10b981" strokeWidth={2} name="Discharges" />
                                <Line type="monotone" dataKey="erVisits" stroke="#f59e0b" strokeWidth={2} name="ER Visits" />
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-700"><strong>Pattern:</strong> Peak ER visits 4-8PM (32 visits). Schedule 2 extra staff 3-9PM.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🔮 Predictive Analytics (Next 30 Days)</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-sm text-gray-600">Predicted Admissions</div>
                                        <div className="text-3xl font-bold text-blue-600">{predictions.admissions.predicted}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Confidence</div>
                                        <div className="text-2xl font-bold text-gray-900">{predictions.admissions.confidence}%</div>
                                    </div>
                                </div>
                                <div className="text-sm text-blue-700 mt-2">↑ 8% increase expected vs last month</div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-sm text-gray-600">Predicted Revenue</div>
                                        <div className="text-3xl font-bold text-green-600">${(predictions.revenue.predicted / 1000).toFixed(0)}K</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Confidence</div>
                                        <div className="text-2xl font-bold text-gray-900">{predictions.revenue.confidence}%</div>
                                    </div>
                                </div>
                                <div className="text-sm text-green-700 mt-2">↑ 3.8% revenue growth projected</div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-sm text-gray-600">Critical Care Bed Need</div>
                                        <div className="text-3xl font-bold text-red-600">{predictions.criticalBeds.predicted}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Confidence</div>
                                        <div className="text-2xl font-bold text-gray-900">{predictions.criticalBeds.confidence}%</div>
                                    </div>
                                </div>
                                <div className="text-sm text-red-700 mt-2">⚠ 12% above current capacity - prepare surge plan</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
