import { LucideIcon } from 'lucide-react';

export interface Question {
  id: number;
  text: string;
}

export interface TieBreakerOption {
  id: number;
  text: string;
  adjA: number;
  adjB: number;
  type: string;
}

export interface Quadrant {
  id: number;
  name: string;
  icon: LucideIcon;
  tagline: string;
  color: string;
  bg: string;
}

export type Step = 'intro' | 'partA' | 'partB' | 'tiebreaker' | 'results';
export type Part = 'A' | 'B';
