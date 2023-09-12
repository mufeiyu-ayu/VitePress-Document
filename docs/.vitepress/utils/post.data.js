// example.data.js
// posts.data.js
// posts.data.js

// posts.data.js
import {createContentLoader} from 'vitepress'

export default createContentLoader('src/**/*.md', {
	includeSrc: true, // include raw markdown source?
	render: true, // include rendered full page HTML?
	excerpt: true, // include excerpt?
	transform(rawData) {
		// map, sort, or filter the raw data as you wish.
		// the final result is what will be shipped to the client.
		return rawData.map(({url, frontmatter, excerpt, html, src}) => {
			// console.log(frontmatter.date)

			return {
				frontmatter,
				url,
			}
		})
	},
})
