import { log as logzy } from 'logzy'

export const log = logzy

log.info = v => log(log.$('cyan bold', `\n> ${v}`))
log.error = v => log(log.$('rose bold', `\n✖ sveltekit-statiko > ${v}`))
