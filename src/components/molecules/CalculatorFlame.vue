<template>
  <div class="calculator">
    <cal-display :cal-display="state.display" />
    <div class="cal-key-list">
      <cal-key
        v-for="(key, index) in state.keyCodes"
        :key="index"
        :cal-key="key"
        @push-btn="pushBtn"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { KEY_LIST } from '@/constants/keyList.ts';
import { CalculatorClass } from '@/logic/CalculatorClass.ts';
import CalDisplay from '@/components/atoms/CalDisplay.vue';
import CalKey from '@/components/atoms/CalKey.vue';

interface CalData {
  display: string;
  keyCodes: string[];
}

const Calculator: CalculatorClass = CalculatorClass.getInstance();

export default defineComponent({
  name: 'CalculatorFlame',
  components: {
    'cal-display': CalDisplay,
    'cal-key': CalKey
  },
  setup() {
    const state = reactive<CalData>({
      display: '0',
      keyCodes: KEY_LIST
    });

    const pushBtn = (keyCode: string): void => {
      Calculator.pushBtn(keyCode);
      state.display = Calculator.display();
    };

    return { state, pushBtn };
  }
});
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  height: 330px;
  width: 250px;
  border: 1px solid black;
}
.cal-key-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
