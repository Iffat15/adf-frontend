// import React from "react"
// export default function NodeCard({name,type,description}) {
//     return (
//         <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//             {/* <svg class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
//             </svg> */}
//             {/* <a href="#">
//                 <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
//             </a> */}
//             <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{description}</p>
//             <a href="#" class="inline-flex font-medium items-center text-blue-600 hover:underline">
//                 {type}
//                 <svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
//                 </svg>
//             </a>
//         </div>
//     );
// }

import React from "react";
import { FiSettings } from 'react-icons/fi'; // or any icon library you prefer
export default function NodeCard({ node ,isCanvasNode, onConfigure}) {
  const getTypeLabel = (type) => {
    switch (type) {
      case "extract":
        return "E";
      case "transform":
        return "T";
      case "load":
        return "L";
      default:
        return "?";
    }
  };
  const getNodeStyle = (type) => {
    switch (type) {
      case "extract":
        return {
          backgroundColor: "#0f0f0f",     // deep black
          borderColor: "#00ffcc",         // neon cyan
          color: "#ccfff5"                // soft glow text
        };
      case "transform":
        return {
          backgroundColor: "#0f0f0f",
          borderColor: "#00ff66",         // neon green
          color: "#d1ffe5"
        };
      case "load":
        return {
          backgroundColor: "#0f0f0f",
          borderColor: "#ff3399",         // neon pink
          color: "#ffd1e5"
        };
      default:
        return {
          backgroundColor: "#0f0f0f",
          borderColor: "#888",            // fallback gray
          color: "#eee"
        };
    }
  };

  const getServerIcon = (server) => {
    const key = server?.toLowerCase();
    switch (key) {
      case "mysql":
        return (
          <img
            src="https://www.svgrepo.com/show/303251/mysql-logo.svg"
            alt="MySQL"
            className="h-5 w-5"
            title="MySQL"
          />
        );
      case "pgsql":
        return (
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-postgresql-logo-icon-download-in-svg-png-gif-file-formats--brand-development-tools-pack-logos-icons-226047.png"
            alt="PostgreSQL"
            className="h-5 w-5"
            title="PostgreSQL"
          />
        );
      case "sqlserver":
      case "ssms":
        return (
          //   <img
          //     src="https://cdn-icons-png.flaticon.com/512/5968/5968409.png"
          //     alt="SQL Server"
          //     className="h-5 w-5"
          //     title="SQL Server"
          //   />
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968409.png"
            alt="SQL Server"
            className="h-5 w-5 bg-white rounded"
            title="SQL Server"
          />

        );
      default:
        return null;
    }
  };
  return (
    <div className="w-42 px-4 py-2 bg-black border border-green-500 text-green-400 rounded-full shadow-md flex items-center justify-between gap-4 hover:shadow-green-500 transition duration-200">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-green-400 capitalize">
          {/* {getServerIcon(node.server)} */}
          
          {node.server === "string" 
              ? node.subtype 
              : (node.server ? node.server : node.subtype)}

        </div>
      </div>
      <div className="text-lg font-bold text-green-400">{getTypeLabel(node.type)}</div>
      {/* Settings Icon */}
      {isCanvasNode && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConfigure(node); // Trigger config panel
          }}
          className="absolute top-1 right-1 text-cyan-400 hover:text-cyan-300"
          title="Configure Node"
        >
          <FiSettings size={16} />
        </button>)}
    </div>
  );
}
