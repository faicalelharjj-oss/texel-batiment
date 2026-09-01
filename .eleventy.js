module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  eleventyConfig.addFilter("urlencode", (str) => encodeURIComponent(str || ""));

  eleventyConfig.addCollection("lots", (collectionApi) =>
    collectionApi.getFilteredByGlob("lots/*.md").sort(
      (a, b) => Number(a.data.lotNumber) - Number(b.data.lotNumber)
    )
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
