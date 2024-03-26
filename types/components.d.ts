import type { GlobalComponents } from 'vue'

declare global {
  type ComponentRef<K extends keyof GlobalComponents> = Nullable<
    InstanceType<GlobalComponents[K]>
  >
}
