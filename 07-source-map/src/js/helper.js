export function sum(...args) {
  // 这里我们故意让reduce调用两次抛出一个错误
  return args.reduce((a, b) => a + b, 0)();
}

export default {};
