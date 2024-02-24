import { useTranslations } from 'next-intl';
import { IRoute } from '@/models';

export function useMenuGroupOptions() {
  const t = useTranslations('Route');
  const menuGroupOptions: IRoute[] = [
    {
      text: t('tournaments'),
      href: '/tournaments',
      as: '/tournaments',
      show: true,
    },
    {
      text: t('players'),
      href: '/players',
      as: '/players',
      show: true,
    },
    {
      text: t('clubs'),
      href: '/clubs',
      as: '/clubs',
      show: true,
    },
    {
      text: t('login'),
      href: '/login',
      as: '/login',
      show: true,
    },
    {
      text: t('register'),
      href: '/sign-up',
      as: '/sign-up',
      show: true,
      accent: true,
    },
  ];
  return menuGroupOptions;
}
