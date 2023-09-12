export default function (timestamp) {
	// 创建一个新的Date对象，传入时间戳（以毫秒为单位，需要乘以1000）
	var date = new Date(timestamp * 1000)

	// 获取日期的年、月、日部分
	var year = date.getFullYear()
	var month = String(date.getMonth() + 1).padStart(2, '0') // 补零以确保两位数
	var day = String(date.getDate()).padStart(2, '0')

	// 将年、月、日组合成日期字符串
	var dateString = `${year}-${month}-${day}`

	return dateString
}
