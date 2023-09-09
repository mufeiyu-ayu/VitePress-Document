let isBol = true
document.addEventListener('click', function (event) {
	if (event.target.tagName === 'IMG') {
		const clickedElement = event.target
		let currentScale = parseFloat(
			clickedElement.style.transform.replace('scale(', '').replace(')', ''),
		)
		if (clickedElement.width > 600) return
		if (isNaN(currentScale) || currentScale === 1) {
			// 如果图片未放大，则放大图片
			clickedElement.style.transform = 'scale(1.5)'
			clickedElement.className = 'bigImg'
		} else {
			// 如果图片已放大，则还原图片
			clickedElement.style.transform = 'scale(1)'
			clickedElement.className = ''
		}
	} else {
		return
	}
})
