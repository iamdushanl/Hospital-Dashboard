'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import { useState, useEffect } from 'react'
import PatientDemographics from './components/PatientDemographics'
import StaffProductivity from './components/StaffProductivity'
import ResourceUtilization from './components/ResourceUtilization'
import PrismoChatbot from './components/PrismoChatbot'
import {
    monthlyFinancialTrend,
    qualityTrend,
    satisfactionByCategory,
    operationalMetrics,
    costPerCase,
    riskStratification,
    readmissionByDiagnosis,
    edMetrics,
    losAnalysis,
    payerMixRevenue,
    topDRGs,
    forecast30Days,
    strategicInitiatives
} from './data/comprehensiveMockData'

export default function ComprehensiveDashboard() {
    const [activeTab, setActiveTab] = useState('executive')
    const [timeRange, setTimeRange] = useState('30d')

    // Real-time simulation
    const [realTimeData, setRealTimeData] = useState({
        currentOccupancy: 78,
        emergencyWaitTime: 32,
        availableICUBeds: 3,
        surgeryInProgress: 6,
        patientsInER: 24
    })

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setRealTimeData(prev => ({
                ...prev,
                emergencyWaitTime: Math.max(20, Math.min(45, prev.emergencyWaitTime + (Math.random() > 0.5 ? 1 : -1))),
                patientsInER: Math.max(15, Math.min(35, prev.patientsInER + (Math.random() > 0.5 ? 1 : -1)))
            }))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const tabs = [
        { id: 'executive', label: '📊 Executive Summary', desc: 'Critical KPIs at a glance' },
        { id: 'financial', label: '💰 Financial Performance', desc: 'Revenue, costs & profitability' },
        { id: 'clinical', label: '🏥 Clinical Quality', desc: 'Quality metrics & outcomes' },
        { id: 'operational', label: '⚙️ Operations', desc: 'Efficiency & utilization' },
        { id: 'patients', label: '👥 Patient Analytics', desc: 'Demographics & satisfaction' },
        { id: 'workforce', label: '👨‍⚕️ Workforce', desc: 'Staff productivity & metrics' },
        { id: 'resources', label: '🔧 Resource Utilization', desc: 'Beds, ORs & equipment' },
    ]



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
            {/* Premium Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
                <div className="max-w-[2200px] mx-auto px-8 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="slide-in">
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <span className="text-5xl">🏥</span>
                                Hospital Management Intelligence Dashboard
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Real-Time Analytics • Predictive Insights • Strategic Decision Support
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-white/20 backdrop-blur-lg text-white px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                            >
                                <option value="7d" className="text-gray-900">Last 7 Days</option>
                                <option value="30d" className="text-gray-900">Last 30 Days</option>
                                <option value="90d" className="text-gray-900">Last 90 Days</option>
                                <option value="ytd" className="text-gray-900">Year to Date</option>
                            </select>
                            <div className="text-right bg-white/10 backdrop-blur-lg px-6 py-3 rounded-xl border border-white/20">
                                <div className="text-sm text-blue-100">Last Updated</div>
                                <div className="text-lg font-bold">{new Date().toLocaleTimeString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Real-Time Status Bar */}
                    <div className="grid grid-cols-5 gap-4 mb-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                            <div className="text-blue-100 text-sm mb-1">Bed Occupancy</div>
                            <div className="text-3xl font-bold count-up">{realTimeData.currentOccupancy}%</div>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                                <div className="bg-green-400 h-2 rounded-full transition-all" style={{ width: `${realTimeData.currentOccupancy}%` }}></div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                            <div className="text-blue-100 text-sm mb-1">ER Wait Time</div>
                            <div className="text-3xl font-bold count-up">{realTimeData.emergencyWaitTime} min</div>
                            <div className={`text-sm mt-2 ${realTimeData.emergencyWaitTime > 30 ? 'text-yellow-300' : 'text-green-300'}`}>
                                {realTimeData.emergencyWaitTime > 30 ? '↑ Above target' : '✓ On target'}
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                            <div className="text-blue-100 text-sm mb-1">ICU Beds Available</div>
                            <div className="text-3xl font-bold count-up">{realTimeData.availableICUBeds}</div>
                            <div className="text-sm text-green-300 mt-2">✓ Capacity available</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                            <div className="text-blue-100 text-sm mb-1">Surgeries In Progress</div>
                            <div className="text-3xl font-bold count-up pulse-animation">{realTimeData.surgeryInProgress}</div>
                            <div className="text-sm text-blue-200 mt-2">→ Active now</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                            <div className="text-blue-100 text-sm mb-1">Patients in ER</div>
                            <div className="text-3xl font-bold count-up">{realTimeData.patientsInER}</div>
                            <div className="text-sm text-white mt-2">Live count</div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-semibold transition-all rounded-t-xl min-w-[200px] ${activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-premium'
                                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-lg border border-white/20'
                                    }`}
                            >
                                <div className={activeTab === tab.id ? 'text-lg' : 'text-base'}>{tab.label}</div>
                                <div className={`text-xs mt-1 ${activeTab === tab.id ? 'text-gray-600' : 'text-blue-200'}`}>
                                    {tab.desc}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[2200px] mx-auto px-8 py-8">
                {/* EXECUTIVE SUMMARY TAB */}
                {activeTab === 'executive' && (
                    <div className="space-y-6 slide-in">
                        {/* Hero KPIs */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-premium-hover card-hover">
                                <div className="text-sm font-semibold mb-2 opacity-90">Monthly Revenue</div>
                                <div className="text-4xl font-bold mb-2">Rs. 19.2M</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-white/20 px-2 py-1 rounded">↑ 7.3%</span>
                                    <span>vs last month</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-premium-hover card-hover">
                                <div className="text-sm font-semibold mb-2 opacity-90">Operating Margin</div>
                                <div className="text-4xl font-bold mb-2">19.7%</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-white/20 px-2 py-1 rounded">↑ 0.7pts</span>
                                    <span>improvement</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-premium-hover card-hover">
                                <div className="text-sm font-semibold mb-2 opacity-90">Patient Satisfaction</div>
                                <div className="text-4xl font-bold mb-2">88%</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-white/20 px-2 py-1 rounded">↑ 1pt</span>
                                    <span>above target</span>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-premium-hover card-hover">
                                <div className="text-sm font-semibold mb-2 opacity-90">Readmission Rate</div>
                                <div className="text-4xl font-bold mb-2">12.0%</div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-white/20 px-2 py-1 rounded">↓ 0.3pts</span>
                                    <span>improving</span>
                                </div>
                            </div>
                        </div>

                        {/* Strategic Initiatives Progress */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Strategic Initiatives Progress</h2>
                            <div className="space-y-4">
                                {strategicInitiatives.map((initiative, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-6 card-hover">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900">{initiative.initiative}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${initiative.status === 'on-track' ? 'bg-green-100 text-green-800' :
                                                        initiative.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {initiative.status === 'on-track' ? '✓ On Track' :
                                                            initiative.status === 'at-risk' ? '⚠ At Risk' :
                                                                '🚨 Delayed'}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Current:</span>
                                                        <span className="font-semibold text-gray-900 ml-2">{initiative.current}{typeof initiative.current === 'number' && initiative.current < 50 ? '%' : ''}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Target:</span>
                                                        <span className="font-semibold text-gray-900 ml-2">{initiative.target}{typeof initiative.target === 'number' && initiative.target < 50 ? '%' : ''}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Deadline:</span>
                                                        <span className="font-semibold text-gray-900 ml-2">{initiative.deadline}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">ROI:</span>
                                                        <span className="font-semibold text-green-600 ml-2">Rs. {(initiative.roi / 1000).toFixed(0)}K</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right ml-6">
                                                <div className="text-4xl font-bold text-gray-900">{initiative.progress}%</div>
                                                <div className="text-sm text-gray-600">Complete</div>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all ${initiative.status === 'on-track' ? 'bg-green-500' :
                                                    initiative.status === 'at-risk' ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                    }`}
                                                style={{ width: `${initiative.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*Predictive Forecast */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-premium">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-4xl">🔮</span>
                                30-Day Predictive Forecast
                            </h2>
                            <div className="grid grid-cols-3 gap-6">
                                {Object.entries(forecast30Days).map(([key, data], idx) => (
                                    <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                        <div className="text-sm opacity-90 mb-2">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
                                        <div className="flex items-end gap-3 mb-3">
                                            <div className="text-3xl font-bold">
                                                {key.includes('revenue') || key.includes('cost')
                                                    ? `Rs. ${(data.predicted / 1000).toFixed(0)}K`
                                                    : data.predicted}
                                            </div>
                                            <div className={`text-lg font-semibold ${data.change > 0 ? 'text-green-300' : 'text-red-300'}`}>
                                                {data.change > 0 ? '↑' : '↓'} {Math.abs(data.change).toFixed(1)}%
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="opacity-75">Confidence:</span>
                                            <span className="font-semibold">{data.confidence}%</span>
                                        </div>
                                        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                                            <div className="bg-green-400 h-2 rounded-full" style={{ width: `${data.confidence}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 12-Month Financial Trend */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 12-Month Financial Performance Trend</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <ComposedChart data={monthlyFinancialTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" />
                                    <YAxis yAxisId="left" label={{ value: 'Revenue & Cost (000s)', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Margin (%)', angle: 90, position: 'insideRight' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Area yAxisId="left" type="monotone" dataKey="revenue" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.3} name="Revenue (000s)" />
                                    <Area yAxisId="left" type="monotone" dataKey="cost" fill="#ef4444" stroke="#ef4444" fillOpacity={0.3} name="Cost (000s)" />
                                    <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={3} name="Margin (%)" />
                                    <Bar yAxisId="left" dataKey="patients" fill="#8b5cf6" name="Patients" />
                                </ComposedChart>
                            </ResponsiveContainer>
                            <div className="mt-6 grid grid-cols-4 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">Rs. 20.1M</div>
                                    <div className="text-sm text-gray-600">Latest Revenue</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600">19.7%</div>
                                    <div className="text-sm text-gray-600">Current Margin</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-600">521</div>
                                    <div className="text-sm text-gray-600">Patients (Jan)</div>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-emerald-600">↑ 41.5%</div>
                                    <div className="text-sm text-gray-600">YoY Growth</div>
                                </div>
                            </div>
                        </div>

                        {/* Risk Stratification */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ Patient Risk Stratification & Readmission Management</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={riskStratification}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ category, count }) => `${category}: ${count}`}
                                                outerRadius={120}
                                                dataKey="count"
                                            >
                                                {riskStratification.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-3">
                                    {riskStratification.map((risk, idx) => (
                                        <div key={idx} className="border-l-4 p-4 rounded-r-lg" style={{ borderColor: risk.color, backgroundColor: `${risk.color}10` }}>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-bold text-gray-900">{risk.category}</div>
                                                    <div className="text-sm text-gray-600">{risk.count} patients</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold" style={{ color: risk.color }}>{risk.readmission}%</div>
                                                    <div className="text-xs text-gray-600">Readmission</div>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-700">
                                                Avg Cost: <span className="font-semibold">Rs. {risk.avgCost.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FINANCIAL TAB */}
                {activeTab === 'financial' && (
                    <div className="space-y-6 slide-in">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-premium">
                            <h2 className="text-3xl font-bold mb-2">Financial Performance Dashboard</h2>
                            <p className="text-green-100">Revenue optimization, cost management & profitability analysis</p>
                        </div>

                        {/* Financial Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                                <div className="text-sm text-gray-600 mb-1">Total Revenue (YTD)</div>
                                <div className="text-3xl font-bold text-gray-900">Rs. 18.2M</div>
                                <div className="text-sm text-green-600 mt-2">↑ 8.4% vs target</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
                                <div className="text-sm text-gray-600 mb-1">Net Profit Margin</div>
                                <div className="text-3xl font-bold text-gray-900">22.4%</div>
                                <div className="text-sm text-green-600 mt-2">↑ 1.2% point increase</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                                <div className="text-sm text-gray-600 mb-1">Patient Volume</div>
                                <div className="text-3xl font-bold text-gray-900">14,245</div>
                                <div className="text-sm text-blue-600 mt-2">↑ 4.5% year-over-year</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
                                <div className="text-sm text-gray-600 mb-1">Avg Revenue/Patient</div>
                                <div className="text-3xl font-bold text-gray-900">Rs. 1,280</div>
                                <div className="text-sm text-gray-600 mt-2">Consistent with budget</div>
                            </div>
                        </div>

                        {/* Monthly Financial Performance Table */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">📅 Monthly Financial Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left p-4 font-bold text-gray-600">Month</th>
                                            <th className="text-right p-4 font-bold text-gray-600">Revenue</th>
                                            <th className="text-right p-4 font-bold text-gray-600">Cost</th>
                                            <th className="text-right p-4 font-bold text-gray-600">Margin %</th>
                                            <th className="text-right p-4 font-bold text-gray-600">Patients</th>
                                            <th className="text-right p-4 font-bold text-gray-600">Rev/Patient</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlyFinancialTrend.map((item, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 hover:bg-blue-50 transition-colors">
                                                <td className="p-4 font-semibold text-gray-900">{item.month}</td>
                                                <td className="p-4 text-right font-medium">Rs. {(item.revenue).toLocaleString()}K</td>
                                                <td className="p-4 text-right text-gray-600">Rs. {(item.cost).toLocaleString()}K</td>
                                                <td className="p-4 text-right">
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold text-sm">
                                                        {item.margin}%
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right text-gray-600">{item.patients}</td>
                                                <td className="p-4 text-right font-bold text-blue-600">
                                                    Rs. {Math.round((item.revenue * 1000) / item.patients).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Payer Mix Revenue */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">💳 Revenue by Payer Mix</h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={payerMixRevenue}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="payer" />
                                        <YAxis yAxisId="left" label={{ value: 'Revenue (000s)', angle: -90, position: 'insideLeft' }} />
                                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Margin (%)', angle: 90, position: 'insideRight' }} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue (000s)" />
                                        <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={3} name="Margin (%)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Insights</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-blue-600">Rs. 18.5M</div>
                                        <div className="text-sm text-gray-600">Total Revenue</div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-green-600">18.5%</div>
                                        <div className="text-sm text-gray-600">Avg Margin</div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-purple-600">38%</div>
                                        <div className="text-sm text-gray-600">Out-of-Pocket</div>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <p className="text-sm text-gray-700">
                                            <strong>Strategy:</strong> International payer has highest margin (28%). Expand medical tourism program.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top DRGs */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">🏥 Top 10 DRGs (Diagnosis Related Groups) by Revenue</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                                            <th className="text-left p-4 font-bold">DRG</th>
                                            <th className="text-right p-4 font-bold">Volume</th>
                                            <th className="text-right p-4 font-bold">Revenue</th>
                                            <th className="text-right p-4 font-bold">Margin</th>
                                            <th className="text-right p-4 font-bold">Avg LOS</th>
                                            <th className="text-right p-4 font-bold">Rev/Case</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topDRGs.map((drg, idx) => (
                                            <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                                                <td className="p-4 font-semibold text-gray-900">{drg.drg}</td>
                                                <td className="p-4 text-right">{drg.volume}</td>
                                                <td className="p-4 text-right font-semibold text-green-600">Rs. {drg.revenue.toLocaleString()}</td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${drg.margin >= 20 ? 'bg-green-100 text-green-800' :
                                                        drg.margin >= 15 ? 'bg-blue-100 text-blue-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {drg.margin}%
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">{drg.los} days</td>
                                                <td className="p-4 text-right font-semibold">Rs. {(drg.revenue / drg.volume / 1000).toFixed(0)}K</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-gray-700">
                                    <strong>Insight:</strong> Major Joint Replacement is top revenue driver (Rs. 1.245M, 28% margin).
                                    Increase orthopedic surgery capacity to capture more volume.
                                </p>
                            </div>
                        </div>

                        {/* Cost per Case Benchmarking */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Cost per Case vs Industry Benchmark</h3>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={costPerCase} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="service" type="category" width={150} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="cost" fill="#3b82f6" name="Our Cost" />
                                    <Bar dataKey="benchmark" fill="#9ca3af" name="Industry Benchmark" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    <strong>Performance:</strong> We&apos;re beating industry benchmarks on ALL service lines.
                                    Average 5.8% cost advantage = Rs. 145K/month savings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* CLINICAL QUALITY TAB */}
                {activeTab === 'clinical' && (
                    <div className="space-y-6 slide-in">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 text-white shadow-premium">
                            <h2 className="text-3xl font-bold mb-2">Clinical Quality & Patient Safety Dashboard</h2>
                            <p className="text-red-100">Outcomes, safety metrics & continuous improvement</p>
                        </div>

                        {/* Clinical Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
                                <div className="text-sm text-gray-600 mb-1">Mortality Rate</div>
                                <div className="text-3xl font-bold text-gray-900">1.1%</div>
                                <div className="text-sm text-green-600 mt-2">📉 Reduced by 0.3%</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                                <div className="text-sm text-gray-600 mb-1">Infection Rate</div>
                                <div className="text-3xl font-bold text-gray-900">0.7%</div>
                                <div className="text-sm text-blue-600 mt-2">✓ Below national avg</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
                                <div className="text-sm text-gray-600 mb-1">Readmission (30-day)</div>
                                <div className="text-3xl font-bold text-gray-900">12.0%</div>
                                <div className="text-sm text-yellow-600 mt-2">Within target range</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                                <div className="text-sm text-gray-600 mb-1">Patient Satisfaction</div>
                                <div className="text-3xl font-bold text-gray-900">88%</div>
                                <div className="text-sm text-purple-600 mt-2">↑ Top tier ranking</div>
                            </div>
                        </div>

                        {/* Quality Metrics Trend */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">📈 Quality Metrics - 6 Month Trend</h3>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={qualityTrend}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="mortality" stroke="#ef4444" strokeWidth={3} name="Mortality Rate" />
                                    <Line type="monotone" dataKey="infection" stroke="#f59e0b" strokeWidth={3} name="Infection Rate" />
                                    <Line type="monotone" dataKey="readmission" stroke="#8b5cf6" strokeWidth={3} name="Readmission Rate" />
                                    <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} name="Satisfaction" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Patient Satisfaction Radar */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">⭐ Patient Satisfaction by Category</h3>
                                <ResponsiveContainer width="100%" height={400}>
                                    <RadarChart data={satisfactionByCategory}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="category" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                        <Radar name="Our Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                                        <Radar name="Benchmark" dataKey="benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                                        <Legend />
                                        <Tooltip />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">📋 Detailed Breakdown</h3>
                                <div className="space-y-3">
                                    {satisfactionByCategory.map((cat, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-gray-900">{cat.category}</span>
                                                <span className={`text-lg font-bold ${cat.score >= cat.benchmark ? 'text-green-600' : 'text-yellow-600'
                                                    }`}>
                                                    {cat.score}%
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${cat.score >= cat.benchmark ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                        style={{ width: `${cat.score}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">vs {cat.benchmark}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Readmission Analysis */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">🔄 30-Day Readmission Analysis by Diagnosis</h3>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={readmissionByDiagnosis}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="diagnosis" />
                                    <YAxis yAxisId="left" label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft' }} />
                                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Cost (000s)', angle: -90, position: 'insideRight' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="rate" fill="#ef4444" name="Readmission Rate (%)" />
                                    <Bar yAxisId="right" dataKey="cost" fill="#8b5cf6" name="Cost Impact (000s)" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-sm text-gray-700">
                                    <strong>Priority:</strong> Heart Failure has highest readmission rate (24.5%) costing Rs. 428K.
                                    Implement care transition program to reduce by  5pts = Rs. 85K savings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* OPERATIONAL TAB */}
                {activeTab === 'operational' && (
                    <div className="space-y-6 slide-in">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-8 text-white shadow-premium">
                            <h2 className="text-3xl font-bold mb-2">Operational Excellence Dashboard</h2>
                            <p className="text-orange-100">Efficiency metrics, throughput & process optimization</p>
                        </div>

                        {/* Operational Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
                                <div className="text-sm text-gray-600 mb-1">Bed Turnover Rate</div>
                                <div className="text-3xl font-bold text-gray-900">2.3 hrs</div>
                                <div className="text-sm text-green-600 mt-2">⚡ Improving speed</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                                <div className="text-sm text-gray-600 mb-1">Avg ER Wait Time</div>
                                <div className="text-3xl font-bold text-gray-900">32 min</div>
                                <div className="text-sm text-blue-600 mt-2">✓ Below 40m target</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
                                <div className="text-sm text-gray-600 mb-1">Surgery Start On-Time</div>
                                <div className="text-3xl font-bold text-gray-900">87%</div>
                                <div className="text-sm text-yellow-600 mt-2">⚠ Near 90% target</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                                <div className="text-sm text-gray-600 mb-1">Discharge &lt; Noon</div>
                                <div className="text-3xl font-bold text-gray-900">42%</div>
                                <div className="text-sm text-red-600 mt-2">↓ Lagging target (50%)</div>
                            </div>
                        </div>

                        {/* Operational Metrics List */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">⚙️ Detailed Operational Efficiency Metrics</h3>
                            <div className="space-y-4">
                                {operationalMetrics.map((metric, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-6 card-hover">
                                        <div className="grid grid-cols-6 gap-4 items-center">
                                            <div className="col-span-2">
                                                <div className="font-bold text-gray-900 text-lg">{metric.metric}</div>
                                                <div className="text-sm text-gray-600">Impact:
                                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${metric.impact === 'High' ? 'bg-red-100 text-red-800' :
                                                        metric.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {metric.impact}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                                                <div className="text-sm text-gray-600">{metric.unit}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">{metric.target}</div>
                                                <div className="text-sm text-gray-600">Target</div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1">
                                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                                            <div
                                                                className={`h-3 rounded-full ${metric.trend === 'improving' ? 'bg-green-500' :
                                                                    metric.trend === 'stable' ? 'bg-blue-500' :
                                                                        'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <span className={`text-sm font-bold ${metric.trend === 'improving' ? 'text-green-600' :
                                                        metric.trend === 'stable' ? 'text-blue-600' :
                                                            'text-red-600'
                                                        }`}>
                                                        {metric.trend === 'improving' ? '↑ Improving' :
                                                            metric.trend === 'stable' ? '→ Stable' :
                                                                '↓ Declining'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* LOS Analysis */}
                        <div className="bg-white rounded-2xl shadow-premium p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Length of Stay (LOS) Analysis by Department</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
                                            <th className="text-left p-4 font-bold">Department</th>
                                            <th className="text-right p-4 font-bold">Target LOS</th>
                                            <th className="text-right p-4 font-bold">Actual LOS</th>
                                            <th className="text-right p-4 font-bold">Variance</th>
                                            <th className="text-right p-4 font-bold">Volume</th>
                                            <th className="text-center p-4 font-bold">Performance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {losAnalysis.map((dept, idx) => (
                                            <tr key={idx} className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                                                <td className="p-4 font-semibold text-gray-900">{dept.department}</td>
                                                <td className="p-4 text-right">{dept.target} days</td>
                                                <td className="p-4 text-right font-semibold">{dept.actual} days</td>
                                                <td className="p-4 text-right">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${dept.variance <= 0 ? 'bg-green-100 text-green-800' :
                                                        dept.variance <= 0.3 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {dept.variance > 0 ? '+' : ''}{dept.variance} days
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">{dept.volume}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${dept.variance <= 0 ? 'bg-green-100 text-green-800' :
                                                        dept.variance <= 0.3 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                        {dept.variance <= 0 ? '✓ Exceeding' :
                                                            dept.variance <= 0.3 ? '→ On Track' :
                                                                '⚠ At Risk'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-sm text-gray-700">
                                    <strong>Opportunity:</strong> Orthopedics 0.5 days over target. Reduce to target = 78 bed days saved/month = capacity for 12 more patients.
                                </p>
                            </div>
                        </div>

                        {/* ED Metrics */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">🚑 Emergency Department Performance</h3>
                                <div className="space-y-4">
                                    <div className="bg-red-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">Total Visits</span>
                                            <span className="text-3xl font-bold text-red-600">{edMetrics.totalVisits}</span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">Admit Rate</span>
                                            <span className="text-3xl font-bold text-blue-600">{edMetrics.admitRate}%</span>
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">LWBS Rate</span>
                                            <span className="text-3xl font-bold text-yellow-600">{edMetrics.lwbs}%</span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">Fast Track %</span>
                                            <span className="text-3xl font-bold text-green-600">{edMetrics.fastTrackPercent}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow-premium p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Severity Distribution</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'Trauma', value: edMetrics.severity.trauma, fill: '#ef4444' },
                                                { name: 'Urgent', value: edMetrics.severity.urgent, fill: '#f59e0b' },
                                                { name: 'Semi-Urgent', value: edMetrics.severity.semiUrgent, fill: '#eab308' },
                                                { name: 'Non-Urgent', value: edMetrics.severity.nonUrgent, fill: '#22c55e' }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value }) => `${name}: ${value}%`}
                                            outerRadius={100}
                                            dataKey="value"
                                        >
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* EXISTING TABS */}
                {activeTab === 'patients' && <PatientDemographics />}
                {activeTab === 'workforce' && <StaffProductivity />}
                {activeTab === 'resources' && <ResourceUtilization />}
            </div>

            {/* Prismo AI Assistant - The Chat Above All Charts */}
            <PrismoChatbot />
        </div>
    )
}
