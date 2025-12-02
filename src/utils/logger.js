function now() {
  return new Date().toISOString()
}

export function logCreate(item) {
  try {
    console.groupCollapsed(`[LOG][CREATE] ${now()}`)
    console.log('Created item:')
    console.log(item)
    console.groupEnd()
  } catch (e) {
    console.log('[LOG][CREATE]', now(), item)
  }
}

export function logEdit(before, after, index = null) {
  try {
    console.groupCollapsed(`[LOG][EDIT] ${now()}${index !== null ? ' (index: ' + index + ')' : ''}`)
    console.log('Before:')
    console.log(before)
    console.log('After:')
    console.log(after)
    console.groupEnd()
  } catch (e) {
    console.log('[LOG][EDIT]', now(), { before, after, index })
  }
}

export function logDelete(item, index = null) {
  try {
    console.groupCollapsed(`[LOG][DELETE] ${now()}${index !== null ? ' (index: ' + index + ')' : ''}`)
    console.log('Deleted item:')
    console.log(item)
    console.groupEnd()
  } catch (e) {
    console.log('[LOG][DELETE]', now(), { item, index })
  }
}

export default {
  logCreate,
  logEdit,
  logDelete
}
