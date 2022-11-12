import { log as logzy } from 'logzy'

const log = logzy

log.info = v => log(log.$('cyan bold', `\n> ${v}`))
log.error = v => log(log.$('rose bold', `\n✖ sveltekit-statiko > ${v}`))

export { log }
