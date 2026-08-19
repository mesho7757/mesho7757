export interface MemoryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle: string;
  caption: string;
  date?: string;
  aspectRatio: string;
  imageSrc?: string;
  videoSrc?: string;
  thumbnailSrc?: string;
  dominantColor: string;
  tag: string;
}

export type ComfortOption = 'hug' | 'smile' | 'reassurance' | 'love' | 'stay';

export interface SecretNote {
  id: string;
  phrase: string;
  translation?: string;
  speaker: 'Omar' | 'Alaf';
  hint: string;
}

export type ExperienceSection =
  | 'welcome'
  | 'passcode'
  | 'envelope'
  | 'letter'
  | 'journey';
