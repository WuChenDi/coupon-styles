import { ref, reactive, computed, onMounted, defineComponent, Ref } from 'vue'
import Pre from './pre.vue'

export default defineComponent({
  name: 'cardB',
  setup() {
    const state = reactive({
      corner: 20,
      max: 0
    })

    const style = computed(() => ({
      '-webkit-mask-image': `radial-gradient(circle at ${state.corner}px ${state.corner}px, transparent ${state.corner}px, red ${state.corner}.5px)`,
      '-webkit-mask-position': `-${state.corner}px -${state.corner}px`
    }))

    const card: Ref<HTMLDivElement | null> = ref(null)

    onMounted(() => {
      if (!(card as unknown as Ref<HTMLDivElement>).value) return

      const { width, height } = (card as unknown as Ref<HTMLDivElement>).value.getBoundingClientRect()

      state.max = Math.min(width, height) / 2
    })

    return () => (
      <main class='main'>
        <div class='card-con'>
          <div class='card' style={{ style: style.value }} ref='card'></div>
        </div>
        <aside class='side'>
          <section class='item'>
            <span class='name'>corner</span>
            <input
              type='range'
              v-model={state.corner}
              data-tips={state.corner + 'px'}
              style={{ '--percent': state.corner / state.max }}
              max={state.max}
            />
          </section>
          <Pre style={{ style }} />
        </aside>
      </main>
    )
  }
})
