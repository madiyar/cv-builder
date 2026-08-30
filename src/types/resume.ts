// Subset of the JSON Resume schema (https://jsonresume.org/schema) used by this app.

export interface Location {
  city: string;
  countryCode: string;
  region?: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone?: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Project {
  name: string;
  stack?: string;
  url?: string;
  description?: string;
  summary?: string;
  keywords?: string[];
  highlights?: string[];
}

export interface Work {
  name: string;
  url?: string;
  position: string;
  location: Location;
  startDate: string;
  endDate?: string;
  projects: Project[];
}

export interface Education {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score?: string;
  location: Location;
}

export interface Skill {
  name: string;
  keywords: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Resume {
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
}
