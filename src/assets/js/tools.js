let methods = {
  /**
   * 转换时间
   * @param {毫秒时间戳} time
   * @return 2019-05-01
   */
  formateTime(timestamp) {
    let time = new Date(timestamp),
      y = time.getFullYear(),
      m = time.getMonth() + 1,
      d = time.getDate(),
      formateLength = m => {
        return m < 10 ? '0' + m : m
      }
    return `${y}-${formateLength(m)}-${formateLength(d)}`
  }
}

export default methods
