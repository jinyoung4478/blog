import { Github, Mail } from 'lucide-react';
import Image from 'next/image';

interface ContactListProps {
  blogHref: string;
  className?: string;
  email: string;
  githubHref: string;
}

const ContactList = ({
  blogHref,
  className = '',
  email,
  githubHref,
}: ContactListProps) => {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-3 ${className}`}>
      <li>
        <a
          href={`mailto:${email}`}
          className='flex items-center gap-2 hover:text-slate-950 print:gap-1.5'
          aria-label={`${email}로 이메일 보내기`}>
          <Mail className='h-5 w-5 text-slate-500 print:h-3.5 print:w-3.5' />
          <span>{email}</span>
        </a>
      </li>
      <li>
        <a
          href={githubHref}
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 hover:text-slate-950 print:gap-1.5'>
          <Github className='h-5 w-5 text-slate-500 print:h-3.5 print:w-3.5' />
          <span>Github</span>
          <span className='hidden font-normal text-slate-500 print:inline'>
            {githubHref}
          </span>
        </a>
      </li>
      <li>
        <a
          href={blogHref}
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 hover:text-slate-950 print:gap-1.5'>
          <Image
            src='/favicon-32x32.png'
            alt=''
            width={20}
            height={20}
            className='rounded-sm print:h-3.5 print:w-3.5'
          />
          <span>Blog</span>
          <span className='hidden font-normal text-slate-500 print:inline'>
            {blogHref}
          </span>
        </a>
      </li>
    </ul>
  );
};

export { ContactList };
