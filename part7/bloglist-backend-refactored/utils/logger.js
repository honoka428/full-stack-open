// File to declare frequently used logger commands to
// simplify dev process

const info = (...params) => {
  console.log(...params)
}
  
const error = (...params) => {
  console.error(...params)
}
  
module.exports = {
  info, error
}