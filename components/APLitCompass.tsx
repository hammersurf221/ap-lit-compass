import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  BookOpen, 
  PenTool, 
  Map, 
  Anchor, 
  Feather, 
  Layout, 
  ArrowRight, 
  RotateCcw, 
  MousePointerClick, 
  MessageSquareQuote,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain
} from 'lucide-react';
import { TieBreakerOption, Quadrant, Step, Part } from '../types';
import { 
  QUESTIONS_PART_A, 
  QUESTIONS_PART_B, 
  TIE_BREAKER_OPTIONS, 
  ARCHETYPES, 
  THRESHOLD, 
  ArchetypeData,
  APP_CONTENT 
} from '../compassData';

export const APLitCompass: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [scoresA, setScoresA] = useState<Record<number, number>>({});
  const [scoresB, setScoresB] = useState<Record<number, number>>({});
  const [tieBreaker, setTieBreaker] = useState<TieBreakerOption | null>(null);
  const [viewQuadrantId, setViewQuadrantId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScoreChange = (part: Part, id: number, value: number) => {
    if (part === 'A') {
      setScoresA({ ...scoresA, [id]: value });
    } else {
      setScoresB({ ...scoresB, [id]: value });
    }
  };

  const calculateTotal = (scores: Record<number, number>) => Object.values(scores).reduce((a, b) => a + b, 0);

  const getQuadrant = (scoreA: number, scoreB: number): ArchetypeData => {
    const highA = scoreA >= THRESHOLD;
    const highB = scoreB >= THRESHOLD;

    if (highA && !highB) return ARCHETYPES[1];
    if (highA && highB) return ARCHETYPES[2];
    if (!highA && !highB) return ARCHETYPES[3];
    return ARCHETYPES[4];
  };
  
  const handleTieBreakerSelect = (option: TieBreakerOption) => {
    setTieBreaker(option);
    const rawTotalA = calculateTotal(scoresA);
    const rawTotalB = calculateTotal(scoresB);
    const finalA = rawTotalA + option.adjA;
    const finalB = rawTotalB + option.adjB;
    
    const result = getQuadrant(finalA, finalB);
    setViewQuadrantId(result.id);
    setStep('results');
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isNextDisabled = (part: Part) => {
    const scores = part === 'A' ? scoresA : scoresB;
    const questions = part === 'A' ? QUESTIONS_PART_A : QUESTIONS_PART_B;
    return Object.keys(scores).length < questions.length;
  };

  const resetQuiz = () => {
    setStep('intro');
    setScoresA({});
    setScoresB({});
    setTieBreaker(null);
    setViewQuadrantId(null);
  };

  const renderRatingButtons = (part: Part, id: number) => {
    const currentScore = part === 'A' ? scoresA[id] : scoresB[id];
    
    return (
      <div className="mt-8 mb-2">
        <div className="flex justify-between items-end mb-3 px-1">
          <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${currentScore && currentScore <= 2 ? 'text-slate-800' : 'text-slate-300'}`}>Disagree</span>
          <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${currentScore && currentScore >= 4 ? 'text-slate-800' : 'text-slate-300'}`}>Agree</span>
        </div>
        
        <div className="relative h-12 flex items-center justify-between group">
          {/* Background Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 rounded-full z-0"></div>
          
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = currentScore === val;
            return (
              <button
                key={val}
                onClick={() => handleScoreChange(part, id, val)}
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-serif font-medium transition-all duration-300
                  ${isSelected 
                    ? 'bg-slate-800 text-white shadow-lg scale-110 ring-4 ring-slate-100' 
                    : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600 hover:scale-105'}
                `}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDetailedProfile = (id: number) => {
    const details = ARCHETYPES[id];
    if (!details) return null;

    return (
      <div className="mt-8 pt-8 border-t border-slate-100">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
          <Brain size={16} /> Archetype Profile
        </h4>
        
        <div className="mb-6">
          <p className="text-slate-600 italic leading-relaxed text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
            "{details.approach}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
              <TrendingUp size={12} /> Strengths
            </span>
            <ul className="space-y-2">
              {details.strengths.map((s: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                  <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
              <AlertCircle size={12} /> Challenges
            </span>
            <ul className="space-y-2">
              {details.weaknesses.map((w: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">!</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const adjA = tieBreaker ? tieBreaker.adjA : 0;
    const adjB = tieBreaker ? tieBreaker.adjB : 0;
    const totalA = calculateTotal(scoresA) + adjA;
    const totalB = calculateTotal(scoresB) + adjB;
    
    // User Result
    const userResult = getQuadrant(totalA, totalB);
    
    // Currently Viewing
    const viewedArchetype = viewQuadrantId ? ARCHETYPES[viewQuadrantId] : null;
    
    // Scaling logic to align 18 (Threshold) with 50% (Center)
    // Range roughly 4 to 28 to cover all tiebreaker scenarios
    const MIN_VAL = 4;
    const MAX_VAL = 28;
    const CENTER_VAL = THRESHOLD; // 18

    const getPositionPercentage = (value: number) => {
      let percent;
      if (value <= CENTER_VAL) {
        // Map [MIN_VAL, CENTER_VAL] to [0, 50]
        percent = ((value - MIN_VAL) / (CENTER_VAL - MIN_VAL)) * 50;
      } else {
        // Map [CENTER_VAL, MAX_VAL] to [50, 100]
        percent = 50 + ((value - CENTER_VAL) / (MAX_VAL - CENTER_VAL)) * 50;
      }
      // Clamp for visual safety (marker size)
      return Math.min(Math.max(percent, 8), 92);
    };

    const percentY = getPositionPercentage(totalA); // Insight (Y axis)
    const percentX = getPositionPercentage(totalB); // Mechanics (X axis)

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
        
        {/* Results Card */}
        <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-[#1e293b] text-white p-8 md:p-12 text-center relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">
                {APP_CONTENT.results.headerPill}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-4 tracking-tight">
                {userResult.name}
              </h2>
              <div className="h-1 w-24 bg-indigo-500/50 mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl">
                {userResult.tagline}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 min-h-[600px]">
            
            {/* Left Column: Interactive Compass Chart */}
            <div className="lg:col-span-7 bg-slate-50/50 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col items-center justify-center relative">
              
              <div className="mb-6 flex items-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-wider animate-pulse">
                <MousePointerClick size={14} />
                <span>{APP_CONTENT.results.exploreLabel}</span>
              </div>

              {/* The Compass Chart */}
              <div className="relative w-full max-w-[450px] aspect-square bg-white rounded-full shadow-2xl shadow-slate-200 border-4 border-white ring-1 ring-slate-100 p-12">
                
                {/* Axis Labels */}
                <div className="absolute z-10 top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2">{APP_CONTENT.results.axis.yTop}</div>
                <div className="absolute z-10 bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2">{APP_CONTENT.results.axis.yBottom}</div>
                <div className="absolute z-10 right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2 whitespace-nowrap">{APP_CONTENT.results.axis.xRight}</div>
                <div className="absolute z-10 left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-2 whitespace-nowrap">{APP_CONTENT.results.axis.xLeft}</div>

                {/* Inner Grid Area */}
                <div className="relative w-full h-full border border-slate-200">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    <div className="border-r border-b border-slate-100"></div>
                    <div className="border-b border-slate-100"></div>
                    <div className="border-r border-slate-100"></div>
                    <div></div>
                  </div>
                  
                  {/* Central Axis Lines */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-300"></div>
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-300"></div>

                  {/* Quadrant Interactions & Background Icons */}
                  
                  {/* Q1: Philosopher (Top Left) */}
                  <button 
                    onClick={() => setViewQuadrantId(1)}
                    className={`absolute top-0 left-0 w-1/2 h-1/2 transition-all duration-300 group focus:outline-none flex items-center justify-center
                      ${viewQuadrantId === 1 ? 'bg-emerald-50/80' : 'hover:bg-slate-50'}`}
                  >
                      <Feather className={`w-16 h-16 transition-all duration-500 ${viewQuadrantId === 1 ? 'text-emerald-200 scale-110' : 'text-slate-100 group-hover:text-slate-200'}`} />
                  </button>

                  {/* Q2: Captain (Top Right) */}
                  <button 
                    onClick={() => setViewQuadrantId(2)}
                    className={`absolute top-0 right-0 w-1/2 h-1/2 transition-all duration-300 group focus:outline-none flex items-center justify-center
                      ${viewQuadrantId === 2 ? 'bg-blue-50/80' : 'hover:bg-slate-50'}`}
                  >
                      <Anchor className={`w-16 h-16 transition-all duration-500 ${viewQuadrantId === 2 ? 'text-blue-200 scale-110' : 'text-slate-100 group-hover:text-slate-200'}`} />
                  </button>

                  {/* Q3: Explorer (Bottom Left) */}
                  <button 
                    onClick={() => setViewQuadrantId(3)}
                    className={`absolute bottom-0 left-0 w-1/2 h-1/2 transition-all duration-300 group focus:outline-none flex items-center justify-center
                      ${viewQuadrantId === 3 ? 'bg-amber-50/80' : 'hover:bg-slate-50'}`}
                  >
                      <Map className={`w-16 h-16 transition-all duration-500 ${viewQuadrantId === 3 ? 'text-amber-200 scale-110' : 'text-slate-100 group-hover:text-slate-200'}`} />
                  </button>

                  {/* Q4: Architect (Bottom Right) */}
                  <button 
                    onClick={() => setViewQuadrantId(4)}
                    className={`absolute bottom-0 right-0 w-1/2 h-1/2 transition-all duration-300 group focus:outline-none flex items-center justify-center
                      ${viewQuadrantId === 4 ? 'bg-rose-50/80' : 'hover:bg-slate-50'}`}
                  >
                      <Layout className={`w-16 h-16 transition-all duration-500 ${viewQuadrantId === 4 ? 'text-rose-200 scale-110' : 'text-slate-100 group-hover:text-slate-200'}`} />
                  </button>

                  {/* The User Marker */}
                  <div 
                    className="absolute w-4 h-4 bg-slate-900 rounded-full shadow-[0_0_0_4px_rgba(255,255,255,1),0_8px_16px_rgba(0,0,0,0.3)] z-20 transition-all duration-1000 ease-out flex items-center justify-center group"
                    style={{
                      left: `${percentX}%`, 
                      bottom: `${percentY}%`,
                      transform: 'translate(-50%, 50%)'
                    }}
                  >
                    <div className="absolute w-full h-full bg-slate-900 rounded-full animate-ping opacity-20"></div>
                    
                    {/* Tooltip for marker */}
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap opacity-100 shadow-sm">
                      You
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Info */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-white">
              
              {viewedArchetype && (
                <div className={`inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${viewedArchetype.bg} ${viewedArchetype.color}`}>
                    <viewedArchetype.icon size={14} />
                    {viewedArchetype.name}
                </div>
              )}

              <div key={viewQuadrantId} className="animate-in slide-in-from-right-4 fade-in duration-300">
                {viewedArchetype && (
                  <>
                    <h3 className="font-serif text-2xl text-slate-900 mb-4 font-medium">{viewedArchetype.resultTitle}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      "{viewedArchetype.resultQuote}"
                    </p>
                    <div className="space-y-4 text-sm md:text-base">
                      <div className={`p-4 bg-slate-50 border-l-2 ${viewedArchetype.borderColor}`}>
                        <strong className="block text-slate-900 font-serif mb-1">The Diagnosis</strong>
                        <p className="text-slate-600">{viewedArchetype.diagnosis}</p>
                      </div>
                      <div className={`p-4 bg-slate-50 border-l-2 ${viewedArchetype.borderColor}`}>
                          <strong className="block text-slate-900 font-serif mb-1">The Prescription</strong>
                          <p className="text-slate-600">{viewedArchetype.prescription}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Detailed Profile Section */}
                {viewQuadrantId && renderDetailedProfile(viewQuadrantId)}

              </div>
            </div>
          </div>

          {/* Footer of Card */}
          <div className="bg-slate-50 p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200">
            <div className="flex items-center gap-3 text-slate-500 text-sm">
               <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                 <Feather size={16} />
               </div>
               <span className="font-serif italic">{APP_CONTENT.results.footerIconText}</span>
            </div>
            <button 
                onClick={resetQuiz} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold uppercase tracking-wider transition-colors"
            >
                <RotateCcw size={14} /> {APP_CONTENT.results.restartButton}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#f8f5f2] font-sans text-slate-800 selection:bg-slate-200 selection:text-slate-900 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Navbar */}
      <nav className="w-full px-6 py-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 text-white p-2 rounded shadow-lg shadow-slate-300">
            <Compass size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-slate-900 leading-none">{APP_CONTENT.general.appName}</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">{APP_CONTENT.general.appTagline}</p>
          </div>
        </div>
        <div className="hidden md:block text-xs font-medium text-slate-400 uppercase tracking-widest">
           {APP_CONTENT.nav.sectionPrefix} <span className="text-slate-900">{step === 'intro' ? APP_CONTENT.nav.labels.intro : step === 'results' ? APP_CONTENT.nav.labels.results : APP_CONTENT.nav.labels.assessment}</span>
        </div>
      </nav>

      <main className="px-4 py-8 md:py-12 max-w-5xl mx-auto">
        
        {/* Intro Screen */}
        {step === 'intro' && (
          <div className="grid md:grid-cols-2 gap-12 items-center animate-in slide-in-from-bottom-8 duration-700">
            <div>
              <div className="inline-block px-3 py-1 mb-6 border border-slate-300 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500">
                {APP_CONTENT.intro.pill}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-medium text-slate-900 mb-6 leading-tight">
                {APP_CONTENT.intro.titleNormal} <br/><span className="italic text-slate-500">{APP_CONTENT.intro.titleItalic}</span>
              </h2>
              <div className="prose prose-lg text-slate-600 mb-10 leading-relaxed font-serif">
                <p>
                  {APP_CONTENT.intro.description1Start} <span className="text-slate-900 font-medium border-b border-slate-300">{APP_CONTENT.intro.description1Insight}</span> {APP_CONTENT.intro.description1And} <span className="text-slate-900 font-medium border-b border-slate-300">{APP_CONTENT.intro.description1Mechanics}</span>.
                </p>
                <p>
                  {APP_CONTENT.intro.description2}
                </p>
              </div>
              
              <button 
                onClick={() => setStep('partA')}
                className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded shadow-xl shadow-slate-300/50 hover:shadow-slate-400/50 transition-all flex items-center gap-3 font-medium text-sm tracking-widest uppercase"
              >
                {APP_CONTENT.intro.button} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative hidden md:block">
               {/* Decorative Graphic for Intro */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full border border-slate-100 shadow-2xl flex items-center justify-center p-12">
                  <div className="w-full h-full border border-dashed border-slate-200 rounded-full relative animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 text-slate-300"><Feather size={20}/></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 text-slate-300"><Layout size={20}/></div>
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 text-slate-300"><Map size={20}/></div>
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white p-2 text-slate-300"><Anchor size={20}/></div>
                  </div>
                  <div className="absolute text-center">
                    <Compass size={48} strokeWidth={1} className="text-slate-300 mx-auto mb-2" />
                    <span className="font-serif text-slate-400 italic">{APP_CONTENT.intro.timeEstimate}</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Part A: Insight */}
        {step === 'partA' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-200 relative overflow-hidden">
               {/* Icon moved back to top-right, no longer overlaps text */}
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <BookOpen size={120} />
               </div>
               
               <div className="relative z-10">
                 <div className="flex items-baseline justify-between mb-12 border-b border-slate-100 pb-6">
                   <div>
                     <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2 block">{APP_CONTENT.partA.pill}</span>
                     <h2 className="text-3xl font-serif font-medium text-slate-900">{APP_CONTENT.partA.title}</h2>
                   </div>
                 </div>

                 <div className="space-y-12">
                   {QUESTIONS_PART_A.map((q) => (
                     <div key={q.id} className="group">
                       <p className="font-serif text-xl text-slate-800 leading-relaxed">{q.text}</p>
                       {renderRatingButtons('A', q.id)}
                     </div>
                   ))}
                 </div>

                 <div className="mt-16 flex justify-end">
                   <button 
                     onClick={() => {
                       setStep('partB');
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                     }}
                     disabled={isNextDisabled('A')}
                     className={`px-8 py-4 rounded shadow-lg transition-all flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${
                       isNextDisabled('A') 
                         ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                         : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl'
                     }`}
                   >
                     {APP_CONTENT.partA.nextButton} <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Part B: Mechanics */}
        {step === 'partB' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-200 relative overflow-hidden">
               {/* Icon moved back to top-right, no longer overlaps text */}
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <PenTool size={120} />
               </div>
               
               <div className="relative z-10">
                 <div className="flex items-baseline justify-between mb-12 border-b border-slate-100 pb-6">
                   <div>
                     <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">{APP_CONTENT.partB.pill}</span>
                     <h2 className="text-3xl font-serif font-medium text-slate-900">{APP_CONTENT.partB.title}</h2>
                   </div>
                 </div>

                 <div className="space-y-12">
                   {QUESTIONS_PART_B.map((q) => (
                     <div key={q.id} className="group">
                       <p className="font-serif text-xl text-slate-800 leading-relaxed">{q.text}</p>
                       {renderRatingButtons('B', q.id)}
                     </div>
                   ))}
                 </div>

                 <div className="mt-16 flex justify-between items-center">
                   <button 
                      onClick={() => setStep('partA')}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest px-4"
                   >
                      {APP_CONTENT.partB.backButton}
                   </button>
                   <button 
                     onClick={() => {
                       setStep('tiebreaker');
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                     }}
                     disabled={isNextDisabled('B')}
                     className={`px-8 py-4 rounded shadow-lg transition-all flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${
                       isNextDisabled('B') 
                         ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                         : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl'
                     }`}
                   >
                     {APP_CONTENT.partB.nextButton} <ArrowRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Tiebreaker */}
        {step === 'tiebreaker' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5">
                 <MessageSquareQuote size={120} />
               </div>

               <div className="relative z-10">
                 <div className="mb-10 text-center max-w-lg mx-auto">
                    <h2 className="text-2xl font-serif font-medium text-slate-900 mb-4">{APP_CONTENT.tiebreaker.title}</h2>
                    <p className="text-slate-600 font-serif text-lg">
                      {APP_CONTENT.tiebreaker.question}
                    </p>
                 </div>

                 <div className="grid gap-4">
                   {TIE_BREAKER_OPTIONS.map((option) => (
                     <button
                       key={option.id}
                       onClick={() => handleTieBreakerSelect(option)}
                       className="group relative bg-slate-50 hover:bg-white border-2 border-transparent hover:border-slate-900 p-6 rounded-lg text-left transition-all duration-200 hover:shadow-lg"
                     >
                       <div className="flex items-start gap-4">
                         <div className="mt-1 text-slate-300 group-hover:text-slate-900 transition-colors">
                           <CheckCircle2 size={20} />
                         </div>
                         <div className="flex-1">
                           <p className="font-serif italic text-lg text-slate-700 group-hover:text-slate-900 transition-colors">
                             {option.text}
                           </p>
                         </div>
                       </div>
                     </button>
                   ))}
                 </div>
                 
                 <div className="mt-10 text-center">
                    <button 
                        onClick={() => setStep('partB')}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest"
                    >
                        {APP_CONTENT.tiebreaker.backButton}
                    </button>
                 </div>
               </div>
             </div>
          </div>
        )}

        {/* Results */}
        {step === 'results' && renderResults()}

      </main>
    </div>
  );
};
