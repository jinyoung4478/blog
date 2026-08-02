import { MetadataRoute } from 'next';

import { allPosts } from '@/contentlayer/generated';
import { siteConfig } from '@/shared/config';

const sitemap = (): MetadataRoute.Sitemap => {
  const posts = allPosts.filter((post) => post.published !== false);

  const latestPostDate = posts.reduce<Date>((latest, post) => {
    const date = new Date(post.date);
    return date > latest ? date : latest;
  }, new Date(0));

  return [
    {
      url: siteConfig.url,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/posts`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/resume`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
};

export default sitemap;
