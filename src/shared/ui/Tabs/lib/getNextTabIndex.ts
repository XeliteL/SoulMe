const getNextTabIndex = (key: string, index: number, length: number) => {
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (index + 1) % length
    case "ArrowLeft":
    case "ArrowUp":
      return (index - 1 + length) % length
    case "Home":
      return 0
    case "End":
      return length - 1
  }
}

export default getNextTabIndex
