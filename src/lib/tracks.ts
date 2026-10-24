import { getCollection, getEntry } from 'astro:content';

export async function getTrack(id: string) {
  const entry = await getEntry('tracks', id);
  if (!entry) throw new Error(`Unknown track "${id}" (no src/data/tracks/${id}.yaml)`);
  return entry.data;
}