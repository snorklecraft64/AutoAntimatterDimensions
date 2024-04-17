<script>
import CompleterLandmarkBox from "./CompleterLandmarkBox";

export default {
  name: "CompleterLandmarkGrid",
  components: {
    CompleterLandmarkBox
  },
  computed: {
    landmarks() {
      return Object.values(GameDatabase.landmarks)
        .sort((a, b) => a.id - b.id)
        .map(config => new LandmarkState(config));
    },
    rows() {
      return Math.ceil(this.landmarks.length / 3);
    }
  },
  methods: {
    getLandmark(row, column) {
      return () => this.landmarks[(row - 1) * 3 + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-landmark-grid">
    <div
      v-for="row in rows"
      :key="row"
      class="l-landmark-grid__row"
    >
      <CompleterLandmarkBox
        v-for="column in 3"
        :key="row * 3 + column"
        :get-landmark="getLandmark(row, column)"
        class="l-landmark-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
