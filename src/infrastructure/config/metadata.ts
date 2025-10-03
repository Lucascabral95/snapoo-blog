import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
    title: {
        default: 'Snapoo Blog',
        template: '%s | Snapoo',
    },
    description:
        'Descubre los perfiles de nuestros usuarios, sus mejores imágenes y galerías personalizadas en este blog. Inspírate con fotografías únicas y conecta con una comunidad creativa.',
    keywords: [
        'fotografía',
        'blog',
        'imágenes',
        'galería',
        'comunidad creativa',
        'snapoo',
    ],
    authors: [{ name: 'Snapoo Team' }],
    creator: 'Snapoo',
    openGraph: {
        type: 'website',
        locale: 'es_AR',
        url: 'https://snapoo.com',
        siteName: 'Snapoo',
        title: 'Snapoo Blog',
        description:
            'Inspírate con fotografías únicas y conecta con una comunidad creativa',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Snapoo - Blog de fotografías',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Snapoo Blog',
        description: 'Inspírate con fotografías únicas',
        images: ['/og-image.png'],
        creator: '@snapoo',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // google: 'mi-codigo-de-verificacion',
    },
};
