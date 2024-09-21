import type { ElAttrs } from './typeUtils'
import { isArray, isOn, NOOP } from '@vue/shared'
import { normalizeClass, normalizeStyle, type VNodeProps } from 'vue'

export type IAttrsData = Record<string, unknown>

export function mergeHooksAttrs(attrs: ElAttrs, extraAttrs: ElAttrs[]): IAttrsData {
  const ret: IAttrsData = attrs

  for (let i = 0; i < extraAttrs.length; i++) {
    const extraProps = extraAttrs[i]!

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
        const incoming = extraProps[propName]

        if (incoming) {
          const existing = ret[propName]

          if (existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[propName] = existing ? [].concat(incoming as any, existing as any) : incoming
          }
        }
      }
      else if (propName !== '') {
        ret[propName] = extraProps[propName]
      }
    }
  }

  return ret
}

export function mergeAttrs(attrs: ElAttrs, extraAttrs: (IAttrsData & VNodeProps)): IAttrsData {
  const ret: IAttrsData = attrs

  const isInnerDisabled = attrs.disabled === true || (attrs['data-disabled'] != null && attrs['data-disabled'] !== false)

  const hasDisabledAttr = 'disabled' in attrs || 'disabled' in extraAttrs
  const isOuterDisabled = extraAttrs.disabled === true || (extraAttrs['data-disabled'] != null && extraAttrs['data-disabled'] !== false)

  const isDisabled = isInnerDisabled || isOuterDisabled

  for (const propName in extraAttrs) {
    if (propName === 'class') {
      if (ret.class !== extraAttrs.class) {
        ret.class = normalizeClass([ret.class, extraAttrs.class])
      }
    }
    else if (propName === 'style') {
      ret.style = normalizeStyle([ret.style, extraAttrs.style])
    }
    else if (isOn(propName)) {
      const incoming = extraAttrs[propName]

      if (incoming) {
        if (isDisabled) {
          ret[propName] = NOOP
        }
        else {
          const existing = ret[propName]

          if (existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[propName] = existing ? [].concat(incoming as any, existing as any) : incoming
          }
        }
      }
    }
    else if (propName !== '') {
      ret[propName] = extraAttrs[propName]
    }
  }

  if (isInnerDisabled || isOuterDisabled) {
    if (hasDisabledAttr) {
      ret.disabled = true
    }
    ret['data-disabled'] = true
  }

  return ret
}
