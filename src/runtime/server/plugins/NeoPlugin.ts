import type { NitroApp } from 'nitropack'
import { withNeoDriver } from '../utils/NeoDriver'

function defineNitroPlugin(fn: (nitroApp: NitroApp) => void) {
  return fn
}

export default defineNitroPlugin(async () => {
  withNeoDriver()
})
