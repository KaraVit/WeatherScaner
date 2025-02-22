import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">WeatherApp</h2>
      <nav className="menu">
        <ul>
          <li><i className="bi bi-house-door"></i> Dashboard</li>
          <li><i className="bi bi-map"></i> Map</li>
          <li><i className="bi bi-bookmark"></i> Saved</li>
          <li><i className="bi bi-calendar"></i> Calendar</li>
          <li><i className="bi bi-gear"></i> Settings</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
