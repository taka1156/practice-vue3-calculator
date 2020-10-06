<template>
  <p class="cal-display">{{ wrapText(calDisplay) }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Props = {
  calDisplay: string;
};

export default defineComponent({
  name: 'CalDisplay',
  props: {
    calDisplay: String as PropType<string>
  },
  setup() {
    const wrapText = (num: string): string => {
      return num.length < 11 ? num : `${num.slice(0, 11)}...`;
    };
    return { wrapText };
  }
});
</script>

<style scoped>
.cal-display {
  background-color: black;
  color: white;
  height: 50px;
  width: 100%;
  font-size: 35px;
  margin: 0 auto;
  text-align: right;
}
</style>
