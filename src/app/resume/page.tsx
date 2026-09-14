import './resume.css';

import {
  activities,
  introSections,
  profile,
  projects,
  resumeDescription,
  resumeUrl,
  workExperiences,
} from '@contents/resume/data';
import { Building2, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';

import { siteConfig } from '@/shared/config';

import { ContactList } from './contact-list';
import type { LogoVariant, ResumeBullet } from './types';

export const metadata: Metadata = {
  title: {
    absolute: `${profile.name} | ${profile.jobTitle}`,
  },
  description: resumeDescription,
  alternates: {
    canonical: resumeUrl,
  },
  openGraph: {
    title: `${profile.name} | ${profile.jobTitle}`,
    description: resumeDescription,
    url: resumeUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} | ${profile.jobTitle}`,
    description: resumeDescription,
  },
};

const SectionTitle = ({ children }: { children: string }) => {
  return (
    <h2 className='mb-8 mt-20 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl print:mb-2 print:mt-4 print:text-xl'>
      {children}
    </h2>
  );
};

const StackList = ({ stacks }: { stacks: string[] }) => {
  if (stacks.length === 0) {
    return null;
  }

  return (
    <div className='mt-4 flex flex-wrap gap-2 print:mt-2 print:gap-1.5'>
      {stacks.map((stack) => (
        <span
          key={stack}
          className='rounded-sm bg-slate-100 px-2 py-1 font-mono text-sm text-slate-700 print:bg-slate-50 print:px-1.5 print:py-0.5 print:text-[9px] print:text-slate-600'>
          {stack}
        </span>
      ))}
    </div>
  );
};

const BulletList = ({ items }: { items: ResumeBullet[] }) => {
  return (
    <ul className='mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-slate-700 sm:text-base print:mt-1.5 print:space-y-0.5 print:pl-4 print:text-[10px] print:leading-[1.34]'>
      {items.map((item) => (
        <li key={typeof item === 'string' ? item : item.id}>
          {typeof item === 'string' ? (
            item
          ) : (
            <span>
              {item.parts.map((part, index) =>
                part.href ? (
                  <a
                    key={index}
                    href={part.href}
                    target='_blank'
                    rel='noreferrer'
                    className='underline underline-offset-4 hover:text-slate-950'>
                    {part.bold ? <strong>{part.text}</strong> : part.text}
                  </a>
                ) : part.bold ? (
                  <strong key={index}>{part.text}</strong>
                ) : (
                  part.text
                )
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

const CompanyIcon = ({
  label,
  src,
  variant = 'contain',
}: {
  label?: string;
  src?: StaticImageData;
  variant?: LogoVariant;
}) => {
  return (
    <div
      aria-hidden
      className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-base font-extrabold text-slate-500 print:hidden'>
      {src ? (
        <Image
          src={src}
          alt=''
          width={128}
          height={128}
          className={
            variant === 'cover'
              ? 'h-full w-full object-cover'
              : variant === 'wide'
                ? 'h-full w-full object-contain p-2'
                : 'h-full w-full object-contain p-3'
          }
        />
      ) : label ? (
        label
      ) : (
        <Building2 className='h-10 w-10 sm:h-12 sm:w-12' />
      )}
    </div>
  );
};

const ResumePage = () => {
  return (
    <main className='resume-page min-h-screen bg-white text-slate-950'>
      <div className='mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12 lg:px-0 print:max-w-none print:px-0 print:py-0'>
        {/* <div className='mb-6 flex justify-end print:hidden'>
          <PrintButton />
        </div> */}

        <section className='grid gap-8 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center print:grid-cols-[92px_minmax(0,1fr)] print:gap-5'>
          <div className='relative h-36 w-36 overflow-hidden rounded-full bg-slate-100 sm:h-40 sm:w-40 print:h-20 print:w-20'>
            <Image
              src={profile.image}
              alt={profile.imageAlt}
              fill
              priority
              sizes='160px'
              className='object-cover'
            />
          </div>

          <div>
            <p className='mb-3 text-base font-semibold text-slate-500 print:mb-1 print:text-[10px]'>
              {profile.role}
            </p>
            <h1 className='text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl print:text-3xl'>
              {profile.name}
            </h1>
            <p className='mt-5 max-w-2xl text-xl font-semibold leading-8 text-slate-500 print:mt-2 print:text-sm print:leading-5'>
              {profile.headline[0]} <br className='hidden sm:block' />
              {profile.headline[1]}
            </p>
            <ContactList
              email={profile.email}
              githubHref={profile.githubHref}
              blogHref={profile.blogHref}
              className='mt-6 text-base font-semibold text-slate-700 print:mt-3 print:gap-x-3 print:text-[10px]'
            />
          </div>
        </section>

        <section className='mt-12 space-y-10 print:mt-6 print:space-y-4'>
          {introSections.map((section) => (
            <article key={section.title}>
              <h3 className='text-xl font-bold text-slate-950 print:text-sm'>
                {section.title}
              </h3>
              <BulletList items={section.bullets} />
            </article>
          ))}
        </section>

        <section>
          <SectionTitle>Work Experience.</SectionTitle>

          <div className='space-y-16 print:space-y-4'>
            {workExperiences.map((experience) => (
              <article
                key={experience.company}
                className='grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-[252px_minmax(0,1fr)] print:block print:pt-4'>
                <div className='resume-company-header sm:sticky sm:top-8 sm:self-start print:static print:mb-3'>
                  <CompanyIcon
                    src={experience.logoSrc}
                    variant={experience.logoVariant}
                  />
                  <div className='mt-6 print:flex print:items-baseline print:gap-3'>
                    <h3 className='text-3xl font-extrabold leading-tight text-slate-950 print:text-base'>
                      {experience.company}
                    </h3>
                    <p className='mt-3 text-lg font-semibold leading-7 text-slate-700 print:mt-1 print:text-[10px] print:leading-4'>
                      {experience.position} · {experience.team}
                    </p>
                    <p className='mt-2 whitespace-nowrap text-lg font-medium leading-7 text-slate-700 print:ml-auto print:mt-1 print:text-[10px] print:leading-4'>
                      {experience.period}
                    </p>
                  </div>
                </div>

                <div>
                  <div className='space-y-12 print:space-y-4'>
                    {experience.projects.map((project) => (
                      <section
                        key={project.name}
                        className={`resume-project ${
                          project.printKeepTogether ? 'resume-print-block' : ''
                        }`}>
                        <div className='resume-project-intro'>
                          <div>
                            <h4 className='text-2xl font-extrabold leading-tight text-slate-950 sm:text-[28px] print:text-base'>
                              {project.href ? (
                                <a
                                  href={project.href}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='inline-flex items-center gap-2 hover:text-slate-700 print:gap-1.5'>
                                  <span>{project.name}</span>
                                  <ExternalLink className='h-5 w-5 text-slate-400 print:hidden' />
                                  <span className='hidden font-mono text-[9px] font-medium text-slate-500 print:inline'>
                                    {project.href}
                                  </span>
                                </a>
                              ) : (
                                project.name
                              )}
                            </h4>
                            {project.period ? (
                              <p className='mt-2 font-mono text-sm font-medium text-slate-500 print:mt-1 print:text-[9px]'>
                                {project.period}
                              </p>
                            ) : null}
                          </div>
                          <blockquote className='mt-4 border-l-4 border-slate-200 pl-4 text-[15px] leading-7 text-slate-700 sm:text-base print:mt-1.5 print:border-l-2 print:pl-3 print:text-[10px] print:leading-[1.34]'>
                            {project.summary}
                          </blockquote>
                          <StackList stacks={project.stacks} />
                        </div>

                        {project.sections.length > 0 ? (
                          <div className='mt-8 space-y-8 print:mt-3 print:space-y-2'>
                            {project.sections.map((section) => (
                              <section
                                key={section.title}
                                className='resume-print-section'>
                                <h5 className='text-lg font-extrabold leading-7 text-slate-950 sm:text-xl print:text-xs print:leading-5'>
                                  {section.title}
                                </h5>
                                <BulletList items={section.bullets} />
                              </section>
                            ))}
                          </div>
                        ) : null}
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          {/* 기존 제목: Project. */}
          <SectionTitle>Projects.</SectionTitle>

          <div className='space-y-12 print:space-y-4'>
            {projects.map((project) => (
              <article
                key={project.name}
                className='resume-print-block border-t border-slate-200 pt-8 print:pt-4'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                  <h3 className='text-2xl font-extrabold text-slate-950 print:text-base'>
                    {project.href ? (
                      <a
                        href={project.href}
                        target='_blank'
                        rel='noreferrer'
                        className='inline-flex items-center gap-2 hover:text-slate-700 print:gap-1.5'>
                        <span>{project.name}</span>
                        <ExternalLink className='h-5 w-5 text-slate-400 print:hidden' />
                        <span className='hidden font-mono text-[9px] font-medium text-slate-500 print:inline'>
                          {project.href}
                        </span>
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className='font-mono text-sm text-slate-500 print:text-[9px]'>
                    {project.period}
                  </p>
                </div>
                <blockquote className='mt-4 border-l-4 border-slate-200 pl-4 text-[15px] leading-7 text-slate-700 sm:text-base print:mt-1.5 print:border-l-2 print:pl-3 print:text-[10px] print:leading-[1.34]'>
                  {project.summary}
                </blockquote>
                <BulletList items={project.bullets} />
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>Education.</SectionTitle>

          <div className='space-y-8 print:space-y-4'>
            {activities.map((activity) => (
              <article
                key={activity.title}
                className='resume-print-block border-t border-slate-200 pt-8 print:pt-4'>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                  <h3 className='text-xl font-bold text-slate-950 print:text-sm'>
                    {activity.title}
                  </h3>
                  <p className='font-mono text-sm text-slate-500 print:text-[9px]'>
                    {activity.period}
                  </p>
                </div>
                <p className='mt-3 text-[15px] leading-7 text-slate-700 sm:text-base print:mt-1.5 print:text-[10px] print:leading-[1.34]'>
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className='mt-20 flex flex-col gap-3 border-t border-slate-200 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between print:hidden'>
          <ContactList
            email={profile.email}
            githubHref={profile.githubHref}
            blogHref={profile.blogHref}
          />
          <p>
            Copyright {profile.copyrightYear}. {profile.name} All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default ResumePage;
