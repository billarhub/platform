import Dashboard from '@/components/dashboard/Dashboard';
import React from 'react';

function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <Dashboard locale={locale} />;
}

export default DashboardPage;
