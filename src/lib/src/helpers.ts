import { StateConfig } from './handlers';
import { MST_NGRX_EFFECT } from './effects';

export const fromStateConfigToState = (stateConfig: StateConfig<any> | StateConfig<any>[]) => {
  return Array.isArray(stateConfig)
    ? stateConfig.reduce((acc, sc) => ({ ...acc, [sc.stateName]: sc.initialState }), {})
    : { [stateConfig.stateName]: stateConfig.initialState };
};

export const fromEffectsObjectsToEffects = (effectsObjects: any[]) => {
  return effectsObjects.reduce((acc, objectWithEffects) => {
    const effectsFromCurrentObject = Object.getOwnPropertyNames(objectWithEffects)
      .filter(prop => objectWithEffects[prop].type === MST_NGRX_EFFECT)
      .map(prop => objectWithEffects[prop]());

    return [...acc, ...effectsFromCurrentObject];
  }, []);
};
