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
        "o-completer-btn--on": this.isOn,
        "o-completer-btn--off": !this.isOn
      };
    },
    text() {
      return this.isOn ? "Turn Completer Off" : "Turn Completer On";
    }
  },
  methods: {
    update() {
      this.isOn = player.completer.isOn;
    },
    clicked() {
      Completer.toggle();
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="clicked"
  >
    {{ text }}
  </button>
</template>