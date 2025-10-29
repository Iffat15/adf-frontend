// import { useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import Navbar from './Navbar';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('overview');

//   const kpis = [
//     { label: 'Total Pipelines', value: 128, color: 'border-cyan-400' },
//     { label: 'Success Rate', value: '92%', color: 'border-green-400' },
//     { label: 'Avg Execution Time', value: '8.4s', color: 'border-purple-400' },
//     { label: 'Failed Pipelines', value: 10, color: 'border-red-400' },
//   ];

//   const chartData = {
//     labels: ['Pipeline A', 'Pipeline B', 'Pipeline C', 'Pipeline D'],
//     datasets: [
//       {
//         label: 'Execution Time (ms)',
//         data: [8420, 10200, 6700, 9100],
//         backgroundColor: 'rgba(0, 255, 255, 0.6)',
//         borderColor: 'rgba(0, 255, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="flex h-screen bg-[#0d0d0d] text-white font-sans">
//       <Navbar/>
//       {/* Sidebar */}
//       <aside className="w-64 bg-[#1a1a1a] border-r border-[#00ffff] p-6 flex flex-col">
//         {/* <h2 className="text-2xl font-semibold text-[#00ffff] mb-8 tracking-wide">OrchPulse</h2> */}
//         {['overview', 'nodes', 'pipelines'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`mb-4 px-4 py-2 rounded-lg text-left transition-all duration-200 tracking-wide ${
//               activeTab === tab
//                 ? 'bg-[#00ffff] text-black font-semibold'
//                 : 'hover:bg-[#00ffff33] text-white'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-auto">
//         <h1 className="text-3xl font-semibold text-[#00ffff] mb-8 tracking-wide">Dashboard Overview</h1>

//         {/* KPI Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {kpis.map((kpi, index) => (
//             <div
//               key={index}
//               className={`p-6 rounded-xl shadow-lg bg-[#1a1a1a] border-2 ${kpi.color} hover:scale-[1.02] transition-transform`}
//             >
//               <h3 className="text-lg font-medium mb-2 text-gray-300">{kpi.label}</h3>
//               <p className="text-3xl font-bold text-white">{kpi.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Chart Section */}
//         <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-[#00ffff]">
//           <h2 className="text-xl font-semibold text-[#00ffff] mb-4 tracking-wide">Pipeline Execution Times</h2>
//           <Bar data={chartData} />
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Navbar from './Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const kpis = [
    { label: 'Total Pipelines', value: 128, color: 'border-cyan-400' },
    { label: 'Success Rate', value: '92%', color: 'border-green-400' },
    { label: 'Avg Execution Time', value: '8.4s', color: 'border-purple-400' },
    { label: 'Failed Pipelines', value: 10, color: 'border-red-400' },
  ];

  const chartData = {
    labels: ['Pipeline A', 'Pipeline B', 'Pipeline C', 'Pipeline D'],
    datasets: [
      {
        label: 'Execution Time (ms)',
        data: [8420, 10200, 6700, 9100],
        backgroundColor: 'rgba(0, 255, 255, 0.6)',
        borderColor: 'rgba(0, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-white font-sans text-sm">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 bg-[#1a1a1a] border-r border-[#00ffff] p-4 flex flex-col">
          {['overview', 'nodes', 'pipelines'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mb-3 px-3 py-1.5 rounded-md text-left transition-all duration-200 tracking-wide text-sm ${
                activeTab === tab
                  ? 'bg-[#00ffff] text-black font-medium'
                  : 'hover:bg-[#00ffff33] text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-xl font-semibold text-[#00ffff] mb-6 tracking-wide">Dashboard Overview</h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md bg-[#1a1a1a] border ${kpi.color} hover:scale-[1.01] transition-transform`}
              >
                <h3 className="text-sm font-medium mb-1 text-gray-300">{kpi.label}</h3>
                <p className="text-xl font-semibold text-white">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md border border-[#00ffff]">
            <h2 className="text-base font-medium text-[#00ffff] mb-3 tracking-wide">Pipeline Execution Times</h2>
            <Bar data={chartData} />
          </div>
        </main>
      </div>
    </div>
  );
}
