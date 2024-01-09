/**
 * 将时间格式化为指定的字符串格式。
 * @param {Date|number|string} time - 要格式化的时间，可以是Date对象、毫秒数或者ISO 8601格式的字符串。
 * @param {string} [pattern] - 可选参数，指定要使用的日期格式模式，默认为'{y}-{m}-{d} {h}:{i}:{s}'。
 * @returns {string} - 格式化后的时间字符串。
 */
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 重置表单。
 * @param {string} refName - 表单的引用名称。
 */
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}
/**
 * 添加日期范围到参数中。
 * @param {object} params - 参数对象。
 * @param {[date,date]} dateRange - 日期范围数组，包含开始时间和结束时间。
 * @param {string} [propName] - 可选参数，属性名称，默认为'beginTime'和'endTime'。
 * @returns {object}
 */
export function addDateRange(params, dateRange, propName) {
  let search = params
  search.params =
    typeof search.params === 'object' &&
    search.params !== null &&
    !Array.isArray(search.params)
      ? search.params
      : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}
/**
 * 添加日期范围到参数里
 * @param {object} params - 参数对象
 * @param {[date,date]} dateRange - 日期范围，包含开始时间和结束时间
 * @param {string} begin - 开始时间字段
 * @param {string} end - 结束时间字段
 * @returns {object}
 */
export function addDateRange1(params, dateRange, begin, end) {
  let search = params
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search['beginTime'] = dateRange[0]
    search['endTime'] = dateRange[1]
  } else {
    search[begin] = dateRange[0]
    search[end] = dateRange[1]
  }
  return search
}
/**
 * 根据数据字典的value回显label。
 * @param {object} datas - 数据字典对象，包含多个key-value对，value为数字。
 * @param {string|number} value - 要回显的值。
 * @returns {string} - 回显的label。
 */
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}
/**
 * 根据数据字典的value回显label（字符串数组）。
 * @param {object} datas - 数据字典对象，包含多个key-value对，value为数字。
 * @param {string|number|string[]|number[]} value - 要回显的值，可以是单个值或数组。
 * @param {string} [separator] - 可选参数，值之间的分隔符，默认为','。
 * @returns {string} - 回显的label字符串。
 */
export function selectDictLabels(datas, value, separator) {
  if (value === undefined || value.length === 0) {
    return ''
  }
  if (Array.isArray(value)) {
    value = value.join(',')
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false
    Object.keys(datas).some((key) => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}
/**
 * 格式化字符串，替换其中的占位符 %s 为提供的参数。
 * @param {string} str - 需要格式化的字符串。
 * @returns {string} - 格式化后的字符串。
 */
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}
/**
 * 将特定的字符串形式的null、undefined等转换为空字符串""。
 * @param {string} str - 要转换的字符串。
 * @returns {string} - 转换后的字符串。
 */
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}
/**
 * 合并两个对象的属性，如果有重复的属性，则使用后一个对象的属性值。
 * @param {object} source - 源对象。
 * @param {object} target - 目标对象。
 * @returns {object} - 合并后的对象。
 */
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}
/**
 * 构造树形结构数据。
 * @param {Array} data - 数据源数组。
 * @param {string} [id] - 可选参数，id字段的名称，默认为'id'。
 * @param {string} [parentId] - 可选参数，父节点字段的名称，默认为'parentId'。
 * @param {string} [children] - 可选参数，子节点字段的名称，默认为'children'。
 * @returns {Array} - 构造好的树形结构数据。
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  }
  var childrenListMap = {}
  var nodeIds = {}
  var tree = []
  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }
  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }
  for (let t of tree) {
    adaptToChildrenList(t)
  }
  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}
/**
 * 处理参数对象，将对象转换为URL参数字符串。
 * @param {object} params - 参数对象。
 * @returns {string} - 转换后的URL参数字符串。
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== '' &&
            typeof value[key] !== 'undefined'
          ) {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
/**
 * 根据给定路径返回标准化的项目路径。
 * @param {string} p - 路径字符串。
 * @returns {string} - 标准化后的项目路径。
 */
export function getNormalPath(p) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  let res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}
/**
 * 验证给定数据是否为Blob格式。
 * @param {object} data - 待验证的数据。
 * @returns {boolean} - 验证结果，如果是Blob格式则返回true，否则返回false。
 */
export function blobValidate(data) {
  return data.type !== 'application/json'
}
