// let Nunjucks = require("nunjucks");
module.exports = function(eleventyConfig) {
	// let nunjucksEnvironment = new Nunjucks.Environment(
	// 	new Nunjucks.FileSystemLoader("_includes")
	// );
	// eleventyConfig.setLibrary("njk", nunjucksEnvironment);

	eleventyConfig.addPassthroughCopy({ 'template/css': 'css' })
	eleventyConfig.addPassthroughCopy({ 'template/vendor': 'vendor' })
	eleventyConfig.addPassthroughCopy('app.js')
	eleventyConfig.addFilter("base64", function(url) {
		return Buffer.from(url).toString('base64');
	})
	eleventyConfig.addFilter("removeFromRight", function(rawString, nocs) {
		// rawString = eleventyConfig.getFilter('normalize')(rawString, '');
		// rawString = eleventyConfig.filters['normalize'](rawString, '');
		// rawString = eleventyConfig.getFilter('normalize')(rawString, '');
		rawString = rawString.toString();
		let nocsVal = nocs || 0;
		nocsVal = rawString.length - 1 - nocsVal;
		// return rawString.slice(0, nocsVal);
		return rawString.substr(0, nocsVal);
	})
	eleventyConfig.addFilter("removeLastIfMatches", function(rawString, toMatch) {
		rawString = rawString.toString();
		let toMatchVal = toMatch || null;
		if (toMatchVal == null)
			return rawString;
		let lastCharIndex = rawString.length - 1;
		if (toMatchVal !== rawString[lastCharIndex])
			return rawString;
		return rawString.substr(0, lastCharIndex);
	})
}
