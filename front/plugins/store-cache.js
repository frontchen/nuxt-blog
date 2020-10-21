export default function(ctx) {
  console.log(["store", ctx]);
  // 获取localStorage中的store数据
  let storeCache = window.sessionStorage.getItem("storeCache");
  if (storeCache) {
    // 将localStorage中的store数据替换到store中
    ctx.store.replaceState(JSON.parse(storeCache));
    window.sessionStorage.removeItem("storeCache");
  }
  // 在页面刷新时将vuex里的信息保存到sessionStorage里
  // ie、谷歌、360 页面刷新执行顺序 onbeforeunload -> onunload -> onload，关闭执行顺序 onbeforeunload -> onunload
  // firefox 页面刷新只执行 onunload，页面关闭只执行 onbeforeunload
  let eventName = "beforeunload";
  const fireFox = navigator.userAgent.indexOf("Firefox") !== -1;
  if (fireFox) {
    eventName = "unload";
  }
  //离开页面 刷新前 将store中的数据存到localStorage
  window.addEventListener(eventName, () => {
    window.sessionStorage.setItem(
      "storeCache",
      JSON.stringify(ctx.store.state)
    );
  });
}
