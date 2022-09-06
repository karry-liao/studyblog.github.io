import Vue from "vue";
const requireComponents = require.context(
  "@/components/common",
  true,
  /\.vue$/
);
requireComponents.keys().forEach((fileName) => {
  const reqCom = requireComponents(fileName).default;
  const reqComName = reqCom.name;
  Vue.component(reqComName, reqCom);
});