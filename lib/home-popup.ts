import { revalidatePath } from 'next/cache';
import HomePopup from '../models/HomePopup';
import {
  DEFAULT_HOME_POPUP_ALT,
  DEFAULT_HOME_POPUP_IMAGE,
  HOME_POPUP_KEY,
} from './home-popup-constants';
import { toSafeImageSrc } from './image-source';
import type { HomePopupInput } from './validations/home-popup';

export interface HomePopupSettings {
  enabled: boolean;
  image: string;
  alt: string;
  updatedAt?: string;
}

const fallbackHomePopup: HomePopupSettings = {
  enabled: true,
  image: DEFAULT_HOME_POPUP_IMAGE,
  alt: DEFAULT_HOME_POPUP_ALT,
};

interface HomePopupDocument {
  enabled?: boolean;
  image?: string;
  alt?: string;
  updatedAt?: Date;
}

function mapHomePopup(doc?: HomePopupDocument | null): HomePopupSettings {
  if (!doc) return fallbackHomePopup;

  return {
    enabled: doc.enabled ?? true,
    image: toSafeImageSrc(doc.image, DEFAULT_HOME_POPUP_IMAGE),
    alt: doc.alt || DEFAULT_HOME_POPUP_ALT,
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

async function connectToDb() {
  const { default: dbConnect } = await import('./db');
  await dbConnect();
}

async function ensureHomePopupDocument() {
  await connectToDb();

  const existing = await HomePopup.findOne({ settingKey: HOME_POPUP_KEY });
  if (existing) return existing;

  try {
    return await HomePopup.create({
      settingKey: HOME_POPUP_KEY,
      enabled: fallbackHomePopup.enabled,
      image: fallbackHomePopup.image,
      alt: fallbackHomePopup.alt,
    });
  } catch (error) {
    const racedDocument = await HomePopup.findOne({ settingKey: HOME_POPUP_KEY });

    if (racedDocument) return racedDocument;

    throw error;
  }
}

export async function getHomePopupSettings(): Promise<HomePopupSettings> {
  try {
    const popup = await ensureHomePopupDocument();
    return mapHomePopup(popup);
  } catch (error) {
    console.warn('Home popup settings fallback used:', error);
    return fallbackHomePopup;
  }
}

export async function updateHomePopupSettings(
  data: HomePopupInput,
  updatedBy?: string,
): Promise<HomePopupSettings> {
  await connectToDb();

  const popup = await HomePopup.findOneAndUpdate(
    { settingKey: HOME_POPUP_KEY },
    {
      $set: {
        settingKey: HOME_POPUP_KEY,
        enabled: data.enabled,
        image: data.image,
        alt: data.alt || DEFAULT_HOME_POPUP_ALT,
        updatedBy,
      },
    },
    {
      returnDocument: 'after',
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  try {
    revalidatePath('/');
  } catch (error) {
    console.warn('Home popup revalidation skipped:', error);
  }

  return mapHomePopup(popup);
}
