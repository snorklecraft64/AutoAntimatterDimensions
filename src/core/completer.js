import { buyAsManyAsYouCanBuy, buyMaxDimension, buyMaxTickSpeed, buyOneDimension, manualBigCrunchResetRequest, manualRequestDimensionBoost, manualRequestGalaxyReset, maxAll } from "./globals";
import { landmarkIDs as IDs} from "./constants.js";
import { DC } from "./constants.js";

export const Completer = (function() {
  return {
    currTick: 0,

    recordedTick: 0,

    triggerSubLandmarkComplete: false,

    toggle() {
      if (!player.completer.isOn) {
        this.currTick = 0;
        this.recordedTick = 0;
        player.completer.lastSubLandmarkAchieved = 0;
      }
      player.completer.isOn = !player.completer.isOn;
    },

    tick() {
      if (!player.completer.isOn) {
        player.completer.status = "";
        return;
      }

      this.triggerSubLandmarkComplete = false;

      switch(player.completer.lastLandmarkAchieved) {
        case -1:
          player.completer.status = "Buying 1st Dimensions";
          buyOneDimension(1);
          break;
        case IDs.FirstDim:
          buyOneDimension(1);
          if (player.dimensions.antimatter[0].bought >= 10) player.completer.status = "Waiting to buy 2nd Dimensions";
          buyOneDimension(2);
          break;
        case IDs.SecondDim:
          player.completer.status = "Buying 2nd Dimensions";
          maxAll();
          buyOneDimension(2);
          if (player.dimensions.antimatter[1].bought >= 10) player.completer.status = "Waiting to buy 3rd Dimensions";
          buyOneDimension(3);
          break;
        case IDs.ThirdDim:
          player.completer.status = "Buying 3rd Dimensions";
          maxAll();
          buyOneDimension(3);
          if (player.dimensions.antimatter[2].bought >= 10) player.completer.status = "Waiting to buy 4th Dimensions";
          buyOneDimension(4);
          break;
        case IDs.FourthDim:
          player.completer.status = "Waiting for 20 4th Dimensions";
          maxAll();
          buyOneDimension(4);
          manualRequestDimensionBoost(false);
          break;
        case IDs.FirstDimBoost:
          maxAll();
          buyFirstXDimensions(5);
          manualRequestDimensionBoost(false);
          break;
        case IDs.SecondDimBoost:
          maxAll();
          buyFirstXDimensions(6);
          manualRequestDimensionBoost(false);
          break;
        case IDs.ThirdDimBoost:
          maxAll();
          buyFirstXDimensions(7);
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
          buyFirstXDimensions(8);
          buyAutobuyersNotBought();
          manualBigCrunchResetRequest();
          manualRequestGalaxyReset(false);
          manualRequestDimensionBoost(false);
          break;
        case IDs.FirstInfinity:
          switch(player.completer.lastSubLandmarkAchieved) {
            case 0:
              player.completer.status = "Starting 8th Challenge";
              buyInfinityUpgrades();
              // enter challenge 8
              NormalChallenge.index[8].requestStart();
              break;
            case 1:
              maxAll();
              buyFirstXDimensions(4);
              manualRequestDimensionBoost(false);
              break;
            case 2:
              maxAll();
              buyFirstXDimensions(5);
              manualRequestDimensionBoost(false);
              break;
            case 3:
              maxAll();
              buyFirstXDimensions(6);
              manualRequestDimensionBoost(false);
              break;
            case 4:
              maxAll();
              buyFirstXDimensions(7);
              manualRequestDimensionBoost(false);
              break;
            case 5:
              maxAll();
              buyFirstXDimensions(8);
              manualRequestDimensionBoost(false);
              break;
            case 6:
              this.currTick++;
              // sacrifice after the amount of time it takes to reach sacrifice, unless it's possible to inf
              if (this.recordedTick > 0) {
                if (this.currTick - this.recordedTick >= this.recordedTick && Sacrifice.nextBoost.lte(100000)) {
                  sacrificeReset();
                  this.recordedTick = 0;
                  this.currTick = 0;
                  this.triggerSubLandmarkComplete = true;
                  break;
                }
              }
              else if (Sacrifice.canSacrifice)
                this.recordedTick = this.currTick
              maxAll();
              buyFirstXDimensions(8);
              manualBigCrunchResetRequest();
              break;
          }
      }

      checkLandmarks(this);
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

function checkLandmarks(comp) {
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
        player.options.confirmations.dimensionBoost = false; // disable dim boost modal appearing
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
        player.options.confirmations.antimatterGalaxy = false; // disable galaxy modal
      }
    case IDs.EighthDimBoost:
      if (player.galaxies >= 1)
        player.completer.lastLandmarkAchieved = IDs.FirstGalaxy;
    case IDs.FirstGalaxy:
      if (player.galaxies >= 2) {
        player.completer.lastLandmarkAchieved = IDs.SecondGalaxy;
        player.options.confirmations.bigCrunch = false; // disable infinity modal
        player.options.animations.bigCrunch = false; // disable infinity animation
      }
    case IDs.SecondGalaxy:
      if (player.infinities.gte(DC.D1)) {
        player.completer.lastLandmarkAchieved = IDs.FirstInfinity;
        player.options.confirmations.challenges = false; // disable challenge modal
        player.completer.lastSubLandmarkAchieved = 0;
      }
    case IDs.FirstInfinity:
      switch (player.completer.lastSubLandmarkAchieved) {
        case 0: // not in challenge
          if (player.challenge.normal.current == 8)
            player.completer.lastSubLandmarkAchieved = 1;
          else break;
        case 1: // before first dim boost
          if (player.dimensionBoosts >= 1)
            player.completer.lastSubLandmarkAchieved = 2;
        case 2: // before second dim boost
          if (player.dimensionBoosts >= 2)
            player.completer.lastSubLandmarkAchieved = 3;
        case 3: // before third dim boost
          if (player.dimensionBoosts >= 3)
            player.completer.lastSubLandmarkAchieved = 4;
        case 4: // before fourth dim boost
          if (player.dimensionBoosts >= 4)
            player.completer.lastSubLandmarkAchieved = 5;
        case 5: // before fifth dim boost
          if (player.dimensionBoosts >= 5) {
            player.completer.lastSubLandmarkAchieved = 6;
            comp.currTick = 0;
            comp.recordedTick = 0;
          }
          break;
        case 6: 
          if (comp.triggerSubLandmarkComplete)
            player.completer.lastSubLandmarkAchieved = 1;
      }
      if (player.infinityPoints.gte(1)) // BUGGED FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        player.completer.lastSubLandmarkAchieved = 0;
      if (InfinityUpgrade.galaxyBoost.isBought) {
        player.completer.lastLandmarkAchieved = IDs.GalaxyBoostUpgrade;
        player.completer.lastSubLandmarkAchieved = 0;
      }
    case IDs.GalaxyBoostUpgrade:
      switch (player.completer.lastSubLandmarkAchieved) {
        case 0:

      }
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

function buyFirstXDimensions(x) {
  if (player.dimensions.antimatter[0].bought < 10){
    buyOneDimension(1);
    player.completer.status = "Buying 1st Dimensions";
  }
  else if (player.dimensions.antimatter[1].bought < 10) {
    buyOneDimension(2);
    player.completer.status = "Buying 2nd Dimensions";
  }
  else if (player.dimensions.antimatter[2].bought < 10) {
    buyOneDimension(3);
    player.completer.status = "Buying 3rd Dimensions";
  }
  else if (x == 4) {
    buyXDimension(x);
    return;
  }
  else if (player.dimensions.antimatter[3].bought < 10){
    buyOneDimension(4);
    player.completer.status = "Buying 4th Dimensions";
  }
  else if (x == 5) {
    buyXDimension(x);
    return;
  }
  else if (player.dimensions.antimatter[4].bought < 10){
    buyOneDimension(5);
    player.completer.status = "Buying 5th Dimensions";
  }
  else if (x == 6) {
    buyXDimension(x);
    return;
  }
  else if (player.dimensions.antimatter[5].bought < 10){
    buyOneDimension(6);
    player.completer.status = "Buying 6th Dimensions";
  }
  else if (x == 7) {
    buyXDimension(x);
    return;
  }
  else if (player.dimensions.antimatter[6].bought < 10){
    buyOneDimension(7);
    player.completer.status = "Buying 7th Dimensions";
  }
  else
    buyXDimension(x);
}

function buyXDimension(x) {
  if (player.dimensions.antimatter[x-1].bought <= 0) player.completer.status = "Waiting to buy " + formatInt(x) + "th Dimensions";
  else if (player.dimensions.antimatter[x-1].bought < 10) player.completer.status = "Buying " + formatInt(x) + "th Dimensions";
  else if (player.dimensions.antimatter[x-1].bought >= 10) player.completer.status = "Waiting for " + formatInt(DimBoost.requirement.amount) + " " + formatInt(x) + "th Dimensions";
  buyOneDimension(x);
}

function buyInfinityUpgrades() {
  InfinityUpgrade.totalTimeMult.purchase();
  InfinityUpgrade.buy10Mult.purchase();
  InfinityUpgrade.dim27mult.purchase();
  InfinityUpgrade.dim45mult.purchase();
  InfinityUpgrade.galaxyBoost.purchase();
}