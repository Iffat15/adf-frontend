import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import OrchPulseMain from './OrchPulseMain'; // This will be your current App logic

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<OrchPulseMain />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
