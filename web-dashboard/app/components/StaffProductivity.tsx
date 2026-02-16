'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
    staffProductivity,
    departmentWorkforce,
    staffTurnoverTrend
} from '../data/enhancedMockData'

export default function StaffProductivity() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-3xl font-bold">Staff Productivity & Workforce Analytics</h2>
                <p className="text-green-100 mt-2">Optimize human resources and identify training needs</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                    <div className="text-sm text-gray-600 mb-1">Total Staff</div>
                    <div className="text-3xl font-bold text-gray-900">487</div>
                    <div className="text-sm text-gray-600 mt-2">Doctors: 68 | Nurses: 142</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                    <div className="text-sm text-gray-600 mb-1">Avg Patients/Doctor/Day</div>
                    <div className="text-3xl font-bold text-gray-900">21.3</div>
                    <div className="text-sm text-green-600 mt-2">↑ 5% efficiency gain</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
                    <div className="text-sm text-gray-600 mb-1">Turnover Rate (Annual)</div>
                    <div className="text-3xl font-bold text-gray-900">7.2%</div>
                    <div className="text-sm text-yellow-600 mt-2">Industry avg: 9.5%</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
                    <div className="text-sm text-gray-600 mb-1">Total Overtime Hours</div>
                    <div className="text-3xl font-bold text-gray-900">1,247</div>
                    <div className="text-sm text-red-600 mt-2">↑ 12% vs last month</div>
                </div>
            </div>

            {/* Doctor Productivity Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Doctor Productivity Leaderboard</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold">Rank</th>
                                <th className="text-left p-3 font-semibold">Doctor Name</th>
                                <th className="text-left p-3 font-semibold">Specialty</th>
                                <th className="text-left p-3 font-semibold">Department</th>
                                <th className="text-right p-3 font-semibold">Patients/Day</th>
                                <th className="text-right p-3 font-semibold">Revenue (Rs.)</th>
                                <th className="text-center p-3 font-semibold">Satisfaction</th>
                                <th className="text-center p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffProductivity
                                .sort((a, b) => b.revenue - a.revenue)
                                .map((doc, idx) => (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${idx === 0 ? 'bg-yellow-100 text-yellow-800' :
                                                    idx === 1 ? 'bg-gray-100 text-gray-800' :
                                                        idx === 2 ? 'bg-orange-100 text-orange-800' :
                                                            'bg-blue-50 text-blue-800'
                                                }`}>
                                                {idx + 1}
                                            </span>
                                        </td>
                                        <td className="p-3 font-semibold text-gray-900">{doc.name}</td>
                                        <td className="p-3 text-gray-700">{doc.specialty}</td>
                                        <td className="p-3 text-gray-700">{doc.department}</td>
                                        <td className="p-3 text-right font-semibold">{doc.patientsPerDay}</td>
                                        <td className="p-3 text-right font-semibold text-green-600">
                                            Rs. {doc.revenue.toLocaleString()}
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${doc.satisfaction >= 90 ? 'bg-green-500' :
                                                                doc.satisfaction >= 85 ? 'bg-blue-500' :
                                                                    'bg-yellow-500'
                                                            }`}
                                                        style={{ width: `${doc.satisfaction}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold">{doc.satisfaction}%</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${doc.satisfaction >= 90 && doc.revenue > 100000 ? 'bg-green-100 text-green-800' :
                                                    doc.satisfaction >= 85 ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {doc.satisfaction >= 90 && doc.revenue > 100000 ? '⭐ Top Performer' :
                                                    doc.satisfaction >= 85 ? '✓ Good' : '→ Average'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-gray-700">
                        <strong>Insight:</strong> Dr. Rajapaksa (Oncology) generates highest revenue (Rs. 145,000)
                        with 93% satisfaction. Consider expanding oncology services.
                    </p>
                </div>
            </div>

            {/* Nursing Workforce Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">👩‍⚕️ Nursing Workforce by Department</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold">Department</th>
                                <th className="text-right p-3 font-semibold">Current Nurses</th>
                                <th className="text-right p-3 font-semibold">Target</th>
                                <th className="text-center p-3 font-semibold">Staffing Level</th>
                                <th className="text-right p-3 font-semibold">Nurse:Patient Ratio</th>
                                <th className="text-right p-3 font-semibold">Overtime (hrs)</th>
                                <th className="text-right p-3 font-semibold">Turnover %</th>
                                <th className="text-center p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departmentWorkforce.map((dept, idx) => {
                                const staffingPercent = (dept.nurses / dept.targetNurses) * 100;
                                return (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 font-semibold text-gray-900">{dept.department}</td>
                                        <td className="p-3 text-right">{dept.nurses}</td>
                                        <td className="p-3 text-right">{dept.targetNurses}</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${staffingPercent >= 95 ? 'bg-green-500' :
                                                                staffingPercent >= 85 ? 'bg-yellow-500' :
                                                                    'bg-red-500'
                                                            }`}
                                                        style={{ width: `${Math.min(staffingPercent, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold">{staffingPercent.toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-right font-semibold">1:{dept.nursePatientRatio.toFixed(1)}</td>
                                        <td className="p-3 text-right">{dept.overtimeHours}</td>
                                        <td className="p-3 text-right">{dept.turnoverRate}%</td>
                                        <td className="p-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${staffingPercent >= 95 && dept.overtimeHours < 100 ? 'bg-green-100 text-green-800' :
                                                    staffingPercent >= 85 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                }`}>
                                                {staffingPercent >= 95 && dept.overtimeHours < 100 ? '✓ Optimal' :
                                                    staffingPercent >= 85 ? '⚠ Understaffed' : '🚨 Critical'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm text-gray-700">
                        <strong>Critical:</strong> Emergency and ICU departments are understaffed with high overtime.
                        Hire 4 additional nurses immediately to prevent burnout.
                    </p>
                </div>
            </div>

            {/* Staff Turnover Trend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">📉 Staff Turnover Trend (6 Months)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={staffTurnoverTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="doctors" stroke="#3b82f6" strokeWidth={2} name="Doctors" />
                        <Line type="monotone" dataKey="nurses" stroke="#10b981" strokeWidth={2} name="Nurses" />
                        <Line type="monotone" dataKey="support" stroke="#f59e0b" strokeWidth={2} name="Support Staff" />
                        <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="Total" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">2.1%</div>
                        <div className="text-xs text-gray-600">Doctor Turnover</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">5.8%</div>
                        <div className="text-xs text-gray-600">Nurse Turnover</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">7.2%</div>
                        <div className="text-xs text-gray-600">Overall Turnover</div>
                    </div>
                </div>
            </div>

            {/* Key Insights & Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Key Insights & Recommended Actions</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                            <p className="font-semibold text-gray-900">High Revenue Generators</p>
                            <p className="text-sm text-gray-700">Oncology, Cardiology, and General Surgery drive most revenue. Expand these services.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <p className="font-semibold text-gray-900">Staffing Gaps</p>
                            <p className="text-sm text-gray-700">Emergency and ICU need 4-6 additional nurses. High overtime indicates burnout risk.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">📊</span>
                        <div>
                            <p className="font-semibold text-gray-900">Satisfaction Monitoring</p>
                            <p className="text-sm text-gray-700">Dr. Mendis (Emergency) has lowest satisfaction (84%). Conduct feedback session.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
