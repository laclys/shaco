const APPEARANCE_KEY = 'appearance'

const setClassList = (isDark = false) => {
  const classList = document.documentElement.classList
  isDark ? classList.add('dark') : classList.remove('dark')
}

const updateAppearance = () => {
  const userPreference = localStorage.getItem(APPEARANCE_KEY)
  setClassList(userPreference === 'dark')
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  updateAppearance()
  // 监听 localStorage 变化
  window.addEventListener('storage', updateAppearance)
}

export function toggle() {
  const classList = document.documentElement.classList
  if (classList.contains('dark')) {
    setClassList(false)
    localStorage.setItem(APPEARANCE_KEY, 'light')
  } else {
    setClassList(true)
    localStorage.setItem(APPEARANCE_KEY, 'dark')
  }
}
