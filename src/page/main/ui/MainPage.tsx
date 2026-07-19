import { compareDesc, format } from 'date-fns';
import Link from 'next/link';

import { allPosts } from '@/contentlayer/generated';

const RECENT_POST_COUNT = 5;

const MainPage = () => {
  const publishedPosts = allPosts.filter((post) => post.published !== false);
  const recentPosts = publishedPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, RECENT_POST_COUNT);

  return (
    <main className='container min-h-[calc(100vh-3.5rem)] py-6 sm:py-8 lg:py-10'>
      <section className='mx-auto max-w-4xl'>
        <div className='mb-4 flex items-end justify-between gap-4'>
          <h2 className='text-sm font-medium text-muted-foreground'>Latest posts</h2>
          <span className='text-sm text-muted-foreground'>
            {recentPosts.length} of {publishedPosts.length}
          </span>
        </div>

        <ol className='border-y'>
          {recentPosts.map((post, index) => {
            const formattedDate = format(new Date(post.date), 'yyyy.MM.dd');

            return (
              <li key={post._id} className='border-b last:border-b-0'>
                <Link
                  href={`/posts/${post.slugAsParams}`}
                  className='group grid gap-4 py-5 transition-colors hover:bg-muted/40 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:px-4'>
                  <span className='font-mono text-sm text-muted-foreground'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <article className='min-w-0'>
                    <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground'>
                      <time dateTime={post.date}>{formattedDate}</time>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                    <h3 className='text-xl font-semibold group-hover:underline sm:text-2xl'>
                      {post.title}
                    </h3>
                    <p className='mt-2 text-sm leading-6 text-muted-foreground sm:text-base'>
                      {post.description}
                    </p>
                  </article>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
};

export { MainPage };
