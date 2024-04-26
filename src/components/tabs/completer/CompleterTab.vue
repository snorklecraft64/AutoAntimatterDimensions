<script>
import CompleterButton from "./CompleterButton";
import CompleterLandmarkGrid from "./CompleterLandmarkGrid";

export default {
  name: "CompleterTab",
  components: {
    CompleterButton,
    CompleterLandmarkGrid
  },
  data() {
    return {
      completerStatus: "Off"
    };
  },
  methods: {
    update() {
      this.completerStatus = player.completer.isOn ? "On" : "Off";
    }
  }
};
</script>

<template>
  <div class="l-completer-tab">
    <div>
      <CompleterButton class="l-completer-tab__completer-btn" />
      <div>The Completer is {{ completerStatus }}</div>
    </div>
    <div class="l-completer-tab__landmarks">
      <CompleterLandmarkGrid/>
    </div>
  </div>
</template>