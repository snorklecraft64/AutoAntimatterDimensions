  import { buyAsManyAsYouCanBuy, buyMaxDimension, buyMaxTickSpeed, buyOneDimension, manualRequestDimensionBoost, manualRequestGalaxyReset, maxAll } from "./globals";
  import { landmarkIDs as IDs} from "./constants.js";
  import { DC } from "./constants.js";

  export const Completer = (function() {
    return {
      tick() {
        if (!player.completer.isOn) return;

        switch(player.completer.lastLandmarkAchieved) {
          case -1:
            buyOneDimension(1);
            break;
          case IDs.FirstDim:
            buyOneDimension(1);
            buyOneDimension(2);
            break;
          case IDs.SecondDim:
            maxAll();
            buyOneDimension(2);
            buyOneDimension(3);
            break;
          case IDs.ThirdDim:
            maxAll();
            buyOneDimension(3);
            buyOneDimension(4);
            break;
          case IDs.FourthDim:
            maxAll();
            buyOneDimension(4);
            manualRequestDimensionBoost(false);
            break;
          case IDs.FirstDimBoost:
            maxAll();
            if (player.dimensions.antimatter[0].bought < 10) buyOneDimension(1);
            else if (player.dimensions.antimatter[1].bought < 10) buyOneDimension(2);
            else if (player.dimensions.antimatter[2].bought < 10) buyOneDimension(3);
            else if (player.dimensions.antimatter[3].bought < 10) buyOneDimension(4);
            buyOneDimension(5);
            manualRequestDimensionBoost(false);
            break;
          case IDs.SecondDimBoost:
            maxAll();
            if (player.dimensions.antimatter[0].bought < 10) buyOneDimension(1);
            else if (player.dimensions.antimatter[1].bought < 10) buyOneDimension(2);
            else if (player.dimensions.antimatter[2].bought < 10) buyOneDimension(3);
            else if (player.dimensions.antimatter[3].bought < 10) buyOneDimension(4);
            else if (player.dimensions.antimatter[4].bought < 10) buyOneDimension(5);
            buyOneDimension(6);
            maxAll();
            manualRequestDimensionBoost(false);
            break;
          case IDs.ThirdDimBoost:
            maxAll();
            if (player.dimensions.antimatter[0].bought < 10) buyOneDimension(1);
            else if (player.dimensions.antimatter[1].bought < 10) buyOneDimension(2);
            else if (player.dimensions.antimatter[2].bought < 10) buyOneDimension(3);
            else if (player.dimensions.antimatter[3].bought < 10) buyOneDimension(4);
            else if (player.dimensions.antimatter[4].bought < 10) buyOneDimension(5);
            else if (player.dimensions.antimatter[5].bought < 10) buyOneDimension(6);
            buyOneDimension(7);
            maxAll();
            manualRequestDimensionBoost(false);
            break;
          case IDs.FourthDimBoost:
            if (Sacrifice.nextBoost.gte(2.00)) sacrificeReset();
            maxAll();
            if (player.dimensions.antimatter[0].bought < 10) buyOneDimension(1);
            else if (player.dimensions.antimatter[1].bought < 10) buyOneDimension(2);
            else if (player.dimensions.antimatter[2].bought < 10) buyOneDimension(3);
            else if (player.dimensions.antimatter[3].bought < 10) buyOneDimension(4);
            else if (player.dimensions.antimatter[4].bought < 10) buyOneDimension(5);
            else if (player.dimensions.antimatter[5].bought < 10) buyOneDimension(6);
            else if (player.dimensions.antimatter[6].bought < 10) buyOneDimension(7);
            buyOneDimension(8);
            manualRequestDimensionBoost(false);
            manualRequestGalaxyReset(false);
            break;
          case IDs.FirstGalaxy:
            break;
        }

        checkLandmarks();
      }
    };
  }());

  export class LandmarkState {
    constructor(config) {
      this.config = config;
    }

    get isReached() {
      if (this.config.id <= player.completer.lastLandmarkAchieved)
        return true;

      return false
    }
  }
  export const Landmark = mapGameDataToObject(
    GameDatabase.landmarks,
    config => (config.isBaseResource
      ? new LandmarkState(config)
      : new LandmarkState(config))
  );

  function checkLandmarks() {
    // fallthrough allowed on purpose, check for every landmark not achieved
    // done in case someone turns on the completer late into a run
    switch (player.completer.lastLandmarkAchieved) {
      case -1:
        if (player.dimensions.antimatter[0].bought >= 1)
          player.completer.lastLandmarkAchieved = IDs.FirstDim;
      case IDs.FirstDim:
        if (player.dimensions.antimatter[1].bought >= 1)
          player.completer.lastLandmarkAchieved = IDs.SecondDim;
      case IDs.SecondDim:
        if (player.dimensions.antimatter[2].bought >= 1)
          player.completer.lastLandmarkAchieved = IDs.ThirdDim;
      case IDs.ThirdDim:
        if (player.dimensions.antimatter[3].bought >= 1)
          player.completer.lastLandmarkAchieved = IDs.FourthDim;
      case IDs.FourthDim:
        if (player.dimensionBoosts >= 1)
          player.completer.lastLandmarkAchieved = IDs.FirstDimBoost;
      case IDs.FirstDimBoost:
        if (player.dimensionBoosts >= 2)
          player.completer.lastLandmarkAchieved = IDs.SecondDimBoost;
      case IDs.SecondDimBoost:
        if (player.dimensionBoosts >= 3)
          player.completer.lastLandmarkAchieved = IDs.ThirdDimBoost;
      case IDs.ThirdDimBoost:
        if (player.dimensionBoosts >= 4)
          player.completer.lastLandmarkAchieved = IDs.FourthDimBoost;
      case IDs.FourthDimBoost:
        if (player.galaxies >= 1)
          player.completer.lastLandmarkAchieved = IDs.FirstGalaxy;
      case IDs.FirstGalaxy:
        if (player.galaxies >= 2)
          player.completer.lastLandmarkAchieved = IDs.SecondGalaxy;
      case IDs.SecondGalaxy:
        if (player.infinities.gte(DC.D1))
          player.completer.lastLandmarkAchieved = IDs.FirstInfinity;
    }    
  }