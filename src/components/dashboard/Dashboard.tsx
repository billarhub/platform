import { useTranslations } from 'next-intl';
import React from 'react';
import DashboardCard from './DashboardCard';
import CREAR_TORNEO from '../../../public/image/CREAR_TORNEO.svg';
import RANKING from '../../../public/image/RANKING.svg';
import TORNEOS from '../../../public/image/TORNEOS.svg';

interface IDashboardProps {
  locale: string;
}

function Dashboard({ locale }: IDashboardProps) {
  const routeTranslations = useTranslations('Route');
  const dashboardCardOptions = [
    {
      title: routeTranslations('tournamentCreate'),
      href: '/tournaments/create',
      imageUrl: '/image/CREAR_TORNEO.svg',
    },
    {
      title: routeTranslations('tournaments'),
      href: '/tournaments',
      imageUrl: '/image/TORNEOS.svg',
    },
    {
      title: routeTranslations('ranking'),
      href: '/ranking',
      imageUrl: '/image/RANKING.svg',
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-16 mt-24 p-5 md:p-0">
      {dashboardCardOptions.map((option, index) => {
        return (
          <DashboardCard
            locale={locale}
            key={index}
            title={option.title}
            href={option.href}
            imageUrl={option.imageUrl}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
