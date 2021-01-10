import moment from 'moment'
import _ from 'lodash'

const unit = {
  // 数组分块
  chunk: (arr, size) => {
    return _.chain(arr)
      .chunk(size)
      .value()
  },
  // 删除左右两端空格
  trim: str => {
    if (!str) return str
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  // 删除左边空格
  ltrim: str => {
    if (!str) return str
    return str.replace(/(^\s*)/g, '')
  },
  // 删除右边空格
  rtrim: str => {
    if (!str) return str
    return str.replace(/(\s*$)/g, '')
  },

  // 时间差
  dateDiff: (start, end, key) => {
    key = key || 'ms'
    return moment(end).diff(moment(start), key)
  },
  // 毫秒转时间
  millToDate(x, format) {
    let tmpTime = moment.duration(x)
    if (!format) {
      format = 'HH小时mm分钟'
    }
    let str = format.replace('YYYY', tmpTime.years())
    str = str.replace(/MM/g, tmpTime.months())
    str = str.replace(/DD/g, tmpTime.days())
    str = str.replace(/HH/g, tmpTime.hours())
    str = str.replace(/mm/g, tmpTime.minutes())
    str = str.replace(/ss/g, tmpTime.seconds())
    return str
  },

  // 身份证号合法性验证
  // 15位校验规则 6位地址编码+6位出生日期+3位顺序号
  // 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
  // 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
  //               公式(1)中：
  //               i----表示号码字符从由至左包括校验码在内的位置序号；
  //               ai----表示第i位置上的号码字符值；
  //               Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
  //               i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
  //               Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
  IdentityCodeValid(card) {
    let result = {
      valid: false,
      msg: '',
      city: '',
      birthday: '',
      sex: ''
    }
    let regionCode = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    }
    // /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/ 18位校验
    if (!card || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/i.test(card)) {
      result.msg = '身份证号格式错误'
      return result
    }
    let city = regionCode[card.substr(0, 2)]
    if (!city) {
      result.msg = '地址编码错误'
      return result
    }
    result.city = city
    // 18位身份证需要验证最后一位校验位
    if (card.length === 18) {
      let cardArr = card.split('')
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2] // 校验位
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = cardArr[i]
        wi = factor[i]
        sum += ai * wi
      }
      let last = String(parity[sum % 11])
      if (last !== cardArr[17]) {
        result.msg = '校验位错误'
        return result
      }
      result.birthday = card.substr(6, 8)
      result.sex = parseInt(card.substr(16, 1)) % 2 === 1 ? '男' : '女'
    } else {
      result.birthday = `19${card.substr(6, 6)}`
      result.sex = parseInt(card.substr(14, 1)) % 2 === 1 ? '男' : '女'
    }
    result.msg = ''
    result.valid = true
    return result
  },
  // 平级数据递归树结构
  getTreeData(
    list,
    { expand = true, title = 'title', id = 'id', pid = 'parentId' }
  ) {
    // 删除 所有 children,以防止多次调用
    list.forEach(v => {
      delete v.children
    })
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {}

    list.forEach(v => {
      if (typeof title === 'string') {
        v.title = title
      } else {
        let name = title
          .map(key => {
            return v[key]
          })
          .join(' ')
        v.title = name
      }
      v.expand = expand
      map[v[id]] = v
    })
    let val = []
    list.forEach(v => {
      // 以当前遍历项，的pid,去map对象中找到索引的id
      let parent = map[v[pid]]
      if (parent) {
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        parent.children = parent.children || []
        parent.children.push(v)
      } else {
        // 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(v)
      }
    })
    return val
  },
  // 对象数组去重--对对象中某个属性的值进行去重
  objectArrayReduce(arr, key) {
    // arr 当前数组  key-要去重的对象属性
    let hash = {}
    const newArr = arr.reduce((item, next) => {
      !hash[next[key]] && (hash[next[key]] = true && item.push(next))
      return item
    }, [])
    return newArr
  },
  // 获取主域名
  getDomain() {
    const ipRegexp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))).){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
    const hostList = ['com.cn', 'net.cn', 'org.cn', 'gov.cn']
    const domain = document.domain
    if (ipRegexp.test(domain) || domain === 'localhost') {
      return { ip: true, domain: domain }
    }
    const domainList = domain.split('.')
    const domainLen = domainList.length
    let mainHost = domainList.slice(domainLen - 2).join('.')
    let item = hostList.find(v => v === mainHost)
    if (item) {
      mainHost = domainList.slice(domainLen - 3).join('.')
    }
    return { ip: false, domain: mainHost }
  },
  waitExec(cb, milliseconds = 1000) {
    setTimeout(cb, milliseconds)
  },
  // 对象拷贝
  cloneDeep: obj => {
    if (!obj) {
      return ''
    }
    return _.cloneDeep(obj)
  },
  // 删除数组某一项
  without: (arr, item) => {
    return _.without(arr, item)
  },
  // 判断是否空对象
  isEmptyObject: val => {
    let obj = unit.cloneDeep(val)
    delete obj._index
    delete obj._rowKey
    for (let key in obj) {
      return false
    }
    return true
  },
  emptyData: () => {
    const str = '<div>暂无数据</div>'
    return str
  },
  // 填充数据
  fillListData: (list, pageSize = 20) => {
    let listLen = list.length
    if (listLen === 0) {
      return list
    }
    let len = pageSize - listLen
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        list.push({})
      }
    }
    return list
  },
  // 是否是闰年
  isLeapYear: year => {
    let cond1 = year % 4 === 0 // 条件1：年份必须要能被4整除
    let cond2 = year % 100 !== 0 // 条件2：年份不能是整百数
    let cond3 = year % 400 === 0 // 条件3：年份是400的倍数
    // 当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
    // 如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
    let cond = (cond1 && cond2) || cond3
    if (cond) {
      // 是闰年
      return true
    } else {
      // 不是闰年
      return false
    }
  },
  // 获取月、日级联数据
  getMonthDayCascaderData: () => {
    let m1 = [1, 3, 5, 7, 8, 10, 12]
    let list = [...Array(12).keys()].map(v => {
      let item = {
        label: `${v + 1}月`,
        value: v + 1,
        children: []
      }
      let len = 30
      if (m1.indexOf(v) !== -1) {
        len = 31
      }
      if (v === 2) {
        len = 28
        // 闰年29天
        if (unit.isLeapYear(moment().year())) {
          len = 29
        }
      }
      item.children = [...Array(len).keys()].map(val => {
        return {
          label: `${val + 1}日`,
          value: val + 1
        }
      })
      return item
    })
    return list
  },
  // 格式化frombody请求参数
  getFormatNetParams: params => {
    if (typeof params !== 'object') {
      return {}
    }
    let param = {
      '': JSON.stringify(params)
    }
    if (params.rel) {
      param.rel = params.rel
    }
    return param
  },

  // 级联数据，select多选 label in value
  getCheckListData: (checkList, dataList, type) => {
    // 递归级联数据
    let values = []

    function getList(clist, dlist) {
      for (let i = 0; i < clist.length; i++) {
        let index = dlist.findIndex(val => {
          return val.value === clist[i]
        })
        if (index >= 0) {
          values.push(dlist[index])
          clist.splice(i, 1)
          if (type === 'cascader') {
            dlist = dlist[index].children
          }
          if (dlist && dlist.length > 0) {
            getList(clist, dlist)
          }
          return false
        }
      }
    }
    getList(checkList, dataList)
    return values
  },
  // 级联数据 label in value
  getCascaderData: (checkList, dataList) => {
    let clist = unit.cloneDeep(checkList)
    let dlist = unit.cloneDeep(dataList)
    return unit.getCheckListData(clist, dlist, 'cascader')
  },
  // select多选 label in value
  getSelectData: (checkList, dataList) => {
    let clist = unit.cloneDeep(checkList)
    let dlist = unit.cloneDeep(dataList)
    return unit.getCheckListData(clist, dlist, 'select')
  },
  // 根据选中的最后一项，获取选中的值
  getCascaderValue: (list, value) => {
    let clist = unit.cloneDeep(list)
    let find = false
    let checked = []
    function getList(list, depth) {
      for (let i = 0; i < list.length; i++) {
        if (find) {
          return false
        }
        let v = list[i]
        checked[depth] = v.value
        if (v.value === value) {
          find = true
          checked = checked.slice(0, depth + 1)
          return false
        }
        if (v.children && v.children.length) {
          getList(v.children, depth + 1)
        }
      }
    }
    getList(clist, 0)
    return checked
  },
  //获取分辨率
  getDPI() {
    var arrDPI = new Array()
    if (window.screen.deviceXDPI) {
      arrDPI[0] = window.screen.deviceXDPI
      arrDPI[1] = window.screen.deviceYDPI
    } else {
      var tmpNode = document.createElement('DIV')
      tmpNode.style.cssText =
        'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
      document.body.appendChild(tmpNode)
      arrDPI[0] = parseInt(tmpNode.offsetWidth)
      arrDPI[1] = parseInt(tmpNode.offsetHeight)
      tmpNode.parentNode.removeChild(tmpNode)
    }
    // console.log(arrDPI)
    return arrDPI
  },
  //px转换为mm
  pxConversionMm(value) {
    var inch = value / unit.getDPI()[0]
    var c_value = inch * 25.4
    return c_value
  },
  // mm转换为px
  mmConversionPx(value) {
    var inch = value / 25.4
    var c_value = inch * unit.getDPI()[0]
    return c_value
  },
  //保留小数，不四舍五入
  formatDecimal: (num, options = { decimal: 2 }) => {
    num = num.toString()
    let index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, options.decimal + index + 1)
    } else {
      num = num.substring(0)
    }
    return parseFloat(num).toFixed(options.decimal)
  },
  // 单位转换
  // params isUnit 第三级value是否为包装单位编号，否则跟label一致
  unitTransform(dataList, isUnit) {
    let options = []
    let packingUnitDTO = []
    let unitObj = {}
    const divider = ',' // 默认分隔符
    dataList.forEach(item => {
      // 存在下级单位
      console.log(_.cloneDeep(item))
      if (item.packingUnitDTO) {
        item.sort = item.packingUnitDTO.sort
        let key = item.packingUnitDTO.supplierPackingId
        if (unitObj[key]) {
          unitObj[key].push(item)
        } else {
          unitObj[key] = [item]
        }
      } else {
        let label = `${item.label || ''}${item.baseUnitName || ''}`
        let value = [item.productCode, item.baseUnitId]
        options.push({
          label: label,
          value: isUnit ? value.join(divider) : label,
          data: [item]
        })
      }
    })

    // 单位级别--排序--升序
    Object.keys(unitObj).forEach(key => {
      unitObj[key].sort((a, b) => {
        return a.sort - b.sort
      })
    })

    // 根据上级Id，分大组
    let count = 0
    Object.keys(unitObj).forEach(key => {
      packingUnitDTO[count] = []
      unitObj[key].forEach(item => {
        if (packingUnitDTO[count][item.sort]) {
          packingUnitDTO[count][item.sort].push(item)
        } else {
          packingUnitDTO[count][item.sort] = [item]
        }
      })
      count++
    })

    // 分小组，从最低级开始
    let listArr = []
    packingUnitDTO.forEach(item => {
      let pushList = []
      item.forEach(v => {
        pushList.push(v)
        listArr.push(_.cloneDeep(pushList))
      })
    })

    // 笛卡尔积--组合
    packingUnitDTO = listArr.map(item => {
      return unit.cartesianProductOf(item)
    })

    // 排序-降序
    packingUnitDTO.forEach(item => {
      item.forEach(v => {
        v.sort((a, b) => {
          return b.sort - a.sort
        })
      })
    })

    //显示label-value
    packingUnitDTO.forEach(item => {
      item.forEach(child => {
        let labelArr = []
        let valueArr = []
        child.forEach((v, vIndex) => {
          let content = `${v.packingUnitDTO.packageValue || ''}${v
            .packingUnitDTO.smallUnitName || ''}/${v.packingUnitDTO
            .packingName || ''}`

          if (vIndex === 0) {
            content = `${v.baseUnitName || ''} ${content}`
          }
          if (child.length > 1 && child.length - 1 === vIndex) {
            content = '(' + content + ')'
          }

          labelArr.push(content)
          let packValue = [v.productCode, v.baseUnitId, v.packingId]
          valueArr.push(packValue)
        })
        let label = (child[0].label || '') + labelArr.join(',')
        options.push({
          label: label,
          value: isUnit ? valueArr.join(divider) : label,
          data: child
        })
      })
    })

    // 去重
    let result = []
    let resultObj = {}
    options.forEach(item => {
      if (!resultObj[item.value]) {
        result.push(item)
        resultObj[item.value] = true
      }
    })
    return result
  },
  // 笛卡尔积
  cartesianProductOf(array) {
    function addTo(current, args) {
      var i, copy
      var rest = args.slice(1)
      var isLast = !rest.length
      var result = []
      for (i = 0; i < args[0].length; i++) {
        copy = current.slice()
        copy.push(args[0][i])
        if (isLast) {
          result.push(copy)
        } else {
          result = result.concat(addTo(copy, rest))
        }
      }
      return result
    }
    return addTo([], array)
  },
  // params isUnit 第三级value是否为包装单位编号，否则跟label一致
  getUnitContent(data = [], isUnit) {
    let unitArr = []
    let valueArr = []
    const divider = ',' // 默认分隔符
    data.forEach((v, vIndex) => {
      if (v.packingUnitDTO) {
        let content = `${v.packingUnitDTO.packageValue || ''}${v.packingUnitDTO
          .smallUnitName || ''}/${v.packingUnitDTO.packingName || ''}`

        if (data.length > 1 && data.length - 1 === vIndex) {
          content = '(' + content + ')'
        }

        unitArr.push(content)
        let packValue = [v.productCode, v.baseUnitId, v.packingId]
        valueArr.push(packValue)
      }
    })
    if (isUnit) {
      return valueArr.join(divider)
    }
    return unitArr.join(divider)
  }
}

export default unit
