<template>
  <div class="calculator">
    <cal-display :cal-display="`${display()}`" />
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
  num1: string;
  num2: string;
  ope: string;
  keyCodes: string[];
}

const Calculator = new CalculatorClass();

export default defineComponent({
  name: 'CalculatorFlame',
  components: {
    'cal-display': CalDisplay,
    'cal-key': CalKey
  },
  setup() {
    const state = reactive<CalData>({
      num1: '0',
      num2: '0',
      ope: '',
      keyCodes: KEY_LIST
    });

    const inputNum = (): 'num1' | 'num2' => {
      if (state.ope === '') {
        return 'num1';
      } else {
        return 'num2';
      }
    };

    const display = (): string => {
      return state[inputNum()];
    };

    const setNum = (setKey: 'num1' | 'num2', num: string): void => {
      if (state[setKey] === '0' && num !== '.') {
        if (num === '00') {
          alert('0の時に00は入力できません。');
          return;
        } else {
          state[setKey] = num;
        }
      } else {
        state[setKey] = state[setKey] + num;
      }
    };

    const reverseNum = (setKey: 'num1' | 'num2'): void => {
      if (state[setKey] === '0') {
        alert('0に+/-はつけられません。');
        return;
      }

      if (state[setKey].includes('-')) {
        state[setKey] = state[setKey].replace('-', '');
      } else {
        state[setKey] = '-' + state[setKey];
      }
    };

    const reset = (): void => {
      state.num1 = '0';
      state.num2 = '0';
      state.ope = '';
    };

    const cal = (): void => {
      const ANS = Calculator.cal(state.num1, state.num2, state.ope);
      state.num1 = ANS.toString();
      state.num2 = '0';
      state.ope = '';
    };

    const pushBtn = (keyCode: string): void => {
      const keyType: keyCode = Calculator.keyCodeAnalyze(keyCode);
      if (keyType === 'clear') {
        reset();
      } else if (keyType === 'ope') {
        state.ope = keyCode;
      } else if (keyType === 'cal') {
        cal();
      } else if (keyType === 'ope,cal') {
        state.ope = keyCode;
        cal();
      } else if (keyType === 'reverse') {
        reverseNum(inputNum());
      } else {
        setNum(inputNum(), keyCode);
      }
    };

    return { state, pushBtn, setNum, cal, display };
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
