import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://predictpro-ai.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
