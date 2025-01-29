import { SidebarGroup } from '../../_types/sidebar';

export const platformGroup: SidebarGroup = {
  label: 'Platform',
  items: [
    {
      icon: 'MessageSquare',
      label: 'Chat',
      href: '/chat',
    },
    {
      icon: 'Book',
      label: 'Docs',
      href: 'https://www.cometagentai.com/docs',
      external: true,
    },
    {
      icon: 'Twitter',
      label: 'Follow Us',
      href: 'https://x.com/cometsol_ai',
      external: true,
    },
    {
      icon: 'Github',
      label: 'Source Code',
      href: 'https://github.com/cometagentai/comat',
      external: true,
    },
  ],
};
