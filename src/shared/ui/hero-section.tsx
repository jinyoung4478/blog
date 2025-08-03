'use client';

import Link from 'next/link';

import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { cn } from '@/shared/lib/tw-utils';

import { siteConfig } from '../config';
import { Button } from './button';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${className}`}>
      {/* 애니메이션 그리드 패턴 배경 */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]',
          'absolute inset-0 h-full w-full skew-y-12 scale-150'
        )}
      />

      {/* 그라데이션 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/80' />

      {/* 히어로 콘텐츠 */}
      <div className='relative z-10 mx-auto max-w-4xl px-4 text-center'>
        {/* 메인 타이틀 */}
        <h1 className='mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
          안녕하세요,{' '}
          <span className='block sm:inline'>
            저는{' '}
            <span className='bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent'>
              {siteConfig.author}
            </span>
            입니다
          </span>
        </h1>

        {/* 서브 타이틀 */}
        <p className='mb-6 text-lg font-light text-muted-foreground sm:text-xl md:text-2xl lg:text-3xl'>
          Frontend Developer & Tech Blogger
        </p>

        {/* 설명 */}
        <p className='mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg md:text-xl lg:mb-12'>
          사용자 경험을 중시하는 개발자로,
          <br className='hidden sm:block' />
          새로운 기술과 창의적인 솔루션을 추구합니다
        </p>

        {/* 액션 버튼들 */}
        <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4'>
          <Link href='/posts'>
            <Button
              size='lg'
              className='w-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-2.5 text-base text-white hover:from-blue-700 hover:to-teal-700 sm:w-auto sm:px-8 sm:py-3 sm:text-lg'>
              포스트 보기
            </Button>
          </Link>
          {/* <Button
            variant='outline'
            size='lg'
            className='w-full border-2 px-6 py-2.5 text-base hover:bg-foreground hover:text-background sm:w-auto sm:px-8 sm:py-3 sm:text-lg'>
            프로젝트 보기
          </Button> */}
        </div>
      </div>
    </section>
  );
}
