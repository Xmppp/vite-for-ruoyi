import { parseTime } from '@/ruoyi'
/**
 * 最近n天的时间范围
 * @param {number} n 天数 比如7天
 * @returns {[start,end]}
 */
export function getNDayRange(n = 7) {
  // 获取当前时间，作为结束时间
  const end = new Date()
  // 将结束时间设置为当天最后一毫秒
  end.setHours(23, 59, 59, 999)
  // 根据结束时间计算起始时间
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000 * n)
  // 将起始时间设置为当天零点
  start.setHours(0, 0, 0, 0)
  // 返回起始时间和结束时间的数组
  return [parseTime(start), parseTime(end)]
}
