
function range(start, end, char = null) {
  return [...Array(end).keys()].map(i => char != null ? char : (i + start));
}

function header(title) {
  let border = () => range(0, 20, "=").join("");
  return `\n\n${border()}${title}${border()}`

}
