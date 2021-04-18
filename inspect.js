import {inspect as utilInspect} from 'util'

export function inspect(value) {
  return utilInspect(value, {colors: false})
}
