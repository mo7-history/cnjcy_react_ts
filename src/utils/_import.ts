const _import = (path: string) => {
  let Template = require(`@/pages${path}`);
  if (Template && Template.default) {
    return Template.default;
  } else {
    console.error(`页面路由组件引用出现了问题!! -- ${path}`);
  }
};

export default _import;
