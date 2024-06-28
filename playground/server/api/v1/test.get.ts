import withNeoDriver from '../../../../src/runtime/server/composables/NeoDriver'

export default defineEventHandler(async () => {
  // clean up the database
  await withNeoDriver().executeQuery('MATCH (n) DETACH DELETE n')

  const pre = await withNeoDriver().executeQuery('MATCH (n) RETURN n LIMIT 5')

  console.log('Before adding Data: ', pre.records)

  // create some nodes

  await withNeoDriver().executeQuery('CREATE (n:Person {name: "Alice"})')
  await withNeoDriver().executeQuery('CREATE (n:Person {name: "Bob"})')
  await withNeoDriver().executeQuery('CREATE (n:Person {name: "Charlie"})')

  const post = await withNeoDriver().executeQuery('MATCH (n) RETURN n LIMIT 5')

  console.log('After adding Data: ', post.records)
})
