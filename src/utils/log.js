import { log as logzy, u, n } from 'logzy'

const log = {
  ...logzy,
  info: v => console.log(u('bold', u('cyan', `> ${v}`))),
  success: v => console.log(u('lime', `✔ ${v}`)),
  error: v => console.log(u('bold', u('rose', `✖ ${v}`))),
  details: v => console.log(`  ${v}`),
  details2: v => console.log(u('darken', `  ─ ${v}`))
}

export { log, u, n }
