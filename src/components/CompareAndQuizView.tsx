import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Animal } from '../types/animal';
import { AnimalArtwork } from './illustrations/AnimalArtwork';
import { HabitatScene } from './illustrations/HabitatScene';
import { FoodIllustration } from './illustrations/FoodIllustration';
import { playAnimalSound, playFeedChime } from '../utils/soundEngine';

interface CompareViewProps {
  animals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ animals, onSelectAnimal }) => {
  const [leftId, setLeftId] = useState(animals[5].id); // Fil
  const [rightId, setRightId] = useState(animals[10].id); // Sher

  const left = animals.find((a) => a.id === leftId) || animals[0];
  const right = animals.find((a) => a.id === rightId) || animals[1];

  const maxSpeed = Math.max(left.speedKmh, right.speedKmh, 10);
  const maxWeight = Math.max(left.weightAvgKg, right.weightAvgKg, 10);
  const maxHeight = Math.max(left.heightAvgCm, right.heightAvgCm, 10);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-6 space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-stone-900">
          Hayvonlarni taqqoslash
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Ikki hayvonni tanlab, ularning yashash joyi, tezligi, o‘lchami va ratsionini solishtiring.
        </p>
      </div>

      {/* Animal Selectors + Habitat Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { side: '1-hayvon', animal: left, setId: setLeftId },
          { side: '2-hayvon', animal: right, setId: setRightId },
        ].map(({ side, animal, setId }) => (
          <div key={side} className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between gap-3 bg-[#FAF8F4]">
              <span className="text-xs font-semibold text-stone-500">{side}</span>
              <select
                value={animal.id}
                onChange={(e) => setId(e.target.value)}
                aria-label={`${side} tanlash`}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-sm font-semibold text-stone-900 focus:outline-none focus:border-emerald-700 cursor-pointer"
              >
                {animals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.category === 'herbivore' ? "O'txo'r" : "Go'shtxo'r"})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative h-48 overflow-hidden">
              <HabitatScene biome={animal.biome} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimalArtwork animalId={animal.id} className="w-36 h-36 drop-shadow-xl" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <div className="font-display font-bold text-lg">{animal.name}</div>
                  <div className="text-xs text-white/85">{animal.biomeLabel}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectAnimal(animal)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 text-stone-900 text-xs font-semibold hover:bg-white cursor-pointer"
                >
                  Ochish
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Diet icons */}
            <div className="p-4 border-t border-stone-100">
              <div className="text-xs font-semibold text-stone-500 mb-2">Asosiy ozuqasi:</div>
              <div className="grid grid-cols-4 gap-2">
                {animal.foods.map((f) => (
                  <div key={f.id} className="flex flex-col items-center text-center p-2 rounded-xl bg-[#FAF8F4]">
                    <FoodIllustration type={f.icon} className="w-9 h-9" />
                    <span className="text-[11px] font-medium text-stone-700 mt-1 leading-tight">
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Metrics Comparison */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 space-y-6">
        <h2 className="font-display text-xl font-bold text-stone-900">
          Vizual ko‘rsatkichlar taqqoslanishi
        </h2>

        {/* Speed */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-stone-600">
            <span>{left.name}: {left.speedKmh} km/soat</span>
            <span className="text-stone-900">Maksimal tezlik</span>
            <span>{right.name}: {right.speedKmh} km/soat</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-stone-100 rounded-l-full overflow-hidden flex justify-end">
              <div
                className="h-full bg-emerald-600 rounded-l-full"
                style={{ width: `${Math.round((left.speedKmh / maxSpeed) * 100)}%` }}
              />
            </div>
            <div className="h-3 bg-stone-100 rounded-r-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-r-full"
                style={{ width: `${Math.round((right.speedKmh / maxSpeed) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-stone-600">
            <span>{left.name}: {left.weightLabel}</span>
            <span className="text-stone-900">O‘rtacha vazn</span>
            <span>{right.name}: {right.weightLabel}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-stone-100 rounded-l-full overflow-hidden flex justify-end">
              <div
                className="h-full bg-emerald-600 rounded-l-full"
                style={{ width: `${Math.max(6, Math.round((left.weightAvgKg / maxWeight) * 100))}%` }}
              />
            </div>
            <div className="h-3 bg-stone-100 rounded-r-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-r-full"
                style={{ width: `${Math.max(6, Math.round((right.weightAvgKg / maxWeight) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Height */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-stone-600">
            <span>{left.name}: {left.heightLabel}</span>
            <span className="text-stone-900">Bo‘y / O‘lcham</span>
            <span>{right.name}: {right.heightLabel}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-stone-100 rounded-l-full overflow-hidden flex justify-end">
              <div
                className="h-full bg-emerald-600 rounded-l-full"
                style={{ width: `${Math.max(8, Math.round((left.heightAvgCm / maxHeight) * 100))}%` }}
              />
            </div>
            <div className="h-3 bg-stone-100 rounded-r-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-r-full"
                style={{ width: `${Math.max(8, Math.round((right.heightAvgCm / maxHeight) * 100))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QuizViewProps {
  animals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ animals, onSelectAnimal }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);

  // Build deterministic 5-question quiz sampled evenly across the full animal list
  const quizQuestions = React.useMemo(() => {
    const count = animals.length;
    const pickedIndices = [0, 1, 2, 3, 4].map(
      (i) => (Math.floor((i * count) / 5) + seed * 7) % count
    );
    return pickedIndices.map((targetIdx) => {
      const target = animals[targetIdx];
      const distractors = [
        animals[(targetIdx + 3) % count],
        animals[(targetIdx + 11) % count],
        animals[(targetIdx + 23) % count],
      ];
      const options = [target, ...distractors].sort((a, b) => a.name.localeCompare(b.name));
      return { target, options };
    });
  }, [animals, seed]);

  const currentQ = quizQuestions[questionIndex];
  const isFinished = questionIndex >= quizQuestions.length;

  const handleChoose = (optId: string) => {
    if (selectedAnswerId) return;
    setSelectedAnswerId(optId);
    if (optId === currentQ.target.id) {
      setScore((s) => s + 1);
      playFeedChime();
    }
  };

  const handleNext = () => {
    setSelectedAnswerId(null);
    setQuestionIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setSeed((s) => s + 1);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswerId(null);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="rounded-2xl bg-white border border-stone-200 p-8 text-center space-y-4">
          <div className="w-24 h-24 mx-auto">
            <AnimalArtwork animalId="burgut" className="w-full h-full" />
          </div>
          <h1 className="font-display text-3xl font-bold text-stone-900">
            Viktorina yakunlandi!
          </h1>
          <p className="text-base text-stone-600 tabular-nums">
            Siz {quizQuestions.length} ta savoldan{' '}
            <strong className="text-emerald-800">{score} tasiga</strong> to‘g‘ri javob berdingiz.
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#142419] text-white text-sm font-semibold hover:bg-[#1E3625] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Qaytadan o‘ynash
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
            Ovoz va yashash joyidan toping
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Maslahatlar va ovozni tinglab, qaysi hayvon ekanligini toping!
          </p>
        </div>
        <span className="text-sm font-semibold text-stone-600 tabular-nums">
          {questionIndex + 1} / {quizQuestions.length}
        </span>
      </div>

      {/* Clue Stage: Habitat + Food + Sound */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <HabitatScene biome={currentQ.target.biome} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center p-4 text-center">
            {selectedAnswerId ? (
              <AnimalArtwork animalId={currentQ.target.id} className="w-32 h-32 drop-shadow-xl" />
            ) : (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Yashash joyi: {currentQ.target.biomeLabel}
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => playAnimalSound(currentQ.target.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-stone-900 font-semibold text-sm shadow-md hover:bg-amber-50 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                    Ovozini eshitish ({currentQ.target.soundLabel})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Food clues */}
        <div className="p-5 bg-[#FAF8F4] border-t border-stone-200">
          <div className="text-xs font-semibold text-stone-500 mb-2.5">
            Bu hayvon nimalarni yeydi?
          </div>
          <div className="grid grid-cols-4 gap-3">
            {currentQ.target.foods.map((f) => (
              <div key={f.id} className="bg-white rounded-xl p-2.5 border border-stone-200 flex flex-col items-center text-center">
                <FoodIllustration type={f.icon} className="w-10 h-10" />
                <span className="text-xs font-medium text-stone-800 mt-1">{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentQ.options.map((opt) => {
          const isChosen = selectedAnswerId === opt.id;
          const isCorrect = opt.id === currentQ.target.id;
          let btnClass = 'bg-white border-stone-200 hover:border-stone-400 text-stone-900';

          if (selectedAnswerId) {
            if (isCorrect) {
              btnClass = 'bg-emerald-50 border-emerald-600 text-emerald-950';
            } else if (isChosen) {
              btnClass = 'bg-red-50 border-red-500 text-red-950';
            } else {
              btnClass = 'bg-white border-stone-200 opacity-50';
            }
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleChoose(opt.id)}
              disabled={Boolean(selectedAnswerId)}
              className={`p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <AnimalArtwork animalId={opt.id} className="w-12 h-12 shrink-0" />
                <div>
                  <div className="font-display font-bold text-base">{opt.name}</div>
                  <div className="text-xs text-stone-500">{opt.climate}</div>
                </div>
              </div>
              {selectedAnswerId && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
              {selectedAnswerId && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {selectedAnswerId && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => onSelectAnimal(currentQ.target)}
            className="text-sm font-semibold text-emerald-800 hover:underline cursor-pointer"
          >
            {currentQ.target.name} haqida to‘liq o‘qish
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-[#142419] text-white text-sm font-semibold hover:bg-[#1E3625] cursor-pointer"
          >
            Keyingi savol
          </button>
        </div>
      )}
    </div>
  );
};
