
// export default function Navbar() {
//   return (
//     <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl px-4 py-3 flex items-center justify-between">
//         {/* Left: Logo and Title */}
//         <div className="flex space-x-3">
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="text-2xl font-semibold dark:text-white">OrchPulse</span>
//         </div>

//         {/* Right: Navigation Links */}
//         <ul className="flex space-x-6 font-medium">
//           <li>
//             <a href="#" className="text-blue-700 dark:text-blue-500 hover:underline">
//               Home
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
//               Dashboard
//             </a>
//           </li>
//           <li>
//             <a href="#" className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500">
//               Pipelines
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 shadow-lg">
      <div className="max-w-screen-xl px-4 py-3 flex items-center justify-between">
        {/* Left: Logo and Title */}
        <div className="flex space-x-3 items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold text-green-400 drop-shadow-md">
            OrchPulse
          </span>
        </div>

        {/* Right: Navigation Links */}
        <ul className="flex space-x-6 font-medium">
          <li>
            {/* <a href="#" className="text-green-400 hover:text-green-300 drop-shadow-md">
              Home
            </a> */}
            <Link to="/" className="text-green-400 hover:text-green-300 drop-shadow-md">
              Home
            </Link>
          </li>
          {/* <li>
            <a href="#" className="text-white hover:text-green-400">
              Dashboard
            </a>
          </li> */}
          <li>
            <Link to="/dashboard" className="text-white hover:text-green-400">
              Dashboard
            </Link>
          </li>

          <li>
            <a href="#" className="text-white hover:text-green-400">
              Pipelines
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
