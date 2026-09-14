import type { StaticImageData } from 'next/image';

export interface ResumeText {
  text: string;
  bold?: boolean;
  href?: string;
}

export type ResumeBullet = string | { id: string; parts: ResumeText[] };

export type LogoVariant = 'contain' | 'cover' | 'wide';

export interface WorkProjectSection {
  bullets: ResumeBullet[];
  title: string;
}

export interface WorkProject {
  href?: string;
  name: string;
  period?: string;
  printKeepTogether?: boolean;
  sections: WorkProjectSection[];
  stacks: string[];
  summary: string;
}

export interface WorkExperience {
  company: string;
  logoSrc?: StaticImageData;
  logoVariant?: LogoVariant;
  period: string;
  position: string;
  projects: WorkProject[];
  team: string;
}

export interface Project {
  bullets: ResumeBullet[];
  href?: string;
  name: string;
  period: string;
  summary: string;
}
