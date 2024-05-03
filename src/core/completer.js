import { Achievement, AntimatterDimension, buyAsManyAsYouCanBuy, buyMaxDimension, buyMaxTickSpeed, buyOneDimension, manualBigCrunchResetRequest, manualRequestDimensionBoost, manualRequestGalaxyReset, maxAll, sacrificeReset } from "./globals";
import { landmarkIDs as IDs} from "./constants.js";
import { DC } from "./constants.js";

export const Completer = (function() {
  return {
    currTick: 0,

    recordedTick: 0,

    triggerSubLandmarkComplete: false,

    lastInfinityCount: 0,

    subLandmarks: {
      FourthDimBoost_SecondGalaxy: 0,
      FirstInfinity: 0,
      GalaxyBoostUpgrade: 0
    },

    checkLandmark(id) {
      let lastLandmark = player.completer.lastLandmarkAchieved;

      switch (id) {
        case -1:
          if (player.dimensions.antimatter[0].bought >= 1)
            lastLandmark = IDs.FirstDim;
          break;
        case IDs.FirstDim:
          if (player.dimensions.antimatter[1].bought >= 1)
            lastLandmark = IDs.SecondDim;
            break;
        case IDs.SecondDim:
          if (player.dimensions.antimatter[2].bought >= 1)
            lastLandmark = IDs.ThirdDim;
            break;
        case IDs.ThirdDim:
          if (player.dimensions.antimatter[3].bought >= 1)
            lastLandmark = IDs.FourthDim;
            break;
        case IDs.FourthDim:
          if (player.dimensionBoosts >= 1)
            lastLandmark = IDs.FirstDimBoost;
            break;
        case IDs.FirstDimBoost:
          if (player.dimensionBoosts >= 2)
            lastLandmark = IDs.SecondDimBoost;
            break;
        case IDs.SecondDimBoost:
          if (player.dimensionBoosts >= 3)
            lastLandmark = IDs.ThirdDimBoost;
            break;
        case IDs.ThirdDimBoost:
          if (player.dimensionBoosts >= 4)
            lastLandmark = IDs.FourthDimBoost;
            break;
        case IDs.FourthDimBoost:
          if (player.dimensionBoosts >= 5)
            lastLandmark = IDs.FifthDimBoost;
            break;
        case IDs.FifthDimBoost:
          if (player.dimensionBoosts >= 6) {
            lastLandmark = IDs.SixthDimBoost;
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
          }
          break;
        case IDs.SixthDimBoost:
          if (player.dimensionBoosts >= 7) {
            lastLandmark = IDs.SeventhDimBoost;
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
          }
          break;
        case IDs.SeventhDimBoost:
          if (player.dimensionBoosts >= 8) {
            lastLandmark = IDs.EighthDimBoost;
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
          }
          break;
        case IDs.EighthDimBoost:
          if (player.galaxies >= 1) {
            lastLandmark = IDs.FirstGalaxy;
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
          }
          break;
        case IDs.FirstGalaxy:
          if (player.galaxies >= 2) {
            lastLandmark = IDs.SecondGalaxy;
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
          }
          break;
        case IDs.SecondGalaxy:
          if (player.infinities.gte(DC.D1))
            lastLandmark = IDs.FirstInfinity;
          // here so it's always checked when player is between landmarks FourthDimBoost and SecondGalaxy
          else if (Sacrifice.totalBoost.gte(5))
            this.subLandmarks.FourthDimBoost_SecondGalaxy = 1;
          break;
        case IDs.FirstInfinity:
          if (InfinityUpgrade.galaxyBoost.isBought) {
            lastLandmark = IDs.GalaxyBoostUpgrade;
          }
          switch (this.subLandmarks.FirstInfinity) {
            case 0: // not in challenge
              if (player.challenge.normal.current == 8)
                this.subLandmarks.FirstInfinity = 1;
              else break;
            case 1: // before first dim boost
              if (player.dimensionBoosts >= 1)
                this.subLandmarks.FirstInfinity = 2;
            case 2: // before second dim boost
              if (player.dimensionBoosts >= 2)
                this.subLandmarks.FirstInfinity = 3;
            case 3: // before third dim boost
              if (player.dimensionBoosts >= 3)
                this.subLandmarks.FirstInfinity = 4;
            case 4: // before fourth dim boost
              if (player.dimensionBoosts >= 4)
                this.subLandmarks.FirstInfinity = 5;
            case 5: // before fifth dim boost
              if (player.dimensionBoosts >= 5) {
                this.subLandmarks.FirstInfinity = 6;
                this.currTick = 0;
                this.recordedTick = 0;
              }
              break;
            case 6: 
              if (this.triggerSubLandmarkComplete)
                this.subLandmarks.FirstInfinity = 1;
          }
          if (player.infinities.gt(this.lastInfinityCount)) {
            this.subLandmarks.FirstInfinity = 0;
            this.lastInfinityCount++;
          }
          break;
        case IDs.GalaxyBoostUpgrade:
          switch (this.subLandmarks.GalaxyBoostUpgrade) {
            case 0:
    
          }
          break;
      }

      player.completer.lastLandmarkAchieved = lastLandmark;
    },

    // check all landmarks to discover where in the game the player is
    checkAllLandmarks() {
      for (let id in IDs)
        this.checkLandmark(id);
    },

    toggle() {
      if (!player.completer.isOn) {
        this.currTick = 0;
        this.recordedTick = 0;
        for (let subLandmark in this.subLandmarks)
          subLandmark = 0;
        disableAllConfirmations();
        this.checkAllLandmarks();
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

          this.checkLandmark(-1);
          break;
        case IDs.FirstDim:
          buyOneDimension(1);
          if (player.dimensions.antimatter[0].bought >= 10) player.completer.status = "Waiting to buy 2nd Dimensions";
          buyOneDimension(2);

          this.checkLandmark(IDs.FirstDim);
          break;
        case IDs.SecondDim:
          player.completer.status = "Buying 2nd Dimensions";
          maxAll();
          buyOneDimension(2);
          if (player.dimensions.antimatter[1].bought >= 10) player.completer.status = "Waiting to buy 3rd Dimensions";
          buyOneDimension(3);

          this.checkLandmark(IDs.SecondDim);
          break;
        case IDs.ThirdDim:
          player.completer.status = "Buying 3rd Dimensions";
          maxAll();
          buyOneDimension(3);
          if (player.dimensions.antimatter[2].bought >= 10) player.completer.status = "Waiting to buy 4th Dimensions";
          buyOneDimension(4);

          this.checkLandmark(IDs.ThirdDim);
          break;
        case IDs.FourthDim:
          player.completer.status = "Waiting for 20 4th Dimensions";
          maxAll();
          buyOneDimension(4);
          manualRequestDimensionBoost(false);

          this.checkLandmark(IDs.FourthDim);
          break;
        case IDs.FirstDimBoost:
          maxAll();
          buyFirstXDimensions(5);
          manualRequestDimensionBoost(false);

          this.checkLandmark(IDs.FirstDimBoost);
          break;
        case IDs.SecondDimBoost:
          maxAll();
          buyFirstXDimensions(6);
          manualRequestDimensionBoost(false);

          this.checkLandmark(IDs.SecondDimBoost);
          break;
        case IDs.ThirdDimBoost:
          maxAll();
          buyFirstXDimensions(7);
          manualRequestDimensionBoost(false);

          this.checkLandmark(IDs.ThirdDimBoost);
          break;
        case IDs.FourthDimBoost:
        case IDs.FifthDimBoost:
        case IDs.SixthDimBoost:
        case IDs.SeventhDimBoost:
        case IDs.EighthDimBoost:
        case IDs.FirstGalaxy:
        case IDs.SecondGalaxy:
          if (this.subLandmarks.FourthDimBoost_SecondGalaxy == 0) {
            // check what total will be after next boost
            // done in case completer is turned on after player already sacrificed
            let nextTotalBoost = Sacrifice.nextBoost.times(Sacrifice.totalBoost);
            if (nextTotalBoost.gte(5))
              sacrificeReset();
          }
          // ::::TODO:::: add check if close to next dim boost/galaxy
          else if (Sacrifice.nextBoost.gte(2))
            sacrificeReset();
          // make sure only to infinity if achievements achieved
          if (Achievement(23).isUnlocked && Achievement(28).isUnlocked)
            manualBigCrunchResetRequest();
          // make sure to get '9th dimension is a lie' achievement by guarenteeing 99 8th dimensions
          // last check is added in case someone turns on completer after 100 8th dimensions but doesn't have achievement
          if (!Achievement(23).isUnlocked && player.antimatter.gte(new Decimal("9e150")) && player.dimensions.antimatter[7].amount.lt(100))
            buyOneDimension(8);
          // make sure to get 'there's no point in doing that...' achievement when possible
          // i.e. when we have over 1e150 1st antimatter dimensions
          // we check if it's affordable so buying other dimensions doesn't get paused, helping reach to point it is affordable faster
          else if (!Achievement(28).isUnlocked && player.dimensions.antimatter[0].amount.gt(DC.E150) && AntimatterDimension(1).isAffordable)
            buyOneDimension(1);
          else {
            maxAll();
            buyFirstXDimensions(8);
            buyAutobuyersNotBought();
            manualRequestGalaxyReset(false);
            manualRequestDimensionBoost(false);
          }

          // this is kinda wierd to do, but probably worth not repeating code
          this.checkLandmark(IDs.FourthDimBoost);
          this.checkLandmark(IDs.FifthDimBoost);
          this.checkLandmark(IDs.SixthDimBoost);
          this.checkLandmark(IDs.SeventhDimBoost);
          this.checkLandmark(IDs.EighthDimBoost);
          this.checkLandmark(IDs.FirstGalaxy);
          this.checkLandmark(IDs.SecondGalaxy);
          break;
        case IDs.FirstInfinity:
          switch(this.subLandmarks.FirstInfinity) {
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
                if (this.currTick - this.recordedTick >= this.recordedTick) {
                  // add extra check in case of wierdness to make sure not stuck waiting for infinity that will never come
                  if (Sacrifice.nextBoost.lte(100000) || this.currTick - this.recordedTick >= 1000)
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

          this.checkLandmark(IDs.FirstInfinity);
          break;
      }
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

// function checkLandmarks(comp) {
//   let lastLandmark = player.completer.lastLandmarkAchieved;
//   // fallthrough allowed on purpose, check for every landmark not achieved
//   switch (lastLandmark) {
//     case -1:
//       if (player.dimensions.antimatter[0].bought >= 1)
//         lastLandmark = IDs.FirstDim;
//     case IDs.FirstDim:
//       if (player.dimensions.antimatter[1].bought >= 1)
//         lastLandmark = IDs.SecondDim;
//     case IDs.SecondDim:
//       if (player.dimensions.antimatter[2].bought >= 1)
//         lastLandmark = IDs.ThirdDim;
//     case IDs.ThirdDim:
//       if (player.dimensions.antimatter[3].bought >= 1)
//         lastLandmark = IDs.FourthDim;
//     case IDs.FourthDim:
//       if (player.dimensionBoosts >= 1)
//         lastLandmark = IDs.FirstDimBoost;
//     case IDs.FirstDimBoost:
//       if (player.dimensionBoosts >= 2)
//         lastLandmark = IDs.SecondDimBoost;
//     case IDs.SecondDimBoost:
//       if (player.dimensionBoosts >= 3)
//         lastLandmark = IDs.ThirdDimBoost;
//     case IDs.ThirdDimBoost:
//       if (player.dimensionBoosts >= 4)
//         lastLandmark = IDs.FourthDimBoost;
//     case IDs.FourthDimBoost:
//       if (player.dimensionBoosts >= 5)
//         lastLandmark = IDs.FifthDimBoost;
//     case IDs.FifthDimBoost:
//       if (player.dimensionBoosts >= 6) {
//         lastLandmark = IDs.SixthDimBoost;
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
//       }
//     case IDs.SixthDimBoost:
//       if (player.dimensionBoosts >= 7) {
//         lastLandmark = IDs.SeventhDimBoost;
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
//       }
//     case IDs.SeventhDimBoost:
//       if (player.dimensionBoosts >= 8) {
//         lastLandmark = IDs.EighthDimBoost;
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
//       }
//     case IDs.EighthDimBoost:
//       if (player.galaxies >= 1) {
//         lastLandmark = IDs.FirstGalaxy;
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
//       }
//     case IDs.FirstGalaxy:
//       if (player.galaxies >= 2) {
//         lastLandmark = IDs.SecondGalaxy;
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 0;
//       }
//     case IDs.SecondGalaxy:
//       if (player.infinities.gte(DC.D1))
//         lastLandmark = IDs.FirstInfinity;
//       // here so it's always checked when player is between landmarks FourthDimBoost and SecondGalaxy
//       else if (Sacrifice.totalBoost.gte(5))
//         comp.subLandmarks.FourthDimBoost_SecondGalaxy = 1;
//     case IDs.FirstInfinity:
//       if (InfinityUpgrade.galaxyBoost.isBought) {
//         lastLandmark = IDs.GalaxyBoostUpgrade;
//       }
//       switch (comp.subLandmarks.FirstInfinity) {
//         case 0: // not in challenge
//           if (player.challenge.normal.current == 8)
//             comp.subLandmarks.FirstInfinity = 1;
//           else break;
//         case 1: // before first dim boost
//           if (player.dimensionBoosts >= 1)
//             comp.subLandmarks.FirstInfinity = 2;
//         case 2: // before second dim boost
//           if (player.dimensionBoosts >= 2)
//             comp.subLandmarks.FirstInfinity = 3;
//         case 3: // before third dim boost
//           if (player.dimensionBoosts >= 3)
//             comp.subLandmarks.FirstInfinity = 4;
//         case 4: // before fourth dim boost
//           if (player.dimensionBoosts >= 4)
//             comp.subLandmarks.FirstInfinity = 5;
//         case 5: // before fifth dim boost
//           if (player.dimensionBoosts >= 5) {
//             comp.subLandmarks.FirstInfinity = 6;
//             comp.currTick = 0;
//             comp.recordedTick = 0;
//           }
//           break;
//         case 6: 
//           if (comp.triggerSubLandmarkComplete)
//             comp.subLandmarks.FirstInfinity = 1;
//       }
//       if (player.infinities.gt(comp.lastInfinityCount)) {
//         comp.subLandmarks.FirstInfinity = 0;
//         comp.lastInfinityCount++;
//       }
//     case IDs.GalaxyBoostUpgrade:
//       switch (comp.subLandmarks.GalaxyBoostUpgrade) {
//         case 0:

//       }
//   }

//   player.completer.lastLandmarkAchieved = lastLandmark;
// }

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

function disableAllConfirmations() {
  player.options.confirmations.dimensionBoost = false; // disable dim boost modal appearing
  player.options.confirmations.antimatterGalaxy = false; // disable galaxy modal
  player.options.confirmations.bigCrunch = false; // disable infinity modal
  player.options.animations.bigCrunch = false; // disable infinity animation
  player.options.confirmations.challenges = false; // disable challenge modal
}