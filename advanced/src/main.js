// import _ from "lodash";
console.log("hello main.js");
// console.log(_.debounce);

document.getElementById("btn").onclick = function () {
  /**
   *  code split:
   *  3. 通过 import 语法动态导入，只有执行的时候才导入这个 chunk 
   */
  import(/* webpackChunkName: "math" */ "./js/math").then((res) => {
    console.log(res.default(2, 3));
  });
};
