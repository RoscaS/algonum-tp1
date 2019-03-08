
function range(start, end, char = null) {
  let array = [...Array(end - start).keys()];
  return array.map(i => char != null ? char : (i + start));
}

function header(title) {
  let border = () => range(0, 20, "=").join("");
  return `\n\n${border()}${title}${border()}`
}

function strToBitArray(str, start=0, end=-1) {
  return str.split('').splice(start, end);
}
