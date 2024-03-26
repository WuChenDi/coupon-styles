<script setup lang="ts">
import CardA from './cardA'
import CardB from './cardB'
import CardC from './cardC'
import CardD from './cardD'
import CardE from './cardE'

const state = reactive({
  type: 'A',
})

const view = computed(() => {
  return {
    A: CardA,
    B: CardB,
    C: CardC,
    D: CardD,
    E: CardE,
  }[state.type]
})
</script>

<template>
  <div class="m-8">
    <input v-model="state.type" type="radio" name="type" value="A" />
    <input v-model="state.type" type="radio" name="type" value="D" />
    <input v-model="state.type" type="radio" name="type" value="C" />
    <input v-model="state.type" type="radio" name="type" value="B" />
    <input v-model="state.type" type="radio" name="type" value="E" />
  </div>
  <Component :is="view" />
</template>

<style scoped>
[type='radio'][value='A']::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='150' height='100' viewBox='0 0 150 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M75 0c0 11.046-8.954 20-20 20S35 11.046 35 0H10C4.477 0 0 4.477 0 10v80c0 5.523 4.477 10 10 10h25c0-11.046 8.954-20 20-20s20 8.954 20 20h65c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10H75z' fill='%23C4C4C4'/%3E%3C/svg%3E");
}

[type='radio'][value='D']::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='150' height='100' viewBox='0 0 150 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M55 20c11.046 0 20-8.954 20-20h65c5.523 0 10 4.477 10 10v80c0 5.523-4.477 10-10 10H75c0-11.046-8.954-20-20-20s-20 8.954-20 20H10c-5.523 0-10-4.477-10-10V10C0 4.477 4.477 0 10 0h25c0 11.046 8.954 20 20 20zm0 40c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z' fill='%23EC7979'/%3E%3C/svg%3E");
}

[type='radio'][value='B']::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='150' height='100' viewBox='0 0 150 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 0h110c0 11.046 8.954 20 20 20v60c-11.046 0-20 8.954-20 20H20c0-11.046-8.954-20-20-20V20c11.046 0 20-8.954 20-20z' fill='%23C4C4C4'/%3E%3C/svg%3E");
}

[type='radio'][value='C']::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='150' height='100' viewBox='0 0 150 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M65 0c0 11.046-8.954 20-20 20S25 11.046 25 0H10C4.477 0 0 4.477 0 10v80c0 5.523 4.477 10 10 10h15c0-11.046 8.954-20 20-20s20 8.954 20 20h20c0-11.046 8.954-20 20-20s20 8.954 20 20h15c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10h-15c0 11.046-8.954 20-20 20S85 11.046 85 0H65z' fill='%23C4C4C4'/%3E%3C/svg%3E");
}

[type='radio'][value='E']::before {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='150' height='100' viewBox='0 0 150 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20 0c0 11.046-8.954 20-20 20v20c5.523 0 10 4.477 10 10S5.523 60 0 60v20c11.046 0 20 8.954 20 20h109c0-11.046 8.954-20 20-20 .335 0 .669.008 1 .025V60c-5.523 0-10-4.477-10-10s4.477-10 10-10V20c-11.046 0-20-8.954-20-20H20z' fill='%23EC7979'/%3E%3C/svg%3E");
}
</style>
