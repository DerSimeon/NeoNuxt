import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'
import type { RuntimeConfig } from '@nuxt/schema'
import { useRuntimeConfig } from '#imports'

let neoDriver: Driver

export const withNeoDriver = () => {
  const n4jConfig = useRuntimeConfig().n4j as RuntimeConfig['n4j']

  if (neoDriver) return neoDriver

  try {
    neoDriver = neo4j.driver(
      n4jConfig.connectionString,
      neo4j.auth.basic(
        n4jConfig.auth.username,
        n4jConfig.auth.password),
    )

    console.log('Neo4j driver connected')
  }
  catch (error) {
    console.error('Failed to connect to Neo4j', error)
  }

  return neoDriver
}
