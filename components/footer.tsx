import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Cfooter',
  setup() {
    const footerText = 'Copyright (c) 2022-PRESENT | '

    return () => (
      <footer class="pa-8 mt-auto font-size-5">
        {footerText}
        <a href="https://github.com/WuChenDi" target="_blank"> wudi </a>
      </footer>
    )
  },
})
