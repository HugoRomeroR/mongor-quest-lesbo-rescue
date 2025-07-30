import { useConfigContext } from '@/utils/global-config/ConfigContext';
import * as CT from '@/utils/global-config/configTypes';

export function useConfig() {
  const {
    visual,
    handleSetVisual,
    ftu,
    handleSetFtu,
    sound,
    handleSetSound,
  } = useConfigContext();

  return {
    get floatModal() {
      return visual.floatModal;
    },
    set floatModal(value: CT.VisualMap['floatModal']) {
      handleSetVisual('floatModal', value);
    },

    get darkMode() {
      return visual.darkMode;
    },
    set darkMode(value: CT.VisualMap['darkMode']) {
      handleSetVisual('darkMode', value);
    },

    get prelude() {
      return ftu.prelude;
    },
    set prelude(value: CT.FtuMap['prelude']) {
      handleSetFtu('prelude', value);
    },

    get globalVolume() {
      return sound.global;
    },
    set globalVolume(value: CT.SoundMap['global']) {
      handleSetSound('global', value);
    },

    get musicVolume() {
      return sound.music;
    },
    set musicVolume(value: CT.SoundMap['music']) {
      handleSetSound('music', value);
    },

    get sfxVolume() {
      return sound.sfx;
    },
    set sfxVolume(value: CT.SoundMap['sfx']) {
      handleSetSound('sfx', value);
    },

    get dialogVolume() {
      return sound.dialog;
    },
    set dialogVolume(value: CT.SoundMap['dialog']) {
      handleSetSound('dialog', value);
    },
  };
}