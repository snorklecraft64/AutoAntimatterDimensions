<script>
export default {
  name: "CompleterLandmarkBox",
  props: {
    getLandmark: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isReached: false
    };
  },
  computed: {
    landmark() {
      return this.getLandmark();
    },
    config() {
      return this.landmark.config;
    },
    desc() {
      return this.config.desc;
    },
    descClassObject() {
      return {
        "o-landmark__desc": true,
        "o-landmark__desc--nonreached": !this.isReached,
        "o-landmark__desc--reached": this.isReached
      };
    },
    activeCondition() {
      return this.config.activeCondition ? this.config.activeCondition() : null;
    }
  },
  methods: {
    update() {
      if (this.landmark != null) this.isReached = this.landmark.isReached;
      else return null;
    }
  }
};
</script>

<template>
  <div
    class="l-landmark"
  >
    <button
      :class="descClassObject"
    >
      <span>
        {{ desc }}
      </span>
    </button>
  </div>
</template>

<style scoped>

</style>
