import { useTranslations } from 'next-intl';
import React, { use } from 'react';
import DashboardCard from './DashboardCard';

function Dashboard() {
  const routeTranslations = useTranslations('Route');
  const dashboardCardOptions = [
    {
      title: routeTranslations('tournamentCreate'),
      href: '/tournaments/create',
    },
    { title: routeTranslations('tournaments'), href: '/tournaments' },
    { title: routeTranslations('ranking'), href: '/ranking' },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-16 mt-24 p-5 md:p-0">
      {dashboardCardOptions.map((option, index) => {
        return (
          <DashboardCard key={index} title={option.title} href={option.href} />
        );
      })}
    </div>
  );
}

export default Dashboard;
