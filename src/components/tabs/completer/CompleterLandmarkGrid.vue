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
        .sort((a, b) => a.id - b.id);
    }
  },
  methods: {
    getLandmark(id) {
      return () => this.landmarks[id];
    }
  }
};
</script>

<template>
  <div class="l-landmark-grid">
    <CompleterLandmarkBox
      v-for="landmark in landmarks"
      :key="landmark.id"
      :get-landmark="getLandmark(landmark.id)"
    />
  </div>
</template>

<style scoped>

</style>
