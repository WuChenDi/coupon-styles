import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import Pre from './pre.vue'

export default defineComponent({
  name: 'CardA',
  setup() {
    const cardRef = ref<Nullable<HTMLDivElement>>(null)
    const rangeRef = ref<Nullable<HTMLDivElement>>(null)
    const offsetRef = ref<Nullable<HTMLDivElement>>(null)
    const state = reactive({
      radius: 10,
      direction: 'vertical',
      position: 'start',
      offset: 50,
      width: 100,
      height: 100,
    })

    const style = computed(() => {
      const offset = state.position === 'center' ? '50%' : `${state.offset}px`

      const position = `${state.direction === 'horizontal' ? '' : '0 '}${
        state.position === 'end' ? '' : '-'
      }${state.radius}px`

      return {
        '-webkit-mask-image': `radial-gradient(circle at ${
          state.position === 'end' ? 'right ' : ''
        }${state.direction === 'horizontal' ? `${state.radius}px` : offset} ${
          state.position === 'end' ? 'bottom ' : ''
        }${
          state.direction === 'horizontal' ? offset : `${state.radius}px`
        }, transparent ${state.radius}px, red ${state.radius}.5px)`,
        '-webkit-mask-position': position,
      }
    })

    const max = computed(() => ({
      radius: Math.min(state.width, state.height) / 2,
      offset: state.direction === 'horizontal' ? state.height / 2 : state.width / 2,
    }))

    onMounted(() => {
      if (!cardRef.value) {
        return
      }

      const { width, height } = cardRef.value.getBoundingClientRect()

      state.width = width
      state.height = height
    })

    watchEffect(() => {
      rangeRef.value?.style.setProperty('--percent', `${state.radius / max.value.radius}`)
      offsetRef.value?.style.setProperty(
        '--percent',
        `${state.offset / max.value.offset}`
      )
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
              max={max.value.radius}
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
          </section>
          <section class='item' data-direction={state.direction}>
            <span class='name'>position</span>
            <label
              class='radio'
              data-tips={state.direction === 'vertical' ? 'left' : 'top'}
            >
              <input type='radio' name='pos' value='start' v-model={state.position} />
            </label>
            <label class='radio' data-tips='center'>
              <input type='radio' name='pos' value='center' v-model={state.position} />
            </label>
            <label
              class='radio'
              data-tips={state.direction === 'vertical' ? 'right' : 'bottom'}
            >
              <input type='radio' name='pos' value='end' v-model={state.position} />
            </label>
          </section>
          <section class='item' v-show={state.position !== 'center'}>
            <span class='name'>offset</span>
            <input
              type='range'
              ref={offsetRef}
              v-model={state.offset}
              data-tips={`${state.offset}px`}
              max={max.value.offset}
            />
          </section>
          <Pre style={{ style }} />
        </aside>
      </main>
    )
  },
})
