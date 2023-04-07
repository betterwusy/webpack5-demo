module.exports = {
  presets: [
    [
      "@babel/preset-env",
      // 让 babel 自动按需引入 core-js 的 polyfill 代码
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
};
