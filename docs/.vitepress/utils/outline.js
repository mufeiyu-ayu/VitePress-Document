// 解析当前页面md文件标题信息，封装大纲数据结构

export function getHeaders() {
	const headers = [
		...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)'),
	]
		.filter((el) => el.id && el.hasChildNodes())
		.map((el) => {
			const level = Number(el.tagName[1])
			return {
				title: serializeHeader(el),
				link: '#' + el.id,
				level,
			}
		})

	let res1 = resolveHeaders(headers, {level: 'deep'})

	return resolveDataKey(res1)
}
function serializeHeader(h) {
	let ret = ''
	for (const node of h.childNodes) {
		if (node.nodeType === 1) {
			if (
				node.classList.contains('VPBadge') ||
				node.classList.contains('header-anchor')
			) {
				continue
			}
			ret += node.textContent
		} else if (node.nodeType === 3) {
			ret += node.textContent
		}
	}
	return ret.trim()
}
function resolveHeaders(headers, range) {
	if (range === false) {
		return []
	}

	const levelsRange =
		(typeof range === 'object' && !Array.isArray(range)
			? range.level
			: range) || 2

	const [high, low] =
		typeof levelsRange === 'number'
			? [levelsRange, levelsRange]
			: levelsRange === 'deep'
			? [2, 6]
			: levelsRange

	headers = headers.filter((h) => h.level >= high && h.level <= low)

	const ret = []
	outer: for (let i = 0; i < headers.length; i++) {
		const cur = headers[i]
		if (i === 0) {
			ret.push(cur)
		} else {
			for (let j = i - 1; j >= 0; j--) {
				const prev = headers[j]
				if (prev.level < cur.level) {
					;(prev.children || (prev.children = [])).push(cur)
					continue outer
				}
			}
			ret.push(cur)
		}
	}

	return ret
}

// 处理headers数据
function resolveData(data) {
	if (Array.isArray(data)) {
		return data.map((item) => resolveData(item))
	} else {
		const newArr = []
		for (let key in data) {
			if (key === 'title' || key === 'link') {
				newArr[key] = data[key]
			} else if (Array.isArray(data[key])) {
				newArr[key] = resolveData(data[key])
			}
		}
		return newArr
	}
}

// 处理key值
function resolveDataKey(data, prefix = '0') {
	return data.map((item, index) => {
		const key = `${prefix}-${index}`
		const newItem = {...item, key}

		if (newItem.children && newItem.children.length > 0) {
			newItem.children = resolveDataKey(newItem.children, key)
		}
		return newItem
	})
}
