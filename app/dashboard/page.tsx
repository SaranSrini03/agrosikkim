"use client";

import React, { useState } from "react";
import { JSX } from "react/jsx-dev-runtime";

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

  // New state for motor run
  const [motorRuntime, setMotorRuntime] = useState<number>(0); // in minutes
  const [waterSupplied, setWaterSupplied] = useState<number>(0); // %
  const [totalWater, setTotalWater] = useState<number>(100); // total water available %

  function toggleIrrigation() {
    if (irrigationOn) {
      // Stopping the motor
      const duration = Math.floor(Math.random() * 15 + 5); // simulate runtime 5-20 mins
      setMotorRuntime(duration);
      const supplied = Math.min(totalWater, waterSupplied + duration); // simple simulation
      setWaterSupplied(supplied);
    }
    setIrrigationOn((v) => !v);

    const note = irrigationOn ? "Irrigation stopped manually" : "Irrigation started manually";
    setAlerts((a) => [note, ...a].slice(0, 6));
  }

  function simulateSensorChange() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6 text-gray-900">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AgroSikkim</h1>
                <p className="text-xs sm:text-sm text-gray-600">Farm Remote Dashboard</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 sm:py-2 rounded-lg border border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium">Connected</span>
              </div>
              <button
                onClick={simulateSensorChange}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Simulate Sensors
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left column: map + crop selection */}
          <section className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Map Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Crop Selection & Field Map
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Monitor field conditions and select crops</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  >
                    <option>Field A - North Sector</option>
                    <option>Field B - Valley Area</option>
                    <option>Field C - Hill Slope</option>
                  </select>

                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  >
                    <option>🌾 Rice</option>
                    <option>🌻 Wheat</option>
                    <option>🌽 Maize</option>
                    <option>🥔 Potato</option>
                  </select>
                </div>
              </div>

              <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                <div className="text-center relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">Interactive Field Map</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Integrate with Mapbox/Leaflet for real-time tracking</p>
                </div>
              </div>
            </div>

            {/* Sensor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* Sensor Activation Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    Sensor Activation
                  </h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">6 Active</span>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {sensors.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                          s.status === "ok" ? "bg-green-500" : 
                          s.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-medium truncate">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.value}{s.unit}</div>
                        </div>
                      </div>
                      <div className="text-sm shrink-0 ml-2">
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
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    Water Tank
                  </h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{sensors.find(s => s.name === "Tank Level")?.value}%</span>
                </div>
                <div className="relative h-24 sm:h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-500"
                    style={{ height: `${sensors.find(s => s.name === "Tank Level")?.value}%` }}
                  ></div>
                </div>
              </div>

              {/* Irrigation Control Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z" />
                    </svg>
                    Irrigation Control
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${irrigationOn ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {irrigationOn ? "Running" : "Stopped"}
                  </span>
                </div>
                <button
                  onClick={toggleIrrigation}
                  className={`w-full py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                    irrigationOn ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {irrigationOn ? "Stop Irrigation" : "Start Irrigation"}
                </button>

                {/* Display motor runtime & water stats */}
                {!irrigationOn && motorRuntime > 0 && (
                  <div className="mt-3 p-2 bg-blue-50/50 rounded-lg text-xs sm:text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Motor Run Duration:</span>
                      <span className="font-medium">{motorRuntime} mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Water Supplied:</span>
                      <span className="font-medium">{waterSupplied}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Water:</span>
                      <span className="font-medium">{Math.max(0, totalWater - waterSupplied)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right column: Alerts */}
          <aside className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white p-4 sm:p-6">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Alerts & Notifications</h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map((a, i) => (
                  <li key={i} className="text-xs sm:text-sm p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">{a}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
