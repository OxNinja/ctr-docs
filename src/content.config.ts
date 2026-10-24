
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = z.array(z.enum([
  'any-percent-nmg',
  '101-percent',
]));

const notes = z.array(z.object({
  title: z.string(),
  content: z.string(),
}));

const shortcut = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categories,
  timeSave: z.object({
    minSeconds: z.number().nonnegative().optional(),
    maxSeconds: z.number().nonnegative().optional(),
  }).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  video: z.object({
    youtubeUrl: z.string(),
    timestamp: z.string(),
  }).optional(),
  steps: z.array(z.object({
    instruction: z.string(),
    cue: z.string().optional(),
    image: z.string().optional(),
  })),
});

const tracks = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: './src/data/tracks',
  }),

  schema: z.object({
    title: z.string(),
    slug: z.string(),
    difficulty: z.enum([
        'beginner',
        'intermediate',
        'advanced',
      ]),
    description: z.string(),
    categories,
    notes,

    boss: z.object({
      isBossTrack: z.boolean(),
      name: z.string().optional(),
    }),

    ctrToken: z.object({
      available: z.boolean(),
      mapMarkers: z.array(z.object({
        letter: z.enum(['C', 'T', 'R']),
        x: z.number().min(0).max(100),
        y: z.number().min(0).max(100),
        description: z.string().optional(),
      })).optional(),
    }),

    relicRace: z.object({
      available: z.boolean(),
      strategy: z.string().optional(),
    }),

    assets: z.object({
      thumbnail: z.string(),
      minimap: z.string(),
    }),

    routes: z.array(z.object({
      id: z.string(),
      name: z.string(),
      difficulty: z.enum([
        'beginner',
        'intermediate',
        'advanced',
      ]),
      categories,
      steps: z.array(z.object({
        step: z.number().int().min(1),
        description: z.string().optional(),
        shortcut: z.string().optional(),
      })),
    })),

    shortcuts: z.array(shortcut),

    timeTargets: z.object({
      nTropyUnlock: z.string().optional(),
      nTropyGhost: z.string().optional(),
      oxideGhost: z.string().optional(),
    }),
  }),
});

export const collections = { 
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  tracks
};
