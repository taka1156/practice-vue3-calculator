<template>
  <button class="cal-key" @click="pushBtn">
    {{ calKey }}
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

type Props = {
  calKey: string;
};

export default defineComponent({
  name: 'CalBtn',
  props: {
    calKey: {
      type: String,
      default: '0',
      required: true
    }
  },
  setup(props: Props, context: SetupContext) {
    const pushBtn = (): void => {
      context.emit('push-btn', props.calKey);
    };

    return { pushBtn };
  }
});
</script>

<style scoped>
/* css reset */
button {
  cursor: pointer;
  outline: none;
}

.cal-key {
  border: 1px solid gray;
  font-size: 30px;
  padding: 10px;
  height: 50%;
  width: 25%;
}
</style>
