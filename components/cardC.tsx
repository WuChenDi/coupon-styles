import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import Pre from './pre.vue'

export default defineComponent({
  name: 'CardC',
  setup() {
    const cardRef = ref<Nullable<HTMLDivElement>>(null)
    const rangeRef = ref<Nullable<HTMLDivElement>>(null)
    const gapRef = ref<Nullable<HTMLDivElement>>(null)

    const state = reactive({
      radius: 10,
      direction: 'horizontal',
      gap: 28,
      max: 0,
    })

    const style = computed(() => {
      const gap = `${state.gap * 1 + state.radius * 2}px`
      const size = state.direction === 'horizontal' ? `100% ${gap}` : `${gap} 100%`
      const postion = `${state.direction === 'horizontal' ? '' : '50% '}-${
        state.radius
      }px`
      const horizontal = `radial-gradient(circle at ${state.radius}px, transparent ${state.radius}px, red ${state.radius}.5px)`
      const vertical = `radial-gradient(circle at 50% ${state.radius}px, transparent ${state.radius}px, red ${state.radius}.5px)`
      const both = `${horizontal}, radial-gradient(circle at 50% ${state.radius}px, red ${state.radius}px, transparent ${state.radius}.5px)`
      const image = {
        horizontal,
        vertical,
        both,
      }
      const composite =
        state.direction === 'both'
          ? { '-webkit-mask-composite': 'source-out', 'mask-composite': 'subtract' }
          : {}
      return {
        '-webkit-mask-image':
          image[state.direction as 'horizontal' | 'vertical' | 'both'],
        '-webkit-mask-position':
          state.direction === 'both'
            ? `-${state.radius}px, 50% -${state.radius}px`
            : postion,
        '-webkit-mask-size':
          state.direction === 'both' ? `100% ${gap}, ${gap} 100%` : size,
        // '-webkit-mask-repeat': 'round',
        ...composite,
      }
    })

    onMounted(() => {
      if (!cardRef.value) {
        return
      }

      const { width, height } = cardRef.value.getBoundingClientRect()

      state.max = Math.min(width, height) / 2
    })

    watchEffect(() => {
      rangeRef.value?.style.setProperty('--percent', `${state.radius / state.max}`)

      gapRef.value?.style.setProperty('--percent', `${state.gap / state.max}`)
    })

    return () => (
      <main class='main'>
        <div class='card-con'>
          <div class='card' style={{ ...style.value }} ref={cardRef}></div>
        </div>
        <aside class='side'>
          <section class='item'>
            <span class='name'>radius</span>
            <input
              type='range'
              ref={rangeRef}
              v-model={state.radius}
              data-tips={`${state.radius}px`}
              max={state.max}
            />
          </section>
          <section class='item'>
            <span class='name'>direction</span>
            <label class='radio' data-tips='horizontal'>
              <input
                type='radio'
                name='dir'
                value='horizontal'
                v-model={state.direction}
              />
            </label>
            <label class='radio' data-tips='vertical'>
              <input type='radio' name='dir' value='vertical' v-model={state.direction} />
            </label>
            <label class='radio' data-tips='both'>
              <input type='radio' name='dir' value='both' v-model={state.direction} />
            </label>
          </section>
          <section class='item'>
            <span class='name'>gap</span>
            <input
              type='range'
              ref={gapRef}
              v-model={state.gap}
              data-tips={`${state.gap}px`}
              max={state.max}
            />
          </section>
          <Pre style={{ style }} />
        </aside>
      </main>
    )
  },
})
