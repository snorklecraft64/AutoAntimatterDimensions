<script>
export default {
  name: "CompleterButton",
  data() {
    return {
      isOn: false,
    };
  },
  computed: {
    classObject() {
      return {
        "o-completer-btn": true,
        "o-completer-btn--color": true,
      };
    },
    text() {
      return this.isOn ? "Turn Completer Off" : "Turn Completer On";
    }
  },
  methods: {
    update() {
      this.isOn = player.completerOn;
    },
    clicked() {
      player.completerOn = !player.completerOn;
    }
  }
};
</script>

<template>
  <button
    v-tooltip="tooltip"
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>