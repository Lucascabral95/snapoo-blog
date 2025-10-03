import { TbWorld } from 'react-icons/tb';
import { RiUserSmileFill } from 'react-icons/ri';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const NAVIGATION_LINKS = [
    {
        href: '/feed',
        icon: TbWorld,
        label: 'INICIO',
    },
    {
        href: (username: string) => `/usuario/perfil/${username}`,
        icon: RiUserSmileFill,
        label: 'PERFIL',
        requiresUsername: true,
    },
    {
        href: '/feed/people',
        icon: FaMagnifyingGlass,
        label: 'BUSQUEDA',
    },
] as const;

export const SOCIAL_LINKS = [
    {
        href: 'https://github.com/Lucascabral95',
        label: 'Github',
    },
    {
        href: 'https://www.instagram.com/lucascabral95/',
        label: 'Instagram',
    },
    {
        href: 'https://www.linkedin.com/in/lucas-gastón-cabral/',
        label: 'Linkedin',
    },
] as const;

export const BRAND_INFO = {
    name: 'Snapoo',
    logo: '/img/logo-snapoo.png',
    copyright: '2024 Lucas Cabral Dev - Todos los derechos reservados',
} as const;

