<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.2s ease-in-out;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0.5;
  transform: translateX(5vw);
}
</style>
