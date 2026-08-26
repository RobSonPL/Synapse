import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://synapsehub.pl';

async function generateSitemap() {
  console.log('Generating sitemap...');
  const publicDir = path.resolve(__dirname, '../public');
  const blogDataPath = path.resolve(__dirname, '../data/blogData.ts');

  // Read blogData.ts to extract article IDs
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  
  // Very simple regex to find id: 'some-id'
  const idRegex = /id:\s*'([^']+)'/g;
  const articleIds = [];
  let match;
  
  while ((match = idRegex.exec(blogDataContent)) !== null) {
    articleIds.push(match[1]);
  }

  const staticRoutes = [
    '/',
    '/#services',
    '/#portfolio',
    '/#about',
    '/#contact'
  ];

  const urls = [
    ...staticRoutes.map(route => ({
      loc: `${SITE_URL}${route}`,
      changefreq: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? '1.0' : '0.8',
    })),
    ...articleIds.map(id => ({
      loc: `${SITE_URL}/?article=${id}`,
      changefreq: 'monthly',
      priority: '0.6',
    }))
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated successfully!');
}

generateSitemap();
