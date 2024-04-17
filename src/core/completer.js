export class LandmarkState {
  constructor(config) {
    this.config = config;
  }

  get isReached() {
    switch(this.config.id){
      case 0: // FirstDimensionBoost
        if (player.auto.eternity.mode == 0)
          return true
        else return false
      default:
        return false
    }
  }
}
export const Landmark = mapGameDataToObject(
  GameDatabase.landmarks,
  config => (config.isBaseResource
    ? new LandmarkState(config)
    : new LandmarkState(config))
);