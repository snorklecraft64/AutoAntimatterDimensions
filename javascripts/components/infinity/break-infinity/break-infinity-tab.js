"use strict";

Vue.component("break-infinity-tab", {
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    grid() {
      return [
        [
          BreakInfinityUpgrade.totalAMMult,
          BreakInfinityUpgrade.currentAMMult,
          BreakInfinityUpgrade.galaxyBoost,
        ],
        [
          BreakInfinityUpgrade.infinitiedMult,
          BreakInfinityUpgrade.achievementMult,
          BreakInfinityUpgrade.slowestChallengeMult,
        ],
        [
          BreakInfinityUpgrade.infinitiedGen,
          BreakInfinityUpgrade.bulkDimBoost,
          BreakInfinityUpgrade.autobuyerSpeed
        ],
        [
          BreakInfinityUpgrade.tickspeedCostMult,
          BreakInfinityUpgrade.dimCostMult,
          BreakInfinityUpgrade.ipGen
        ]
      ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = Autobuyer.bigCrunch.hasMaxedInterval;
    },
    btnClassObject(column) {
      return {
        "l-infinity-upgrade-grid__cell": true,
        "o-infinity-upgrade-btn--multiplier": column === 3
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  },
  template:
    `<div class="l-break-infinity-tab">
      <div v-if="!isUnlocked">
        You need to get Automated Big Crunch interval to {{ format(0.1, 1, 1) }}s to be able to Break Infinity
      </div>
      <break-infinity-button class="l-break-infinity-tab__break-btn" />
      <div v-if="isUnlocked" class="l-break-infinity-upgrade-grid l-break-infinity-tab__grid">
        <div v-for="(column, columnId) in grid" class="l-break-infinity-upgrade-grid__row">
          <infinity-upgrade-button
            v-for="upgrade in column"
            :key="upgrade.id"
            :upgrade="upgrade"
            :class="btnClassObject(columnId)"
          />
        </div>
      </div>
    </div>`
});
