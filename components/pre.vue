<script setup lang="ts">
defineProps({
  style: Object,
})

const state = reactive({
  copied: false,
})

const pre = ref<Nullable<HTMLPreElement>>(null)
const txt = ref<Nullable<HTMLTextAreaElement>>(null)
const timer = ref<Nullable<NodeJS.Timeout>>(null)

const copy = () => {
  if (!txt.value && !pre.value) {
    return
  }

  if (pre.value?.textContent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    txt.value.value = pre.value?.textContent
  }

  txt.value?.select?.()
  document.execCommand('copy')
  state.copied = true
  timer.value && clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    state.copied = false
  }, 2000)
}
</script>

<template>
  <div class="pre-wrap" :class="{ copied: state.copied }">
    <pre
      ref="pre"
      class="pre"
    ><template v-for="(value, name, index) in style" :key="name">{{ index !== 0 ? '\n' : '' }}<code>{{ name }}</code>: {{ value }};</template></pre>
    <button
      data-tips="copy"
      class="copy"
      :class="{ copied: state.copied }"
      @click="copy"
    ></button>
    <textarea ref="txt" tabindex="-1" class="txt-hidden" readonly></textarea>
  </div>
</template>

<style scoped>
.pre-wrap {
  position: relative;
}

.pre-wrap::after {
  content: '🎉 Copied to clipboard!';
  position: absolute;
  display: flex;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #f3f4f5;
  font-size: 1.5rem;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    linear-gradient(var(--theme), var(--theme));
  opacity: 0;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: 0.2s;
  z-index: 2;
}

.pre-wrap.copied::after {
  opacity: 1;
  visibility: visible;
}

.pre {
  padding: 1rem;
  background-color: #2c3e50;
  color: #f3f4f5;
  font-size: 1.2rem;
  overflow: auto;
  border-radius: 0.5rem;
  white-space: pre-wrap;
  line-height: 1.5;
  margin: 0;
  font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
}

code {
  color: transparent;
  font-family: inherit;
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
    linear-gradient(var(--theme), var(--theme));
  background-clip: text;
  -webkit-background-clip: text;
}

.copy {
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  margin: 0;
  outline: 0;
  color: #f3f4f5;
  width: 3rem;
  height: 2.5rem;
  border-radius: 0 0.5rem 0 0.5rem;
  cursor: pointer;
  transition: 0.2s;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E %3Cpath fill='%23fff' d='M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z'%3E%3C/path%3E %3C/svg%3E")
    center no-repeat var(--theme);
  background-size: 1rem;
}

.copy:focus {
  box-shadow:
    0 0 0 0.25rem rgba(255, 255, 255, 0.6),
    0 0 0 0.25rem var(--theme);
}

.copy.copied {
  opacity: 0;
  visibility: hidden;
}

.txt-hidden {
  position: absolute;
  opacity: 0;
  clip: rect(0 0 0 0);
  /* visibility: hidden; */
}
</style>
