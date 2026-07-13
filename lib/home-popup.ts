import { revalidatePath } from 'next/cache';
import prisma from './db';
import { logExpectedDbFallback } from './db-fallback-log';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHomePopup(doc?: any | null): HomePopupSettings {
  if (!doc) return fallbackHomePopup;

  return {
    enabled: doc.enabled ?? true,
    image: toSafeImageSrc(doc.image, DEFAULT_HOME_POPUP_IMAGE),
    alt: doc.alt || DEFAULT_HOME_POPUP_ALT,
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

async function ensureHomePopupDocument() {
  const existing = await prisma.homePopup.findUnique({
    where: { settingKey: HOME_POPUP_KEY },
  });
  if (existing) return existing;

  try {
    return await prisma.homePopup.create({
      data: {
        settingKey: HOME_POPUP_KEY,
        enabled: fallbackHomePopup.enabled,
        image: fallbackHomePopup.image,
        alt: fallbackHomePopup.alt,
      },
    });
  } catch (error) {
    const racedDocument = await prisma.homePopup.findUnique({
      where: { settingKey: HOME_POPUP_KEY },
    });

    if (racedDocument) return racedDocument;

    throw error;
  }
}

export async function getHomePopupSettings(): Promise<HomePopupSettings> {
  try {
    const popup = await ensureHomePopupDocument();
    return mapHomePopup(popup);
  } catch (error) {
    logExpectedDbFallback('Home popup settings fallback used:', error);
    return fallbackHomePopup;
  }
}

export async function updateHomePopupSettings(
  data: HomePopupInput,
  updatedBy?: string,
): Promise<HomePopupSettings> {
  const popup = await prisma.homePopup.upsert({
    where: { settingKey: HOME_POPUP_KEY },
    update: {
      enabled: data.enabled,
      image: data.image,
      alt: data.alt || DEFAULT_HOME_POPUP_ALT,
      updatedBy,
    },
    create: {
      settingKey: HOME_POPUP_KEY,
      enabled: data.enabled,
      image: data.image,
      alt: data.alt || DEFAULT_HOME_POPUP_ALT,
      updatedBy,
    },
  });

  try {
    revalidatePath('/');
  } catch (error) {
    console.warn('Home popup revalidation skipped:', error);
  }

  return mapHomePopup(popup);
}
