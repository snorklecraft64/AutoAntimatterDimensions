import { buyAsManyAsYouCanBuy, buyMaxDimension, buyOneDimension } from "./globals";
import { landmarkIDs as IDs} from "./constants.js"

export const Completer = (function() {
  return {
    tick() {
      if (!player.completer.isOn) return;

      switch(player.completer.lastLandmarkAchieved) {
        case -1:
          buyOneDimension(1);
          break;
        case 0:
          if (player.dimensions.antimatter[0].bought < 10) buyOneDimension(1);
          else buyMaxDimension(1, 1);
          buyOneDimension(2);
          break;
        case 1:
          buyMaxDimension(1, 1);
          if (player.dimensions.antimatter[1].bought < 10) buyOneDimension(2);
          else buyMaxDimension(2, 1);
          buyOneDimension(3);
      }
    }
  };
}());

export class LandmarkState {
  constructor(config) {
    this.config = config;
  }

  get isReached() {
    switch(this.config.id){
      case 0: // FirstDimensionBoost
        if (player.completer.lastLandmarkAchieved >= IDs.FirstDim) return true;
        else if (player.dimensions.antimatter[0].bought >= 1) {
        player.completer.lastLandmarkAchieved = IDs.FirstDim;
        return true;
        }
        else return false;
      case 1:
        if (player.completer.lastLandmarkAchieved >= IDs.SecondDim) return true;
        else if (player.dimensions.antimatter[1].bought >= 1) {
          player.completer.lastLandmarkAchieved = IDs.SecondDim;
          return true;
        }
        else return false;
      case 2:
        if (player.completer.lastLandmarkAchieved >= IDs.ThirdDim) return true;
        else if (player.dimensions.antimatter[2].bought >= 1) {
          player.completer.lastLandmarkAchieved = IDs.ThirdDim;
          return true;
        }
        else return false;
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