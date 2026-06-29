import { Schema, model, models } from 'mongoose';
import { IMAGE_SOURCE_ERROR, isSafeImageSrc } from '../lib/image-source';
import {
  DEFAULT_HOME_POPUP_ALT,
  DEFAULT_HOME_POPUP_IMAGE,
  HOME_POPUP_KEY,
} from '../lib/home-popup-constants';

const requiredImageSrc = (value?: string) => isSafeImageSrc(value);

const HomePopupSchema = new Schema({
  settingKey: {
    type: String,
    required: true,
    unique: true,
    default: HOME_POPUP_KEY,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide a popup image'],
    default: DEFAULT_HOME_POPUP_IMAGE,
    validate: {
      validator: requiredImageSrc,
      message: IMAGE_SOURCE_ERROR,
    },
  },
  alt: {
    type: String,
    trim: true,
    maxlength: 140,
    default: DEFAULT_HOME_POPUP_ALT,
  },
  updatedBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const HomePopup = models.HomePopup || model('HomePopup', HomePopupSchema);

export default HomePopup;
