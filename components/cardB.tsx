import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import Pre from './pre.vue'

export default defineComponent({
  name: 'CardB',
  setup() {
    const cardRef = ref<Nullable<HTMLDivElement>>(null)
    const rangeRef = ref<Nullable<HTMLDivElement>>(null)
    const state = reactive({
      corner: 20,
      max: 100,
    })

    const style = computed(() => ({
      '-webkit-mask-image': `radial-gradient(circle at ${state.corner}px ${state.corner}px, transparent ${state.corner}px, red ${state.corner}.5px)`,
      '-webkit-mask-position': `-${state.corner}px -${state.corner}px`,
    }))

    onMounted(() => {
      if (!cardRef.value) {
        return
      }

      const { width, height } = cardRef.value.getBoundingClientRect()

      state.max = Math.min(width, height) / 2
    })

    watchEffect(() => {
      if (!(rangeRef).value) {
        return
      }
      rangeRef.value.style.setProperty(
        '--percent',
        `${state.corner / state.max}`,
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
              ref={rangeRef}
              v-model={state.corner}
              data-tips={`${state.corner}px`}
              max={state.max}
            />
          </section>
          <Pre style={{ style }} />
        </aside>
      </main>
    )
  },
})
