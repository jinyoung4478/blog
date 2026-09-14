import { access, cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const content = path.join(root, 'contents');
const destination = path.join(root, 'public/images/posts');

try {
  await access(path.join(content, 'posts'));
  await access(path.join(content, 'resume/data.ts'));
} catch {
  throw new Error(
    'Private content is missing. Run git submodule update --init --recursive with access to jinyoung4478/content.'
  );
}

async function collectPostSlugs(directory, prefix = '') {
  const slugs = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      slugs.push(...(await collectPostSlugs(path.join(directory, entry.name), relative)));
    } else if (entry.name.endsWith('.mdx')) {
      slugs.push(relative.slice(0, -4));
    }
  }
  return slugs;
}

const slugs = await collectPostSlugs(path.join(content, 'posts'));

// This directory contains generated copies only. Remove stale post images too.
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

for (const slug of slugs) {
  const source = path.join(content, 'assets/posts', slug);
  try {
    await access(source);
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  await cp(source, path.join(destination, slug), { recursive: true });
}

console.log(`Prepared assets for ${slugs.length} posts from private content.`);
