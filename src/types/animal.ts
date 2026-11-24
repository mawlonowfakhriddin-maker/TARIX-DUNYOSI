export type Category = 'herbivore' | 'carnivore';

export type AnimType =
  | 'graze'
  | 'gallop'
  | 'leap'
  | 'roar'
  | 'pounce'
  | 'fly'
  | 'swim'
  | 'stalk'
  | 'sway';

export type BiomeType =
  | 'farm'
  | 'mountain'
  | 'steppe'
  | 'forest'
  | 'savanna'
  | 'desert'
  | 'tundra'
  | 'jungle'
  | 'river'
  | 'ocean';

export type RegionId =
  | 'africa'
  | 'asia'
  | 'europe'
  | 'north_america'
  | 'south_america'
  | 'australia'
  | 'oceans';

export type FoodIconType =
  | 'grass'
  | 'hay'
  | 'carrot'
  | 'corn'
  | 'apple'
  | 'leaf'
  | 'shrub'
  | 'cabbage'
  | 'banana'
  | 'bark'
  | 'acacia'
  | 'flower'
  | 'cactus'
  | 'mushroom'
  | 'berry'
  | 'zebra'
  | 'deer'
  | 'buffalo'
  | 'boar'
  | 'monkey'
  | 'croc'
  | 'rabbit'
  | 'fish'
  | 'mouse'
  | 'insect'
  | 'bird'
  | 'seal'
  | 'turtle'
  | 'squid'
  | 'bone'
  | 'snake'
  | 'bamboo'
  | 'eucalyptus'
  | 'nut'
  | 'algae'
  | 'honey'
  | 'frog'
  | 'crab'
  | 'lizard'
  | 'egg'
  | 'melon';

export interface FoodItem {
  id: string;
  name: string;
  icon: FoodIconType;
  portion: string;
  note: string;
}

export interface AnimalFact {
  title: string;
  text: string;
  visual: 'vision' | 'speed' | 'brain' | 'teeth' | 'herd' | 'adapt';
}

export interface Animal {
  id: string;
  name: string;
  latin: string;
  category: Category;
  anim: AnimType;
  biome: BiomeType;
  biomeLabel: string;
  regions: RegionId[];
  regionNames: string;
  habitatDetail: string;
  weightLabel: string;
  weightAvgKg: number;
  heightLabel: string;
  heightAvgCm: number;
  speedKmh: number;
  climate: string;
  lifespan: string;
  lifespanMaxYears: number;
  lifestyle: string;
  activeTime: string;
  drink: string;
  dailyFoodAmount: string;
  dietSummary: string;
  soundLabel: string;
  foods: FoodItem[];
  facts: AnimalFact[];
}
