/**
 * Every word on the page lives here. Components render from these
 * objects and never hard-code copy. See docs/superpowers/specs for why.
 */

export interface Link {
  label: string;
  href: string;
}

export interface Links {
  linkedin: string;
  github: string;
  email: string;
}

export interface Nav {
  items: Link[];
  cta: Link;
}

export interface Hero {
  headlineLead: string;
  headlineAccent: string;
  lede: string;
  primary: Link;
  secondary: Link;
  byline: string;
  /** Add when a current CV exists; it replaces `secondary`. */
  cv?: Link;
}

export interface StripFact {
  key: string;
  value: string;
  support: string;
}

export interface AiWork {
  title: string;
  intro: string;
  items: { title: string; line: string }[];
}

export interface About {
  title: string;
  body: string;
  aside: string;
}

export interface BasedIn {
  title: string;
  body: string;
  clockLabel: 'Lisbon time';
  timeZone: 'Europe/Lisbon';
}

export interface ExperienceEntry {
  period: string;
  role: string;
  org: string;
  sub?: string;
  note?: string;
}

export interface Toolbox {
  title: string;
  highlighted: string[];
  plain: string[];
}

export interface Connect {
  linkedinHandle: 'andrenunes-work';
  githubHandle: 'anunes9';
  copyLabel: 'copy address';
  copiedLabel: 'copied';
}

export type ProjectImage = 'fran' | 'bluesoul' | 'espinhal' | 'trt';

export interface Projects {
  title: string;
  intro: string;
  items: { name: string; line: string; url: string; image: ProjectImage }[];
}

export interface Band {
  headlineLead: string;
  headlineAccent: string;
  line: string;
  cta: Link;
}

export interface Meta {
  title: string;
  description: string;
  footerRight: 'Built with care in Lisbon';
  name: 'André Nunes';
}

export const links: Links = {
  linkedin: 'https://www.linkedin.com/in/andrenunes-work/',
  github: 'https://github.com/anunes9',
  email: 'andrenunes.work@gmail.com',
};

const startConversation: Link = { label: 'Start a conversation', href: links.linkedin };

export const nav: Nav = {
  items: [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
  ],
  cta: startConversation,
};

export const hero: Hero = {
  headlineLead: 'From client idea to shipped product,',
  headlineAccent: 'with AI in the loop.',
  lede: 'I sit between clients and engineers at Runtime Revolution: I help clients decide what to build, help my teams work out how, and still ship code myself.',
  primary: startConversation,
  secondary: { label: 'See the work', href: '#work' },
  byline: 'Team Leader at Runtime Revolution · Lisbon, Portugal',
};

export const careerStart = 2018;

export const aiWork: AiWork = {
  title: 'Where AI sits in the product, not just the process',
  intro: 'Four things shipped with clients recently. Names left out, the work speaks.',
  items: [
    { title: 'Deal parsing from partner sites', line: 'Parses partner websites for live deals so users get a better offer than the one on the page.' },
    { title: 'Interactive prompts in travel articles', line: 'Interactive prompts inside travel articles that engage readers and turn them into travel leads.' },
    { title: 'Image scan to marketplace listing', line: 'Scans an image for items and publishes them straight into a marketplace.' },
    { title: 'Negotiation agent for the marketplace', line: "Negotiates marketplace items on the user's behalf." },
  ],
};

export const about: About = {
  title: "Hi, I'm André. A developer from Lisbon who likes to know how things are made and why.",
  body: 'I started mobile, learned the backend because the project needed it, and grew into leading teams. These days I sit between clients and engineers, and I like it there: close enough to the idea to shape it, close enough to the code to ship it. AI tooling is in hand from the first sketch, on every project.',
  aside: 'Off the clock: padel, music, cars, and long walks with the dog.',
};

export const basedIn: BasedIn = {
  title: 'Oeiras, Lisbon',
  body: 'Same time zone as London, all year. Overlaps nicely with most of Europe, mornings with the US east coast.',
  clockLabel: 'Lisbon time',
  timeZone: 'Europe/Lisbon',
};

export const experience: ExperienceEntry[] = [
  {
    period: '2023 → now',
    role: 'Team Leader, AI-first projects',
    org: 'Runtime Revolution',
    sub: 'Full Stack Developer until 2025',
    note: 'Back for a second stint: first rebuilding the core of a travel and promotions product, now leading teams on client projects built with AI tooling from day one.',
  },
  {
    period: '2022 → 2023',
    role: 'Full Stack Developer',
    org: 'Volkswagen Digital Solutions',
    note: 'XP, pairing and TDD every day. Vehicle production tracking, contract generation and e-signing, and an electric-vehicle proof of concept from inception to build.',
  },
  {
    period: '2018 → 2022',
    role: 'Full Stack & Mobile Developer',
    org: 'Runtime Revolution',
    note: 'Built a healthcare records app from scratch in React Native, then its web app and Rails API. Later lead developer and team manager on a sports app.',
  },
  {
    period: '2018',
    role: "Bachelor's degree in Information Technologies",
    org: 'Faculdade de Ciências, University of Lisbon',
  },
];

export const toolbox: Toolbox = {
  title: 'What I reach for',
  highlighted: ['TypeScript', 'React', 'React Native', 'Ruby on Rails', 'Claude Code'],
  plain: ['Node.js', 'PostgreSQL', 'AWS', 'Lambda', 'Redis', 'Kafka', 'ElasticSearch', 'TDD', 'Pair programming', 'AI-first delivery', 'Team leadership'],
};

export const connect: Connect = {
  linkedinHandle: 'andrenunes-work',
  githubHandle: 'anunes9',
  copyLabel: 'copy address',
  copiedLabel: 'copied',
};

export const projects: Projects = {
  title: 'Four live sites, built on the side',
  intro: 'A padel academy, a dive travel company, a country guesthouse and a trail-bike community. Each one started as an idea someone brought me.',
  items: [
    { name: 'Fran Padel Project', line: 'Padel academy · clinics & bookings', url: 'https://www.franpadelproject.com/', image: 'fran' },
    { name: 'Blue Soul Journeys', line: 'Dive travel · multilingual, destinations & inquiries', url: 'https://www.bluesouljourneys.com/en', image: 'bluesoul' },
    { name: 'Quinta do Espinhal', line: 'Guesthouse · gallery & reservations', url: 'https://www.espinhal-artesanal.com/', image: 'espinhal' },
    { name: 'TRT Adv', line: 'Trail bike community · rides & kit', url: 'https://www.trtadv.com/', image: 'trt' },
  ],
};

export function strip(now: Date): StripFact[] {
  return [
    { key: 'Track record', value: `${now.getFullYear() - careerStart} years`, support: 'Shipping web and mobile since 2018' },
    { key: 'Industries', value: 'Healthcare · Automotive · Travel', support: 'From medical records to vehicle production' },
    { key: 'On the side', value: `${projects.items.length} live sites`, support: 'Built for real small businesses' },
  ];
}

export const band: Band = {
  headlineLead: 'Have a product that needs',
  headlineAccent: 'building',
  line: 'Happy to talk about leading teams, AI-first delivery, or an idea you want sketched out. The quickest way to reach me is a LinkedIn message.',
  cta: startConversation,
};

export const meta: Meta = {
  title: 'André Nunes — Team Leader, AI-first projects',
  description: 'Team Leader at Runtime Revolution in Lisbon. From client idea to shipped product, with AI in the loop.',
  footerRight: 'Built with care in Lisbon',
  name: 'André Nunes',
};
