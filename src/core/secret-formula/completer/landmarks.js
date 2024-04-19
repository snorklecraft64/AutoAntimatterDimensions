import { landmarkIDs as IDs} from "../../constants.js"
import { DC } from "../../constants.js"

export const landmarks = {
  FirstDim: {
    id: IDs.FirstDim,
    desc: "First Dimension",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FirstDim) return true;
      else if (player.dimensions.antimatter[0].bought >= 1) {
        player.lastLandmarkAchieved == IDs.FirstDim;
        return true;
      }
      else return false;
    }
  },
  SecondDim: {
    id: IDs.SecondDim,
    desc: "Second Dimension",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.SecondDim) return true;
      else if (player.dimensions.antimatter[1].bought >= 1) {
        player.lastLandmarkAchieved == IDs.SecondDim;
        return true;
      }
      else return false;
    }
  },
  ThirdDim: {
    id: IDs.ThirdDim,
    desc: "Third Dimension",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.ThirdDim) return true;
      else if (player.dimensions.antimatter[2].bought >= 1) {
        player.lastLandmarkAchieved == IDs.ThirdDim;
        return true;
      }
      else return false;
    }
  },
  FourthDim: {
    id: IDs.FourthDim,
    desc: "Fourth Dimension",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FourthDim) return true;
      else if (player.dimensions.antimatter[3].bought >= 1) {
        player.lastLandmarkAchieved == IDs.FourthDim;
        return true;
      }
      else return false;
    }
  },
  FirstDimensionBoost: {
    id: IDs.FirstDimBoost,
    desc: "First Dimension Boost",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FirstDimBoost) return true;
      else if (player.dimensionBoosts >= 1) {
        player.lastLandmarkAchieved == IDs.FirstDimBoost;
        return true;
      }
      else return false;
    }
  },
  SecondDimensionBoost: {
    id: IDs.SecondDimBoost,
    desc: "Second Dimension Boost",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.SecondDimBoost) return true;
      else if (player.dimensionBoosts >= 2) {
        player.lastLandmarkAchieved == IDs.SecondDimBoost;
        return true;
      }
      else return false;
    }
  },
  ThirdDimensionBoost: {
    id: IDs.ThirdDimBoost,
    desc: "Third Dimension Boost",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.ThirdDimBoost) return true;
      else if (player.dimensionBoosts >= 3) {
        player.lastLandmarkAchieved == IDs.ThirdDimBoost;
        return true;
      }
      else return false;
    }
  },
  FourthDimensionBoost: {
    id: IDs.FourthDimBoost,
    desc: "Fourth Dimension Boost",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FourthDimBoost) return true;
      else if (player.dimensionBoosts >= 4) {
        player.lastLandmarkAchieved == IDs.FourthDimBoost;
        return true;
      }
      else return false;
    }
  },
  FirstGalaxy: {
    id: IDs.FirstGalaxy,
    desc: "First Galaxy",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FirstGalaxy) return true;
      else if (player.galaxies >= 1) {
        player.lastLandmarkAchieved == IDs.FirstGalaxy;
        return true;
      }
      else return false;
    }
  },
  SecondGalaxy: {
    id: IDs.SecondGalaxy,
    desc: "Second Galaxy",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.SecondGalaxy) return true;
      else if (player.galaxies >= 2) {
        player.lastLandmarkAchieved == IDs.SecondGalaxy;
        return true;
      }
      else return false;
    }
  },
  FirstInfinity: {
    id: IDs.FirstInfinity,
    desc: "First Infinity",
    isReached: () => {
      if (player.lastLandmarkAchieved >= IDs.FirstInfinity) return true;
      else if (player.infinities.gte(DC.D1)) {
        player.lastLandmarkAchieved == IDs.FirstInfinity;
        return true;
      }
      else return false;
    }
  },/*
  EighthInfinityUpgrade: {

  },*/
}