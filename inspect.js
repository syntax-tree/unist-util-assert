import {inspect as utilInspect} from 'util'

/**
 * @param {unknown} value
 * @returns {string}
 */
export function inspect(value) {
  return utilInspect(value, {colors: false})
}
