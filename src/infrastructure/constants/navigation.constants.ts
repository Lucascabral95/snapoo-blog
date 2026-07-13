import { Grid2x2, Search, Users } from 'lucide-react';

export const NAV_LINKS = [
    { href: '/feed', icon: Grid2x2, label: 'Feed' },
    { href: '/feed/buscar', icon: Search, label: 'Buscar' },
    { href: '/feed/people', icon: Users, label: 'Personas' },
] as const;

export const SOCIAL_LINKS = [
    {
        href: 'https://github.com/Lucascabral95',
        label: 'GitHub',
    },
    {
        href: 'https://www.instagram.com/lucascabral95/',
        label: 'Instagram',
    },
    {
        href: 'https://www.linkedin.com/in/lucas-gastón-cabral/',
        label: 'LinkedIn',
    },
] as const;

export const BRAND_INFO = {
    name: 'Snapoo',
    logo: '/img/logo-snapoo.png',
    copyright: '2024 Snapoo — Todos los derechos reservados',
} as const;
