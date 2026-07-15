import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Itahari International College',
    short_name: 'IIC',
    description:
      'Itahari International College develops industry-ready graduates through UK-awarded IT and Business degrees in partnership with London Metropolitan University.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1A2B56',
    lang: 'en-NP',
    icons: [
      {
        src: '/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  };
}
