<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <calculator-flame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CalculatorFlame from '@/components/molecules/CalculatorFlame.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    'calculator-flame': CalculatorFlame
  }
});
</script>
