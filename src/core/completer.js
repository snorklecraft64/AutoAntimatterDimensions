  import { buyAsManyAsYouCanBuy, buyMaxDimension, buyMaxTickSpeed, buyOneDimension, manualRequestDimensionBoost, manualRequestGalaxyReset, maxAll } from "./globals";
  import { landmarkIDs as IDs} from "./constants.js";
  import { DC } from "./constants.js";

  export const Completer = (function() {
    return {
      tick() {
        if (!player.completer.isOn) return;

        switch(player.completer.lastLandmarkAchieved) {
          case -1:
            player.completer.status = "Buying Dimension 1's";
            buyOneDimension(1);
            break;
          case IDs.FirstDim:
            buyOneDimension(1);
            if (player.antimatterDimension(1).bought >= 10) player.completer.status = "Waiting to buy Dimension 2";
            buyOneDimension(2);
            break;
          case IDs.SecondDim:
            player.completer.status = "Buying Dimension 2's";
            maxAll();
            buyOneDimension(2);
            if (player.antimatterDimension(2).bought >= 10) player.completer.status = "Waiting to buy Dimension 3";
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
          case IDs.FifthDimBoost:
          case IDs.SixthDimBoost:
          case IDs.SeventhDimBoost:
          case IDs.EighthDimBoost:
          case IDs.FirstGalaxy:
          case IDs.SecondGalaxy:
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
            buyAutobuyersNotBought();
            manualRequestGalaxyReset(false);
            manualRequestDimensionBoost(false);
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
        if (player.dimensions.antimatter[3].bought >= 1) {
          player.completer.lastLandmarkAchieved = IDs.FourthDim;
          player.options.confirmations.dimensionBoost = false; // disable the modal appearing
        }
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
        if (player.dimensionBoosts >= 5)
          player.completer.lastLandmarkAchieved = IDs.FifthDimBoost;
      case IDs.FifthDimBoost:
        if (player.dimensionBoosts >= 6)
          player.completer.lastLandmarkAchieved = IDs.SixthDimBoost;
      case IDs.SixthDimBoost:
        if (player.dimensionBoosts >= 7)
          player.completer.lastLandmarkAchieved = IDs.SeventhDimBoost;
      case IDs.SeventhDimBoost:
        if (player.dimensionBoosts >= 8) {
          player.completer.lastLandmarkAchieved = IDs.EighthDimBoost;
          player.options.confirmations.antimatterGalaxy = false; // disable the modal appearing
        }
      case IDs.EighthDimBoost:
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

  function buyAutobuyersNotBought() {
    if (!Autobuyer.antimatterDimension(1).isBought)
      Autobuyer.antimatterDimension(1).purchase();
    if (!Autobuyer.antimatterDimension(2).isBought)
      Autobuyer.antimatterDimension(2).purchase();
    if (!Autobuyer.antimatterDimension(3).isBought)
      Autobuyer.antimatterDimension(3).purchase();
    if (!Autobuyer.antimatterDimension(4).isBought)
      Autobuyer.antimatterDimension(4).purchase();
    if (!Autobuyer.antimatterDimension(5).isBought)
      Autobuyer.antimatterDimension(5).purchase();
    if (!Autobuyer.antimatterDimension(6).isBought)
      Autobuyer.antimatterDimension(6).purchase();
    if (!Autobuyer.antimatterDimension(7).isBought)
      Autobuyer.antimatterDimension(7).purchase();
    if (!Autobuyer.antimatterDimension(8).isBought)
      Autobuyer.antimatterDimension(8).purchase();
    if (!Autobuyer.tickspeed.isBought)
      Autobuyer.tickspeed.purchase();

    // // stupid optimized version (that didn't even work, but the beauty is too strong)
    // if (!Autobuyer.antimatterDimension(8).isBought) {
    //   if (!Autobuyer.antimatterDimension(7).isBought) {
    //     if (!Autobuyer.antimatterDimension(6).isBought) {
    //       if (!Autobuyer.antimatterDimension(5).isBought) {
    //         if (!Autobuyer.antimatterDimension(4).isBought) {
    //           if (!Autobuyer.antimatterDimension(3).isBought) {
    //             if (!Autobuyer.antimatterDimension(2).isBought) {
    //               if (!Autobuyer.antimatterDimension(1).isBought) {
    //                 Autobuyer.antimatterDimension(1).purchase();
    //               }
    //               Autobuyer.antimatterDimension(2).purchase();
    //             }
    //             Autobuyer.antimatterDimension(3).purchase();
    //           }
    //           Autobuyer.antimatterDimension(4).purchase();
    //         }
    //         Autobuyer.antimatterDimension(5).purchase();  
    //       }
    //       Autobuyer.antimatterDimension(6).purchase();
    //     }
    //     Autobuyer.antimatterDimension(7).purchase();
    //   }
    //   Autobuyer.antimatterDimension(8).purchase();
    // }
  }