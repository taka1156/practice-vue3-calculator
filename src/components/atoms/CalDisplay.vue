<template>
  <p class="cal-display">{{ calDisplay }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type Props = {
  calDisplay: string;
};

export default defineComponent({
  name: 'CalDisplay',
  props: {
    calDisplay: {
      type: String,
      default: '0',
      required: true
    }
  }
});
</script>

<style scoped>
.cal-display {
  background-color: black;
  color: white;
  height: 50px;
  width: 100%;
  font-size: 40px;
  margin: 0 auto;
  text-align: right;
}
</style>
