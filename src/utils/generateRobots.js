const parseRules = block => {
  let newRules = ''

  for (let rule of Object.keys(block)) newRules += `${rule}: ${block[rule]}\n`

  return newRules
}

const generateRobots = options => {
  let robotsContent = ''
  let rulesContent = ''

  for (let block of options.robots.rules)
    rulesContent += `${parseRules(block)}\n`

  const parseSitemaps = () => {
    let newSitemaps = ''

    for (let sitemap of options.robots.sitemaps)
      newSitemaps += `Sitemap: ${sitemap}\n`

    return `${newSitemaps.trimEnd()}`
  }

  robotsContent = rulesContent + parseSitemaps()

  return robotsContent
}

export { generateRobots }
