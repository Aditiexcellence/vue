<template>
  <div>
    <div id="timer">
      <span id="minutes">{{ minutes }}</span>
      <span id="middle">:</span>
      <span id="seconds">{{ seconds }}</span>
    </div>
    <div id="buttons">
      <button id="start" class="button is-dark is-large" v-if="!timer" @click="startTimer">Start</button>
      <button id="stop" class="button is-dark is-large" v-if="timer" @click="stopTimer">Stop</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data: function() {
    return {
      timer: null,
      totalTime: 0 * 60,
      resetButton: false
    };
  },
  methods: {
    startTimer: function() {
      this.timer = setInterval(() => this.countup(), 1000);
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countup: function() {
      this.totalTime++;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  }
};
</script>

<style>
#timer {
  font-size: 200px;
  line-height: 1;
  margin-bottom: 40px;
}
#start {
  border: none;
  background-color: none;
}
</style>
