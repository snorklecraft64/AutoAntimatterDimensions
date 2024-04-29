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
      completerState: "Off",
      completerStatus: "",
      ticks: 0
    };
  },
  methods: {
    update() {
      this.completerState = player.completer.isOn ? "On" : "Off";
      // add dots to end
      this.ticks++;
      if(this.ticks == 91) {
        this.ticks = 0;
        return;
      }
      if(this.ticks <= 30) this.completerStatus = player.completer.status + ".";
      else if(this.ticks <= 60) this.completerStatus = player.completer.status + "..";
      else if(this.ticks <= 90) this.completerStatus = player.completer.status + "...";
    }
  }
};
</script>

<template>
  <div class="l-completer-tab">
    <div>
      <div>The Completer is {{ completerState }}</div>
      <CompleterButton class="l-completer-tab__completer-btn" />
    </div>
    <br>
    <span>
      <div v-if="completerState == 'On'" class="l-completer-tab__status">
        {{ completerStatus }}
      </div>
      <div v-if="completerState == 'Off'">
        <br>
      </div>
    </span>
    <br>
    <div class="l-completer-tab__lower">
      <div class="l-completer-tab__landmarks">
        <CompleterLandmarkGrid/>
      </div>
    </div>  
  </div>
</template>