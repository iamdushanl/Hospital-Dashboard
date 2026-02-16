'use client'

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
    ageDistribution,
    insuranceDistribution,
    geographicDistribution,
    topDiagnoses
} from '../data/enhancedMockData'

export default function PatientDemographics() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-3xl font-bold">Patient Analytics Dashboard</h2>
                <p className="text-blue-100 mt-2">Comprehensive demographic insights and population health trends</p>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                    <div className="text-sm text-gray-600 mb-1">Total Patients</div>
                    <div className="text-3xl font-bold text-gray-900">1,245</div>
                    <div className="text-sm text-green-600 mt-2">↑ 12% vs last month</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-500">
                    <div className="text-sm text-gray-600 mb-1">Average Age</div>
                    <div className="text-3xl font-bold text-gray-900">48.2</div>
                    <div className="text-sm text-gray-600 mt-2">Years old</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                    <div className="text-sm text-gray-600 mb-1">Gender Ratio</div>
                    <div className="text-3xl font-bold text-gray-900">45:55</div>
                    <div className="text-sm text-gray-600 mt-2">Male : Female</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-pink-500">
                    <div className="text-sm text-gray-600 mb-1">Readmission Risk</div>
                    <div className="text-3xl font-bold text-gray-900">14.2%</div>
                    <div className="text-sm text-red-600 mt-2">↑ 1.2% moderate risk</div>
                </div>
            </div>

            {/* Age Distribution & Insurance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Distribution Pyramid */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Age & Gender Distribution</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={ageDistribution} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[-120, 120]} />
                            <YAxis dataKey="ageGroup" type="category" width={60} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="male" fill="#3b82f6" name="Male" stackId="stack" />
                            <Bar dataKey="female" fill="#ec4899" name="Female" stackId="stack" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-700">
                            <strong>Insight:</strong> Largest patient group is 41-50 years (21.7%), reflecting aging population trends in Sri Lanka.
                        </p>
                    </div>
                </div>

                {/* Insurance Distribution */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🏥 Insurance Mix (Sri Lankan Context)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={insuranceDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {insuranceDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {insuranceDistribution.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span>{item.type}</span>
                                </div>
                                <span className="font-semibold">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🗺️ Geographic Distribution (Top 10 Sri Lankan Districts)</h3>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={geographicDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="district" />
                        <YAxis yAxisId="left" label={{ value: 'Patients', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue (Rs. 000s)', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="patients" fill="#8b5cf6" name="Patients" />
                        <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Revenue (000s)" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-700">
                        <strong>Strategy:</strong> 34.2% of patients from Colombo district. Consider satellite clinic in Gampaha (19.8%)
                        and Kandy (15.6%) for market expansion.
                    </p>
                </div>
            </div>

            {/* Top 10 Diagnoses */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏥 Top 10 Diagnoses (Case Mix Analysis)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold">Diagnosis</th>
                                <th className="text-right p-3 font-semibold">Count</th>
                                <th className="text-right p-3 font-semibold">% of Total</th>
                                <th className="text-right p-3 font-semibold">Avg LOS</th>
                                <th className="text-right p-3 font-semibold">Avg Cost (Rs.)</th>
                                <th className="text-center p-3 font-semibold">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topDiagnoses.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3 font-semibold text-gray-900">{item.diagnosis}</td>
                                    <td className="p-3 text-right">{item.count}</td>
                                    <td className="p-3 text-right">{((item.count / 1000) * 100).toFixed(1)}%</td>
                                    <td className="p-3 text-right">{item.avgLOS} days</td>
                                    <td className="p-3 text-right">Rs. {item.cost.toLocaleString()}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${idx % 3 === 0 ? 'bg-green-100 text-green-800' :
                                            idx % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                            {idx % 3 === 0 ? '↑ Rising' : idx % 3 === 1 ? '→ Stable' : '↓ Declining'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-700">
                        <strong>Sri Lankan Context:</strong> Dengue (112 cases) and Diabetes (156 cases) are major drivers.
                        Consider specialized dengue management protocol and diabetes prevention program.
                    </p>
                </div>
            </div>

            {/* Language & Ethnicity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🗣️ Language Preference</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold">Sinhala</span>
                                <span className="text-sm font-semibold">52%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-orange-500 h-3 rounded-full" style={{ width: '52%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold">Tamil</span>
                                <span className="text-sm font-semibold">28%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-red-500 h-3 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold">English</span>
                                <span className="text-sm font-semibold">20%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-sm text-gray-700">
                            <strong>Action:</strong> Ensure tri-lingual signage and staff coverage for all shifts.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">👥 Nationality Breakdown</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold">Sri Lankan Citizens</span>
                                <span className="text-sm font-semibold">91.1%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full" style={{ width: '91.1%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold">Medical Tourism (Foreign)</span>
                                <span className="text-sm font-semibold">8.9%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '8.9%' }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt flex gap-3">
                        <div className="flex-1 text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">89</div>
                            <div className="text-xs text-gray-600">Foreign Patients</div>
                        </div>
                        <div className="flex-1 text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">18%</div>
                            <div className="text-xs text-gray-600">YoY Growth</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
