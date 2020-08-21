const unit = {
  // 对象数组去重--对对象中某个属性的值进行去重
  objectArrayReduce(arr, key) {
    // arr 当前数组  key-要去重的对象属性
    let hash = {};
    const newArr = arr.reduce((item, next) => {
      !hash[next[key]] && (hash[next[key]] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  }
};

export default unit;
