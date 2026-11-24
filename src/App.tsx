import { useCallback, useMemo, useState } from 'react';
import { Shuffle } from 'lucide-react';
import { ANIMALS } from './data/animals';
import { Animal, Category } from './types/animal';
import { AppOpeningIntro, AnimalRevealIntro, BookEncyclopediaIntro } from './components/IntroCurtain';
import { HomeView } from './components/HomeView';
import { BookEncyclopediaView } from './components/BookEncyclopediaView';
import { AnimalDetailView } from './components/AnimalDetailView';
import { CompareView, QuizView } from './components/CompareAndQuizView';
import { AnimalVideoModal } from './components/AnimalVideoModal';

type AppView = 'home' | 'encyclopedia' | 'detail' | 'compare' | 'quiz';

export function App() {
  const [showOpeningIntro, setShowOpeningIntro] = useState(true);
  const [showBookIntro, setShowBookIntro] = useState(false);
  const [introAnimal, setIntroAnimal] = useState<Animal | null>(null);
  const [pendingAnimal, setPendingAnimal] = useState<Animal | null>(null);

  const [view, setView] = useState<AppView>('home');
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [activeAnimalId, setActiveAnimalId] = useState<string>(ANIMALS[0].id);
  const [autoPlaySound, setAutoPlaySound] = useState<boolean>(true);
  const [videoAnimal, setVideoAnimal] = useState<Animal | null>(null);

  const activeList = useMemo(() => {
    if (filter === 'all') return ANIMALS;
    return ANIMALS.filter((a) => a.category === filter);
  }, [filter]);

  const activeIndex = useMemo(() => {
    const idx = activeList.findIndex((a) => a.id === activeAnimalId);
    return idx >= 0 ? idx : 0;
  }, [activeList, activeAnimalId]);

  const activeAnimal = activeList[activeIndex] ?? ANIMALS[0];

  const handleOpenAnimal = useCallback((animal: Animal) => {
    setPendingAnimal(animal);
    setIntroAnimal(animal);
  }, []);

  const handleOpenGreenBook = useCallback((category?: Category) => {
    setFilter(category ?? 'all');
    setShowBookIntro(true);
  }, []);

  const handleCompleteBookIntro = useCallback(() => {
    setShowBookIntro(false);
    setView('encyclopedia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCompleteAnimalIntro = useCallback(() => {
    if (pendingAnimal) {
      setActiveAnimalId(pendingAnimal.id);
      setView('detail');
    }
    setIntroAnimal(null);
    setPendingAnimal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pendingAnimal]);

  const handleRandomAnimal = () => {
    const pool = ANIMALS.filter((a) => a.id !== activeAnimalId);
    const chosen = pool[Math.floor(Math.random() * pool.length)] ?? ANIMALS[0];
    handleOpenAnimal(chosen);
  };

  const handleSelectNavCategory = (cat: 'all' | Category) => {
    setFilter(cat);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E9EFE8] text-[#142419]">
      {/* Awesome Opening Animation */}
      <AppOpeningIntro
        visible={showOpeningIntro}
        onComplete={() => setShowOpeningIntro(false)}
      />

      {/* Book-Opening "Hayvonlar Ensiklopediyasi" Intro */}
      <BookEncyclopediaIntro
        visible={showBookIntro}
        totalAnimals={ANIMALS.length}
        onComplete={handleCompleteBookIntro}
      />

      {/* Awesome Animal Reveal Animation */}
      <AnimalRevealIntro
        animal={introAnimal}
        onComplete={handleCompleteAnimalIntro}
      />

      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-30 bg-[#E9EFE8]/90 backdrop-blur-md border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleSelectNavCategory('all')}
            className="font-display text-lg font-bold tracking-tight text-[#142419] whitespace-nowrap shrink-0 cursor-pointer hover:text-emerald-800 transition-colors"
          >
            Hayvonlar Kitobi
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700">
            <button
              type="button"
              onClick={() => handleSelectNavCategory('all')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-stone-950 ${
                view === 'home' && filter === 'all' ? 'text-stone-950 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Kitob muqovasi
            </button>
            <button
              type="button"
              onClick={() => handleOpenGreenBook('herbivore')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-emerald-900 ${
                filter === 'herbivore' && (view === 'detail' || view === 'encyclopedia')
                  ? 'text-emerald-800 font-semibold underline underline-offset-4'
                  : ''
              }`}
            >
              O‘txo‘rlar
            </button>
            <button
              type="button"
              onClick={() => handleOpenGreenBook('carnivore')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-red-900 ${
                filter === 'carnivore' && (view === 'detail' || view === 'encyclopedia')
                  ? 'text-red-800 font-semibold underline underline-offset-4'
                  : ''
              }`}
            >
              Go‘shtxo‘rlar
            </button>
            <button
              type="button"
              onClick={() => setView('compare')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-stone-950 ${
                view === 'compare' ? 'text-stone-950 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Taqqoslash
            </button>
            <button
              type="button"
              onClick={() => setView('quiz')}
              className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-stone-950 ${
                view === 'quiz' ? 'text-stone-950 font-semibold underline underline-offset-4' : ''
              }`}
            >
              Viktorina
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleRandomAnimal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#144D2E] text-white text-xs font-semibold hover:bg-[#19623B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Tasodifiy hayvon
            </button>
          </div>
        </div>

        {/* Mobile Quick Nav Row */}
        <div className="md:hidden border-t border-stone-300/70 px-4 py-2 flex items-center gap-4 overflow-x-auto text-xs font-medium text-stone-700">
          <button
            type="button"
            onClick={() => handleSelectNavCategory('all')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${view === 'home' ? 'text-stone-950 font-bold' : ''}`}
          >
            Kitob muqovasi
          </button>
          <button
            type="button"
            onClick={() => handleOpenGreenBook('herbivore')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${filter === 'herbivore' && view === 'detail' ? 'text-emerald-800 font-bold' : ''}`}
          >
            O‘txo‘rlar
          </button>
          <button
            type="button"
            onClick={() => handleOpenGreenBook('carnivore')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${filter === 'carnivore' && view === 'detail' ? 'text-red-800 font-bold' : ''}`}
          >
            Go‘shtxo‘rlar
          </button>
          <button
            type="button"
            onClick={() => setView('compare')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${view === 'compare' ? 'text-stone-950 font-bold' : ''}`}
          >
            Taqqoslash
          </button>
          <button
            type="button"
            onClick={() => setView('quiz')}
            className={`whitespace-nowrap shrink-0 cursor-pointer ${view === 'quiz' ? 'text-stone-950 font-bold' : ''}`}
          >
            Viktorina
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'home' && (
          <HomeView
            animals={ANIMALS}
            selectedFilter={filter}
            onFilterChange={setFilter}
            onSelectAnimal={handleOpenAnimal}
            onOpenGreenBook={handleOpenGreenBook}
            onOpenVideo={(a) => setVideoAnimal(a)}
          />
        )}

        {view === 'encyclopedia' && (
          <BookEncyclopediaView
            animals={ANIMALS}
            selectedFilter={filter}
            onFilterChange={setFilter}
            onSelectAnimal={handleOpenAnimal}
            onOpenVideo={(a) => setVideoAnimal(a)}
            onBackToCover={() => {
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {view === 'detail' && (
          <AnimalDetailView
            animal={activeAnimal}
            allAnimals={activeList}
            index={activeIndex}
            total={activeList.length}
            autoPlaySound={autoPlaySound}
            onToggleAutoPlaySound={() => setAutoPlaySound((v) => !v)}
            onSelectAnimalById={(id) => {
              setActiveAnimalId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVideo={(a) => setVideoAnimal(a)}
            onPrev={() => {
              if (activeIndex > 0) {
                setActiveAnimalId(activeList[activeIndex - 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onNext={() => {
              if (activeIndex < activeList.length - 1) {
                setActiveAnimalId(activeList[activeIndex + 1].id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onBack={() => {
              setView('encyclopedia');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {view === 'compare' && (
          <CompareView animals={ANIMALS} onSelectAnimal={handleOpenAnimal} />
        )}

        {view === 'quiz' && (
          <QuizView animals={ANIMALS} onSelectAnimal={handleOpenAnimal} />
        )}
      </main>

      {/* Interactive Documentary Video Theater */}
      <AnimalVideoModal
        animal={videoAnimal}
        allAnimals={ANIMALS}
        onSelectAnimal={(a) => setVideoAnimal(a)}
        onClose={() => setVideoAnimal(null)}
      />

      {/* Quiet Footer */}
      <footer className="border-t border-stone-300/80 py-5 px-4 sm:px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="tabular-nums">
            Yashil Hayvonlar Kitobi · {ANIMALS.length} ta o‘txo‘r va go‘shtxo‘r hayvon ensiklopediyasi
          </span>
          <button
            type="button"
            onClick={() => setShowOpeningIntro(true)}
            className="text-stone-700 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
          >
            Kirish animatsiyasini qayta ko‘rish
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
