import { Question, TieBreakerOption } from './types';
import { Feather, Anchor, Map, Layout, LucideIcon } from 'lucide-react';

// ==========================================
// 1. TEXT & BRANDING CONFIGURATION
// ==========================================
// Edit the text inside the quotes below to change the app's content.
export const APP_CONTENT = {
  general: {
    appName: "Mr. Shapiro's AP Lit Compass",
    appTagline: "Diagnostic Tool",
  },
  nav: {
    sectionPrefix: "Section:",
    labels: {
      intro: "Overview",
      assessment: "Assessment",
      results: "Analysis"
    }
  },
  intro: {
    pill: "Self-Assessment",
    titleNormal: "Find your",
    titleItalic: "literary archetype.",
    // The intro sentence is split to allow styling of specific words
    description1Start: "Success in AP Literature requires balancing two distinct skill sets:",
    description1Insight: "Insight",
    description1And: "and",
    description1Mechanics: "Mechanics",
    description2: "This diagnostic will map your current strengths and help identify the specific area you need to target to improve your score.",
    button: "Begin Assessment",
    timeEstimate: "Est. 2 Minutes"
  },
  partA: {
    pill: "Section 1 of 2",
    title: "The Insight Scale",
    nextButton: "Next Section"
  },
  partB: {
    pill: "Section 2 of 2",
    title: "The Mechanics Scale",
    backButton: "Back",
    nextButton: "Final Step"
  },
  tiebreaker: {
    title: "One Last Thing...",
    question: "Which of these comments from Mr. Shapiro sounds most familiar to you?",
    backButton: "Go Back"
  },
  results: {
    headerPill: "Diagnostic Complete",
    exploreLabel: "Explore the Quadrants",
    footerIconText: "This compass is a tool for direction, not a grade.",
    restartButton: "Restart",
    axis: {
      yTop: "Insight +",
      yBottom: "Insight -",
      xRight: "Mechanics +",
      xLeft: "Mechanics -"
    }
  }
};

// ==========================================
// 2. SCORING CONFIGURATION
// ==========================================
export const THRESHOLD = 18;

// ==========================================
// 3. QUESTIONS
// ==========================================

export const QUESTIONS_PART_A: Question[] = [
  { id: 1, text: "When I read a poem, I usually understand the 'deeper meaning' intuitively, even if I can't immediately point to specific evidence." },
  { id: 2, text: "I am comfortable with ambiguity; I don't feel panicked if a text has multiple possible meanings or an open ending." },
  { id: 3, text: "I trust my own 'gut feeling' about a character’s motivation without needing to check online or ask a friend first." },
  { id: 4, text: "I enjoy discussing abstract ideas (love, death, power) more than analyzing sentence structure or grammar." },
  { id: 5, text: "I feel like I have a lot to say about the world and human nature when I read literature." }
];

export const QUESTIONS_PART_B: Question[] = [
  { id: 1, text: "I can quickly spot literary devices (metaphor, irony, diction) and name them correctly without a glossary." },
  { id: 2, text: "When I write an essay, I know exactly how to structure my paragraphs (Claim, Evidence, Commentary) efficiently." },
  { id: 3, text: "I rarely struggle to find quotes to support my points; scanning the text for evidence is easy for me." },
  { id: 4, text: "Mr. Shapiro rarely writes 'awkward phrasing' or 'unclear connection' on my essays; my writing is technically clear." },
  { id: 5, text: "I can finish a timed write within the 40-minute limit without feeling like I ran out of time to organize my thoughts." }
];

// ==========================================
// 4. TIE BREAKER
// ==========================================

export const TIE_BREAKER_OPTIONS: TieBreakerOption[] = [
  { id: 1, text: "“You have great ideas, but your essay lacks organization or specific evidence.”", adjA: 2, adjB: -1, type: "Philosopher Bias" },
  { id: 2, text: "“Your writing is clear and structured, but your analysis needs more depth/risk.”", adjA: -1, adjB: 2, type: "Architect Bias" },
  { id: 3, text: "“I am having trouble following your argument or understanding your points.”", adjA: -1, adjB: -1, type: "Explorer Bias" },
  { id: 4, text: "“Your essay is sophisticated, clear, and well-supported.”", adjA: 1, adjB: 1, type: "Captain Bias" }
];

// ==========================================
// 5. ARCHETYPES (RESULTS)
// ==========================================

export interface ArchetypeData {
  id: number;
  name: string;
  icon: LucideIcon;
  tagline: string;
  color: string;
  bg: string;
  
  // Results view specific
  resultTitle: string;
  resultQuote: string;
  diagnosis: string;
  prescription: string;
  borderColor: string; // Tailwind class for borders
  iconColor: string; // Tailwind class for icons

  // Detailed profile
  strengths: string[];
  weaknesses: string[];
  approach: string;
}

