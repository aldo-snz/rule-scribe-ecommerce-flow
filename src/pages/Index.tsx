
import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import DashboardPage from '../components/dashboard/DashboardPage';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Sidebar>
        <DashboardPage />
      </Sidebar>
    </div>
  );
};

export default Index;
