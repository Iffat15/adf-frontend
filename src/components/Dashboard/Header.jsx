import React from "react";

function Header() {
  return (
    <header className="bg-black border-b border-neonCyan p-4 flex justify-between items-center shadow-neon">
      <h1 className="text-neonCyan text-xl font-bold">Dashboard</h1>
      <div className="text-gray-300">User Profile</div>
    </header>
  );
}

export default Header;