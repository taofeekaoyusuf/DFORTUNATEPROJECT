import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ role }) => {
  return (
    <nav>
      <ul>
        {role === 'Admin' && <li><Link to="/admin">Admin Dashboard</Link></li>}
        {role === 'Teacher' && <li><Link to="/teacher">Teacher Dashboard</Link></li>}
        {role === 'Parent' && <li><Link to="/parent">Parent Dashboard</Link></li>}
        {role === 'Student' && <li><Link to="/student">Student Dashboard</Link></li>}
      </ul>
    </nav>
  );
};

export default Navigation;