//Within any of these lines, quotations must be paired with a \ before them (\")
export const ARCHETYPES: Record<number, ArchetypeData> = {
  1: {
    id: 1,
    name: "The Philosopher",
    icon: Feather,
    tagline: "High Insight, Lower Mechanics",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    resultTitle: "The Deep Thinker",
    resultQuote: "I know what I want to say, but I just can't get it out clearly.",
    diagnosis: "You intuitively understand the \"heart\" of literature, but your brilliance often gets lost in disorganized paragraphs.",
    prescription: "Master the outline. If you can organize your chaos before you write, you will be unstoppable.",
    borderColor: "border-emerald-500",
    iconColor: "text-emerald-200",
    //Put added strengths/weaknesses inside their respective brackets
    strengths: ["Intuitive Grasp of Theme", "Comfortable with Ambiguity", "Original Voice"],
    weaknesses: ["Chaotic Essay Structure", "Lack of Specific Evidence", "Pacing Issues"],
    approach: "You are in this quadrant if you have high confidence in your ability to interpret, but lower confidence in your ability to efficiently identify and explain the textual elements and devices in the text. One sign that you might be in this quadrant is that you feel like your essays don’t reflect your actual depth of insight, i.e. that you are insightful but don’t always express your thoughts well in formal writing."
  },
  2: {
    id: 2,
    name: "The Captain",
    icon: Anchor,
    tagline: "High Insight, High Mechanics",
    color: "text-blue-700",
    bg: "bg-blue-50",
    resultTitle: "The Master Commander",
    resultQuote: "I feel prepared, and I generally know exactly what is expected of me.",
    diagnosis: "You operate at a high level, balancing technical skill with deep insight. You could likely pass the exam today.",
    prescription: "Risk-taking. Stop writing the essay you think the teacher wants. Write the essay that surprises you.",
    borderColor: "border-blue-500",
    iconColor: "text-blue-200",
    //Put added strengths/weaknesses inside their respective brackets
    strengths: ["Sophisticated Analysis", "Structural Precision", "Rhetorical Control"],
    weaknesses: ["Risk Aversion", "Formulaic Thinking", "Intellectual Safety"],
    approach: "You are in this quadrant if you have high confidence in your ability to interpret, AND efficiently identify and explain the textual elements and devices in the text. One sign that you might be in this quadrant is that you found Part 1 to be pretty easy AND almost always get A’s on essay assignments, i.e. you are confident you could pass the exam right now."
  },
  3: {
    id: 3,
    name: "The Explorer",
    icon: Map,
    tagline: "Developing Insight, Developing Mechanics",
    color: "text-amber-700",
    bg: "bg-amber-50",
    resultTitle: "The Journey Begins",
    resultQuote: "I honestly feel a bit lost, like everyone else sees a code I can't read.",
    diagnosis: "You aren't \"bad at English.\" You are simply at the start of the map, learning rules and reading simultaneously.",
    prescription: "Fundamentals. We will build your skills one brick at a time, focusing on vocabulary and sentence frames.",
    borderColor: "border-amber-500",
    iconColor: "text-amber-200",
    //Put added strengths/weaknesses inside their respective brackets
    strengths: ["Genuine Curiosity", "Authentic Reactions", "Growth Mindset"],
    weaknesses: ["Literary Terminology", "Essay Organization", "Reading Stamina"],
    approach: "You are in this quadrant if you have low confidence in your ability to interpret, AND efficiently identify and explain the textual elements and devices in the text. One sign that you might be in this quadrant is that you often feel lost or confused about the academic parts of this course, i.e. that you really have to struggle just to understand the material."
  },
  4: {
    id: 4,
    name: "The Architect",
    icon: Layout,
    tagline: "Lower Insight, High Mechanics",
    color: "text-rose-700",
    bg: "bg-rose-50",
    resultTitle: "The Technical Expert",
    resultQuote: "I know how to write an essay, but I'm always worried I missed the 'right' answer.",
    diagnosis: "You treat literature like a math problem. You look for the \"hidden meaning\" rather than trusting your own reaction.",
    prescription: "The \"So What?\" Question. Every time you identify a device, ask yourself: Why does this matter?",
    borderColor: "border-rose-500",
    iconColor: "text-rose-200",
    //Put added strengths/weaknesses inside their respective brackets
    strengths: ["Clear Organization", "Technical Proficiency", "Evidence Integration"],
    weaknesses: ["Literal Interpretations", "Misses Subtext & Tone", "Rigid Thinking"],
    approach: "You are in this quadrant if you have high confidence in your ability to efficiently identify and explain the textual elements and devices in the text, but lower confidence in your ability to interpret. One sign that you might be in this quadrant is that you find essay writing straightforward, but often feel the need to “check” if your interpretation is valid via Mr. Shapiro, peers, or online validation."
  }
};