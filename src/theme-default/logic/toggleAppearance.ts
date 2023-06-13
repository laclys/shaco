const classList = document.documentElement.classList

const setClassList = (isDark = false) => {
  isDark ? classList.add('dark') : classList.remove('dark')
}

export function toggle() {
  if (classList.contains('dark')) {
    setClassList(false)
  } else {
    setClassList(true)
  }
}
