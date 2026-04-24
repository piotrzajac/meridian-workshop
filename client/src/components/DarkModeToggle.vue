<template>
  <button class="dark-toggle" @click="toggle" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
    <span v-if="isDark">&#9728;</span>
    <span v-else>&#9790;</span>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'DarkModeToggle',
  setup() {
    const isDark = ref(false)

    const apply = (dark) => {
      isDark.value = dark
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    }

    const toggle = () => apply(!isDark.value)

    onMounted(() => {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      apply(saved ? saved === 'dark' : prefersDark)
    })

    return { isDark, toggle }
  }
}
</script>

<style scoped>
.dark-toggle {
  background: none;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 6px;
  padding: 0.375rem 0.625rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  color: var(--color-text, #1e293b);
  transition: background 0.15s, border-color 0.15s;
  margin-right: 0.5rem;
}
.dark-toggle:hover {
  background: var(--color-surface-hover, #f1f5f9);
  border-color: var(--color-border-dark, #cbd5e1);
}
</style>
