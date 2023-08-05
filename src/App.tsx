import { defineComponent } from 'vue'
import Header from './components/header.vue'
import Main from './components/main.vue'
import Footer from './components/footer'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    )
  },
})
