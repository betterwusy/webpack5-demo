// import _ from "lodash";
console.log("hello main.js");
// console.log(_.debounce);

document.getElementById("btn").onclick = function () {
  /**
   *  code split:
   *  3. 通过 import 语法动态导入，只有执行的时候才导入这个 chunk
   */
  // import(/* webpackChunkName: "lodash" */ "lodash").then((res) => {
  //   console.log(res);
  // });
};

// import "core-js/es/promise";
/**
 *  直接整个引入 core-js
 *  让 babel 自动按需引入 core-js 的 polyfill 代码
 */
// const promise = Promise.resolve();
// promise.then(() => {
//   console.log("promise resolve");
// });

console.log([1, 3, 4, 5, 10].includes(2));
