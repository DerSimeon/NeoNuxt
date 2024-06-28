import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import defu from 'defu'
import type { RuntimeConfig } from '@nuxt/schema'

export interface ModuleOptions {
  connectionString: string
  auth: {
    preferredType: string
    username: string
    password: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'neonuxt',
    configKey: 'neonuxt',
  },
  defaults: {
    connectionString: process.env.N4J_CONNECTION_STRING as string || '',
    auth: {
      preferredType: process.env.N4J_TYPE as string || 'basic',
      username: process.env.N4J_USER as string || '',
      password: process.env.N4J_PASSWORD as string || '',
    },
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    const config = _nuxt.options.runtimeConfig

    config.n4j = defu<RuntimeConfig['n4j'], Omit<ModuleOptions, ''>[]>(_nuxt.options.runtimeConfig.n4j, {
      connectionString: _options.connectionString,
      auth: {
        preferredType: _options.auth.preferredType,
        username: _options.auth.username,
        password: _options.auth.password,
      },
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
