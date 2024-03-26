import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import Pre from './pre.vue'

type Direction = 'horizontal' | 'vertical' | 'both'

export default defineComponent({
  name: 'CardE',
  setup() {
    const cardRef = ref<Nullable<HTMLDivElement>>(null)
    const cornerRef = ref<Nullable<HTMLDivElement>>(null)
    const cornerRef1 = ref<Nullable<HTMLDivElement>>(null)
    const gapRef = ref<Nullable<HTMLDivElement>>(null)
    const state = reactive({
      corner: 40,
      radius: 10,
      direction: 'horizontal',
      gap: 14,
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
      return {
        '-webkit-mask-image':
          `${image[state.direction as Direction]
          }, radial-gradient(circle at ${state.corner}px ${state.corner}px, red ${state.corner}px, transparent ${state.corner}.5px)`,
        '-webkit-mask-position':
          `${state.direction === 'both' ? `-${state.radius}px, 50% -${state.radius}px` : postion}, -${state.corner}px -${state.corner}px`,
        '-webkit-mask-size':
          `${state.direction === 'both' ? `100% ${gap}, ${gap} 100%` : size}, 100%`,
        '-webkit-mask-composite': 'source-out, destination-over',
        'mask-composite': 'subtract, add',
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
      cornerRef.value?.style.setProperty(
        '--percent',
        `${state.corner / state.max}`,
      )
      cornerRef1.value?.style.setProperty(
        '--percent',
        `${state.radius / state.corner}`,
      )
      gapRef.value?.style.setProperty(
        '--percent',
        `${state.gap / state.max}`,
      )
    })

    return () => (
      <main class="main">
        <div class="card-con">
          <div class="card" style={{ ...style.value }} ref={cardRef}></div>
        </div>
        <aside class="side">
          <section class="item">
            <span class="name">corner</span>
            <input
              type="range"
              ref={cornerRef}
              v-model={state.corner}
              data-tips={`${state.corner}px`}
              max={state.max}
            />
          </section>
          <section class="item">
            <span class="name">radius</span>
            <input
              type="range"
              ref={cornerRef1}
              v-model={state.radius}
              data-tips={`${state.radius}px`}
              max={state.corner}
            />
          </section>
          <section class="item">
            <span class="name">direction</span>
            <label class="radio" data-tips="horizontal">
              <input
                type="radio"
                name="dir"
                value="horizontal"
                v-model={state.direction}
              />
            </label>
            <label class="radio" data-tips="vertical">
              <input type="radio" name="dir" value="vertical" v-model={state.direction} />
            </label>
            <label class="radio" data-tips="both">
              <input type="radio" name="dir" value="both" v-model={state.direction} />
            </label>
          </section>
          <section class="item">
            <span class="name">gap</span>
            <input
              type="range"
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
