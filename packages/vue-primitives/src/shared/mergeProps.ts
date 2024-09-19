import { isArray, isOn } from '@vue/shared'
import { normalizeClass, normalizeStyle, type VNodeProps } from 'vue'

export type Data = Record<string, any>

export function mergeProps(innerProps: (Data & VNodeProps), attrs: (Data & VNodeProps)[]): Data {
  const ret: Data = innerProps
  for (let i = 0; i < attrs.length; i++) {
    const extraProps = attrs[i]
    for (const propName in extraProps) {
      if (propName === 'class') {
        if (ret.class !== extraProps.class) {
          ret.class = normalizeClass([ret.class, extraProps.class])
        }
      }
      else if (propName === 'style') {
        ret.style = normalizeStyle([ret.style, extraProps.style])
      }
      else if (isOn(propName)) {
        const existing = ret[propName]
        const incoming = extraProps[propName]
        if (
          incoming
          && existing !== incoming
          && !(isArray(existing) && existing.includes(incoming))
        ) {
          ret[propName] = existing
            ? [].concat(incoming as any, existing as any)
            : incoming
        }
      }
      else if (propName !== '') {
        ret[propName] = extraProps[propName]
      }
    }
  }
  return ret
}

export function mergeAttrs(innerProps: (Data & VNodeProps), attrs: (Data & VNodeProps)): Data {
  const ret: Data = innerProps

  for (const propName in attrs) {
    if (propName === 'class') {
      if (ret.class !== attrs.class) {
        ret.class = normalizeClass([ret.class, attrs.class])
      }
    }
    else if (propName === 'style') {
      ret.style = normalizeStyle([ret.style, attrs.style])
    }
    else if (isOn(propName)) {
      const existing = ret[propName]
      const incoming = attrs[propName]
      if (
        incoming
        && existing !== incoming
        && !(isArray(existing) && existing.includes(incoming))
      ) {
        ret[propName] = existing
          ? [].concat(incoming as any, existing as any)
          : incoming
      }
    }
    else if (propName !== '') {
      ret[propName] = attrs[propName]
    }
  }

  return ret
}
