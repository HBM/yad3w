
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const random = () => {
  const min = -10
  const max = 10
  return window.Math.floor(window.Math.random() * (max - min + 1)) + min
}
