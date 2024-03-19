'use client';
import Link from 'next/link';
import React from 'react';

interface IDashboardCardProps {
  locale: string;
  title: string;
  href: string;
  imageUrl: string;
}

function DashboardCard({ title, href, locale, imageUrl }: IDashboardCardProps) {
  const localeHref = `/${locale}${href}`;
  return (
    <Link
      href={localeHref}
      className="rounded-lg bg-dashboardCardGradient flex flex-col justify-center items-end gap-5 px-5 py-8 w-full md:w-2/4 min-h-[221px]"
      style={{
        backgroundImage: `url(${imageUrl}), linear-gradient(180deg, #FF4E00 0%, #A53605 100%)`,
        backgroundPosition: 'left, right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h3 className="text-white text-3xl font-medium uppercase">{title}</h3>
      <div className="h-2 w-20 bg-white" />
    </Link>
  );
}

export default DashboardCard;
