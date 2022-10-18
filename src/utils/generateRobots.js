const parseRules = block => {
  let newRules = ''

  for (let rule of Object.keys(block)) {
    if (!Array.isArray(block[rule])) {
      newRules += `${rule}: ${block[rule]}\n`
    } else {
      for (let value of block[rule]) {
        newRules += `${rule}: ${value}\n`
      }
    }
  }

  return newRules
}

const generateRobots = options => {
  let robotsContent = ''
  let rulesContent = ''

  for (let block of options.robots.rules)
    rulesContent += `${parseRules(block)}\n`

  robotsContent += rulesContent

  if (options.robots.sitemaps) {
    const parseSitemaps = () => {
      let newSitemaps = ''

      for (let sitemap of options.robots.sitemaps)
        newSitemaps += `Sitemap: ${sitemap}\n`

      return `${newSitemaps}`
    }

    robotsContent += parseSitemaps()
  }

  return robotsContent.trim()
}

export { generateRobots }
