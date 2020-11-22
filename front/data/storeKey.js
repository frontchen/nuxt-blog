// 缓存前缀
const prefix = "blog-front";

// localStorage
const localKey = {
  regionCascader: "base-region-cascader" // 省市区级联
};

// sessionStorage
const sessionKey = {
  menuOpen: `${prefix}-menu-open`, // 展开的菜单项
  menuActive: `${prefix}-menu-active`, // 激活的菜单项
  userToken: `${prefix}-user-token`, // 授权token
  userInfo: `${prefix}-user-info` // 登录用户信息【基本信息、权限列表】
};

const storeKey = {
  ...localKey,
  ...sessionKey
};

export default storeKey;
