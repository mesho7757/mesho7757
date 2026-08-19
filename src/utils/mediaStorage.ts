// IndexedDB Storage Engine for permanent photos, videos, and custom MP3 soundtrack

export interface StoredMediaItem {
  id: string;
  name: string;
  type: 'photo' | 'video';
  dataUrl: string;
  blob?: Blob;
  dominantColor: string;
  createdAt: number;
}

const DB_NAME = 'OmarAlafSanctuaryDB';
const DB_VERSION = 1;
const STORE_MEDIA = 'garden_media';
const STORE_AUDIO = 'custom_audio';
const STORE_GOLDEN = 'golden_media';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_MEDIA)) {
        db.createObjectStore(STORE_MEDIA, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_AUDIO)) {
        db.createObjectStore(STORE_AUDIO, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_GOLDEN)) {
        db.createObjectStore(STORE_GOLDEN, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

const FLOWER_COLORS = [
  '#f43f5e', // Rose
  '#fb7185', // Pink
  '#f59e0b', // Amber
  '#ec4899', // Magenta
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#e11d48', // Ruby
  '#d97706', // Golden honey
  '#a855f7', // Purple
  '#3b82f6', // Sapphire
  '#f97316', // Orange
];

export const mediaStorage = {
  async getAllGardenMedia(): Promise<StoredMediaItem[]> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_MEDIA, 'readonly');
        const store = tx.objectStore(STORE_MEDIA);
        const req = store.getAll();
        req.onsuccess = () => {
          const items: StoredMediaItem[] = req.result || [];
          items.sort((a, b) => a.createdAt - b.createdAt);
          resolve(items);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('Failed to read from IndexedDB:', e);
      return [];
    }
  },

  async addGardenMediaFiles(files: File[]): Promise<StoredMediaItem[]> {
    const db = await openDB();
    const newItems: StoredMediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith('video') || file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i);
      const id = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const randomColor = FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];

      const dataUrl = await fileToDataUrl(file);

      const item: StoredMediaItem = {
        id,
        name: file.name,
        type: isVideo ? 'video' : 'photo',
        dataUrl,
        dominantColor: randomColor,
        createdAt: Date.now() + i,
      };

      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_MEDIA, 'readwrite');
        const store = tx.objectStore(STORE_MEDIA);
        const req = store.put(item);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });

      newItems.push(item);
    }

    return newItems;
  },

  async deleteGardenMedia(id: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readwrite');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async clearAllGardenMedia(): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_MEDIA, 'readwrite');
      const store = tx.objectStore(STORE_MEDIA);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async saveGoldenMedia(file: File): Promise<{ type: 'photo' | 'video'; dataUrl: string; name: string }> {
    const db = await openDB();
    const isVideo = file.type.startsWith('video') || file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i);
    const mediaType: 'photo' | 'video' = isVideo ? 'video' : 'photo';
    const dataUrl = await fileToDataUrl(file);
    const item: { id: string; type: 'photo' | 'video'; dataUrl: string; name: string; updatedAt: number } = {
      id: 'golden_memory',
      type: mediaType,
      dataUrl,
      name: file.name,
      updatedAt: Date.now(),
    };


    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_GOLDEN, 'readwrite');
      const store = tx.objectStore(STORE_GOLDEN);
      const req = store.put(item);
      req.onsuccess = () => resolve(item);
      req.onerror = () => reject(req.error);
    });
  },

  async getGoldenMedia(): Promise<{ type: 'photo' | 'video'; dataUrl: string; name: string } | null> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_GOLDEN, 'readonly');
        const store = tx.objectStore(STORE_GOLDEN);
        const req = store.get('golden_memory');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  },

  async removeGoldenMedia(): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_GOLDEN, 'readwrite');
      const store = tx.objectStore(STORE_GOLDEN);
      const req = store.delete('golden_memory');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  async saveCustomAudio(file: File): Promise<string> {
    const db = await openDB();
    const dataUrl = await fileToDataUrl(file);
    const item = {
      id: 'background_soundtrack',
      name: file.name,
      dataUrl,
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_AUDIO, 'readwrite');
      const store = tx.objectStore(STORE_AUDIO);
      const req = store.put(item);
      req.onsuccess = () => resolve(dataUrl);
      req.onerror = () => reject(req.error);
    });
  },

  async getCustomAudio(): Promise<{ name: string; dataUrl: string } | null> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_AUDIO, 'readonly');
        const store = tx.objectStore(STORE_AUDIO);
        const req = store.get('background_soundtrack');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  },
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
