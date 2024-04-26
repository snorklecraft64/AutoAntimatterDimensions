<script>
import CompleterLandmarkBox from "./CompleterLandmarkBox";

export default {
  name: "CompleterLandmarkGrid",
  components: {
    CompleterLandmarkBox
  },
  computed: {
    landmarks() {
      console.log(Object.values(GameDatabase.landmarks));
      console.log(Object.values(GameDatabase.landmarks).sort((a, b) => a.id - b.id));
      console.log(Object.values(GameDatabase.landmarks).sort((a, b) => a.id - b.id).map(config => new LandmarkState(config)));
      return Object.values(GameDatabase.landmarks)
        .sort((a, b) => a.id - b.id)
        .map(config => new LandmarkState(config));
    }
  },
  methods: {
    getLandmark(id) {
      console.log(id);
      console.log(this.landmarks[id]);
      return () => this.landmarks[id];
    }
  }
};
</script>

<template>
  <div class="l-landmark-grid">
    <CompleterLandmarkBox
      v-for="landmark in landmarks"
      :key="landmark.config.id"
      :get-landmark="getLandmark(landmark.config.id)"
    />
  </div>
</template>

<style scoped>

</style>
