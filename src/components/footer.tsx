import { defineComponent } from 'vue'

export default defineComponent({
  name: 'footer',
  setup() {
    return () => (
      <footer
        style={{ padding: '2rem', marginTop: 'auto', fontSize: '1.2rem' }}
      >
        © 2021 made by
        <a href='https://github.com/WuChenDi' target='_blank'>
          WuChenDi
        </a>
      </footer>
    )
  }
})
