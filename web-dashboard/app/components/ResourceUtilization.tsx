'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import {
    bedUtilizationByWard,
    orUtilizationByHour,
    equipmentUtilization,
    highCostConsumables
} from '../data/enhancedMockData'

export default function ResourceUtilization() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-3xl font-bold">Resource Utilization Analytics</h2>
                <p className="text-purple-100 mt-2">Maximize asset ROI and operational efficiency</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
                    <div className="text-sm text-gray-600 mb-1">Overall Bed Utilization</div>
                    <div className="text-3xl font-bold text-gray-900">78.5%</div>
                    <div className="text-sm text-yellow-600 mt-2">Target: 85%</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
                    <div className="text-sm text-gray-600 mb-1">OR Utilization</div>
                    <div className="text-3xl font-bold text-gray-900">82%</div>
                    <div className="text-sm text-yellow-600 mt-2">Target: 90%</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
                    <div className="text-sm text-gray-600 mb-1">Equipment Revenue</div>
                    <div className="text-3xl font-bold text-gray-900">Rs. 2.87M</div>
                    <div className="text-sm text-green-600 mt-2">8.5% vs last month</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
                    <div className="text-sm text-gray-600 mb-1">Consumables Waste</div>
                    <div className="text-3xl font-bold text-gray-900">4.2%</div>
                    <div className="text-sm text-red-600 mt-2">Target: &lt; 3%</div>
                </div>
            </div>

            {/* Bed Utilization by Ward */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900">Bed Utilization by Ward</h3>
                <p className="text-sm text-gray-500 mb-4">Occupancy rates and turnover times per ward</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold">Ward</th>
                                <th className="text-right p-3 font-semibold">Total Beds</th>
                                <th className="text-right p-3 font-semibold">Occupied</th>
                                <th className="text-center p-3 font-semibold">Utilization</th>
                                <th className="text-right p-3 font-semibold">Turnover Time (hrs)</th>
                                <th className="text-right p-3 font-semibold">Blocked Beds</th>
                                <th className="text-center p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bedUtilizationByWard.map((ward, idx) => {
                                const utilization = (ward.occupied / ward.beds) * 100;
                                return (
                                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 font-semibold text-gray-900">{ward.ward}</td>
                                        <td className="p-3 text-right">{ward.beds}</td>
                                        <td className="p-3 text-right font-semibold">{ward.occupied}</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${utilization >= 85 ? 'bg-green-500' :
                                                            utilization >= 70 ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                            }`}
                                                        style={{ width: `${utilization}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold">{utilization.toFixed(0)}%</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-right">{ward.turnoverTime}</td>
                                        <td className="p-3 text-right">
                                            {ward.blockedBeds > 0 ? (
                                                <span className="text-red-600 font-semibold">{ward.blockedBeds}</span>
                                            ) : (
                                                <span className="text-green-600">0</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${utilization >= 85 && ward.blockedBeds === 0 ? 'bg-green-100 text-green-800' :
                                                utilization >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {utilization >= 85 && ward.blockedBeds === 0 ? 'Optimal' :
                                                    utilization >= 70 ? 'Fair' : 'Low'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-700">
                        <strong>Opportunity:</strong> Orthopedics (79%) and Pediatrics (75%) are underutilized.
                        Market these services to increase occupancy to 85% target.
                    </p>
                </div>
            </div>

            {/* OR Utilization Heatmap */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900">Operating Room Utilization (Hourly)</h3>
                <p className="text-sm text-gray-500 mb-4">Hourly utilization rates for operating rooms</p>
                <div className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 mb-3">Chart Topic: Hourly OR Utilization by Operating Room</div>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={orUtilizationByHour}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="or1" fill="#3b82f6" name="OR 1" />
                        <Bar dataKey="or2" fill="#10b981" name="OR 2" />
                        <Bar dataKey="or3" fill="#f59e0b" name="OR 3" />
                        <Bar dataKey="or4" fill="#8b5cf6" name="OR 4" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">OR 1</div>
                        <div className="text-xs text-gray-600">Avg: 91%</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">OR 2</div>
                        <div className="text-xs text-gray-600">Avg: 89%</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">OR 3</div>
                        <div className="text-xs text-gray-600">Avg: 87%</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">OR 4</div>
                        <div className="text-xs text-gray-600">Avg: 82%</div>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                        <strong>Insight:</strong> Peak utilization at 10-11 AM (95-100%). OR 4 underperforms (82%).
                        Review scheduling efficiency and surgeon availability.
                    </p>
                </div>
            </div>

            {/* Equipment Utilization */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900">Equipment Utilization & Revenue</h3>
                <p className="text-sm text-gray-500 mb-4">Usage rates and revenue generation for key medical equipment</p>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-300">
                                <th className="text-left p-3 font-semibold">Equipment</th>
                                <th className="text-center p-3 font-semibold">Utilization</th>
                                <th className="text-right p-3 font-semibold">Target</th>
                                <th className="text-right p-3 font-semibold">Revenue (Rs.)</th>
                                <th className="text-right p-3 font-semibold">Downtime (hrs)</th>
                                <th className="text-center p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentUtilization.map((equip, idx) => (
                                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3 font-semibold text-gray-900">{equip.equipment}</td>
                                    <td className="p-3">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full ${equip.utilization >= equip.target ? 'bg-green-500' :
                                                        equip.utilization >= equip.target * 0.9 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${equip.utilization}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-semibold w-12">{equip.utilization}%</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-right text-gray-600">{equip.target}%</td>
                                    <td className="p-3 text-right font-semibold text-green-600">
                                        {equip.revenue.toLocaleString()}
                                    </td>
                                    <td className="p-3 text-right">
                                        <span className={equip.downtime > 15 ? 'text-red-600 font-semibold' : ''}>
                                            {equip.downtime}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${equip.utilization >= equip.target ? 'bg-green-100 text-green-800' :
                                            equip.utilization >= equip.target * 0.9 ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {equip.utilization >= equip.target ? 'Meeting Target' :
                                                equip.utilization >= equip.target * 0.9 ? 'Near Target' : 'Below Target'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-gray-700">
                        <strong>Revenue Opportunity:</strong> MRI utilization at 71% (target: 80%). Increase utilization by 9% =
                        additional Rs. 48,000/month. Extend hours or add mobile MRI service.
                    </p>
                </div>
            </div>

            {/* High-Cost Consumables - Pareto Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900">High-Cost Consumables (Pareto Analysis)</h3>
                <p className="text-sm text-gray-500 mb-4">Analysis of high-cost items and waste rates</p>
                <div className="inline-flex items-center rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 mb-3">Chart Topic: Consumable Cost and Waste Rate by Item</div>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={highCostConsumables}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="item" angle={-20} textAnchor="end" height={120} />
                        <YAxis yAxisId="left" label={{ value: 'Monthly Cost (Rs. 000s)', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Waste Rate %', angle: 90, position: 'insideRight' }} />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="monthlyCost" name="Monthly Cost (Rs.)" >
                            {highCostConsumables.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index < 3 ? '#ef4444' : index < 6 ? '#f59e0b' : '#3b82f6'} />
                            ))}
                        </Bar>
                        <Bar yAxisId="right" dataKey="wasteRate" fill="#8b5cf6" name="Waste Rate %" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-red-50 rounded-lg text-center border-l-4 border-red-500">
                            <div className="text-2xl font-bold text-red-600">Rs. 3.15M</div>
                            <div className="text-xs text-gray-600">Top 3 Items (62%)</div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg text-center border-l-4 border-yellow-500">
                            <div className="text-2xl font-bold text-yellow-600">4.8%</div>
                            <div className="text-xs text-gray-600">Avg Waste Rate</div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-center border-l-4 border-blue-500">
                            <div className="text-2xl font-bold text-blue-600">Rs. 240K</div>
                            <div className="text-xs text-gray-600">Potential Savings</div>
                        </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-gray-700">
                            <strong>Critical:</strong> Top 3 items (Cardiac Stents, Orthopedic Implants, IV Antibiotics) = 62% of consumable costs.
                            Negotiate better contracts. Contrast Media has 6.8% waste—improve inventory management.
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Actions */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Priority Actions for Resource Optimization</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl text-purple-700">1</span>
                        <div>
                            <p className="font-semibold text-gray-900">Increase Bed Utilization</p>
                            <p className="text-sm text-gray-700">Target Orthopedics and Pediatrics for marketing. Reduce bed turnover time from 2.3hrs to &lt; 2hrs.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl text-purple-700">2</span>
                        <div>
                            <p className="font-semibold text-gray-900">OR Efficiency Improvement</p>
                            <p className="text-sm text-gray-700">OR 4 underperforming at 82%. Review first-case-on-time-starts (FCOTS) and surgeon scheduling.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl text-purple-700">3</span>
                        <div>
                            <p className="font-semibold text-gray-900">Equipment Utilization</p>
                            <p className="text-sm text-gray-700">MRI at 71% - extend hours. Mammography at 65% - run community screening campaigns.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-2xl text-purple-700">4</span>
                        <div>
                            <p className="font-semibold text-gray-900">Cost Reduction</p>
                            <p className="text-sm text-gray-700">Reduce consumables waste from 4.8% to &lt; 3% = Rs. 240K savings/month. Focus on high-waste items.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
