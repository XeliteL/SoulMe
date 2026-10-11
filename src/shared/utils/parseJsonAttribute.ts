const parseJsonAttribute = <T>(
  element: Element,
  name: string,
  fallback: T,
): T => {
  const value = element.getAttribute(name)
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export default parseJsonAttribute
