"use client";

import React, { useState } from "react";
import { JSX } from "react/jsx-dev-runtime";

// Default export React component (TypeScript)
// Tailwind is used for styling. This is a single-file dashboard UI mock for the 8-step workflow.

type Sensor = {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "ok" | "warning" | "critical";
};

const mockSensors: Sensor[] = [
  { id: "s1", name: "Soil Moisture (Field A)", value: 32, unit: "%", status: "warning" },
  { id: "s2", name: "Soil Temp (Field A)", value: 24, unit: "°C", status: "ok" },
  { id: "s3", name: "Tank Level", value: 75, unit: "%", status: "ok" },
];

export default function AgroDashboard(): JSX.Element {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [selectedField, setSelectedField] = useState<string>("Field A");
  const [selectedCrop, setSelectedCrop] = useState<string>("Rice");
  const [irrigationOn, setIrrigationOn] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<string[]>([
    "Low moisture in Field A",
    "Tank scheduled refill at 18:00",
  ]);

  function toggleIrrigation() {
    setIrrigationOn((v) => !v);
    const note = irrigationOn ? "Irrigation stopped manually" : "Irrigation started manually";
    setAlerts((a) => [note, ...a].slice(0, 6));
  }

  function simulateSensorChange() {
    // simple mock: randomly change a sensor value
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id === "s1") {
          const newVal = Math.max(10, Math.min(90, s.value + (Math.random() * 10 - 5)));
          const status: Sensor["status"] = newVal < 30 ? "warning" : "ok";
          return { ...s, value: Math.round(newVal), status };
        }
        return s;
      })
    );
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-gray-900">
      <header className="mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AgroSikkim</h1>
              <p className="text-sm text-gray-600">Farm Remote Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
            <button
              onClick={simulateSensorChange}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Simulate Sensors
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left column: map + crop selection */}
        <section className="col-span-8 space-y-6">
          {/* Map Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Crop Selection & Field Map
                </h2>
                <p className="text-sm text-gray-600 mt-1">Monitor field conditions and select crops</p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedField}
                  onChange={(e) => setSelectedField(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option>Field A - North Sector</option>
                  <option>Field B - Valley Area</option>
                  <option>Field C - Hill Slope</option>
                </select>

                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option>🌾 Rice</option>
                  <option>🌻 Wheat</option>
                  <option>🌽 Maize</option>
                  <option>🥔 Potato</option>
                </select>
              </div>
            </div>

            <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Interactive Field Map</p>
                <p className="text-sm text-gray-500 mt-1">Integrate with Mapbox/Leaflet for real-time tracking</p>
              </div>
            </div>
          </div>

          {/* Sensor Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Sensor Activation Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Sensor Activation
                </h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">6 Active</span>
              </div>
              
              <div className="space-y-3">
                {sensors.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        s.status === "ok" ? "bg-green-500" : 
                        s.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                      }`}></div>
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-gray-500">{s.value}{s.unit}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === "ok" ? "bg-green-100 text-green-700" : 
                        s.status === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tank Monitoring Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Water Tank
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Monitoring</span>
              </div>
              
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative">
                  {/* Tank Visualization */}
                  <div className="w-32 h-40 bg-gray-200 rounded-t-lg rounded-b-sm border-4 border-gray-300 relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-600 transition-all duration-500"
                      style={{ height: `${sensors.find((s) => s.id === "s3")!.value}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-2xl font-bold text-blue-600">{sensors.find((s) => s.id === "s3")!.value}%</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Crop DB & Irrigation Advice */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                  Smart Irrigation
                </h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-2">Recommendations for {selectedCrop}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Optimal moisture:</span>
                      <span className="font-medium">40–60%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next irrigation:</span>
                      <span className="font-medium">18:00 Today</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">15 minutes</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50/50 rounded-lg p-3">
                  <div className="text-xs text-green-700 font-medium">💡 Smart Tip</div>
                  <div className="text-xs text-green-600 mt-1">Ideal conditions detected for automated watering cycle</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right column: controls, alerts, yield */}
        <aside className="col-span-4 space-y-6">
          {/* Irrigation Control */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Irrigation Control
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                <div>
                  <div className="font-medium">Field A Zone 1</div>
                  <div className="text-sm text-gray-600">Status: <span className={irrigationOn ? "text-green-600 font-medium" : "text-gray-600"}>
                    {irrigationOn ? "Active" : "Inactive"}
                  </span></div>
                </div>
                <button
                  onClick={toggleIrrigation}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    irrigationOn 
                      ? "bg-red-500 hover:bg-red-600 text-white" 
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {irrigationOn ? "Stop" : "Start"}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-50/50 rounded-lg text-sm font-medium hover:bg-blue-100/50 transition-colors">
                  Schedule
                </button>
                <button className="p-3 bg-blue-50/50 rounded-lg text-sm font-medium hover:bg-blue-100/50 transition-colors">
                  Zones Setup
                </button>
              </div>
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                System Alerts
              </h3>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{alerts.length} New</span>
            </div>
            
            <div className="h-48 space-y-2 overflow-y-auto">
              {alerts.length > 0 ? (
                alerts.map((a, idx) => (
                  <div key={idx} className="p-3 bg-orange-50/50 border-l-4 border-orange-500 rounded-r-lg">
                    <div className="text-sm font-medium">Alert</div>
                    <div className="text-xs text-gray-600 mt-1">{a}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-sm">All systems operational</div>
                </div>
              )}
            </div>
            
            {alerts.length > 0 && (
              <button
                onClick={() => setAlerts([])}
                className="w-full mt-3 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50/50 transition-colors text-sm"
              >
                Clear All Alerts
              </button>
            )}
          </div>

          {/* Yield Summary */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Yield Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+6%</div>
                  <div className="text-xs text-gray-600">Yield Increase</div>
                </div>
                <div className="text-center p-3 bg-blue-50/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">25%</div>
                  <div className="text-xs text-gray-600">Water Saved</div>
                </div>
              </div>
              
              <div className="bg-gray-50/50 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Weekly Progress</span>
                  <span className="font-medium">68% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Quick Actions
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </button>
              <button className="p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                Remote Control
              </button>
              <button className="p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Schedule Fill
              </button>
              <button className="p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white">
          AgroSikkim Farm Management System • Last updated: {new Date().toLocaleDateString()} • 
          <span className="text-green-600 font-medium ml-1">All systems operational</span>
        </div>
      </footer>
    </div>
  );
}
