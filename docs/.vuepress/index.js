const requireComponent = require.context("./", true, /\.vue$/); //动态引入文件
// const install = (Vue) => {
//   if (install.installed) return;
//   install.installed;

  requireComponent.keys().forEach((fileName) => {
    //requireComponent.keys() => []
    const config = requireComponent(fileName);
    const conponemtName = config.default.name; //组件名
    Vue.component(conponemtName, config.default || config);
  });
  // Vue.directive("focus", {
  //   inserted: function (el) {
  //     el.focus();
  //   },
  // });
// };

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}