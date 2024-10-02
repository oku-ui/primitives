import type { PrimitiveElAttrs, VNodeRef } from './typeUtils'
import { isArray, isOn, NOOP } from '@vue/shared'
import { normalizeClass, normalizeStyle, type VNodeProps } from 'vue'
import { getElFromTemplateRef } from './getElFromTemplateRef.ts'

export type IAttrsData = Record<string, unknown> & Omit<VNodeProps, 'ref'> & {
  ref?: ((nodeRef: VNodeRef) => void)
}

export function mergeHooksAttrs(attrs: PrimitiveElAttrs, extraAttrsList: PrimitiveElAttrs[]): PrimitiveElAttrs {
  const ret = attrs

  for (let i = 0; i < extraAttrsList.length; i++) {
    const extraAttrs = extraAttrsList[i]!

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
          const existing = ret[propName]

          if (existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[propName] = existing ? [].concat(existing as any, incoming as any) : incoming
          }
        }
      }
      else if (propName === 'ref') {
        const incoming = extraAttrs[propName]
        if (incoming) {
          const existing = ret[propName]
          ret[propName] = existing ? [].concat(existing as any, incoming as any) : incoming
        }
      }
      else if (propName !== '') {
        ret[propName] = extraAttrs[propName]
      }
    }
  }

  return ret
}

export function normalizeAttrs(attrs: PrimitiveElAttrs, ...extraAttrsList: (IAttrsData)[]): IAttrsData {
  const ret = attrs

  const isInnerDisabled = attrs.disabled === true || (attrs['data-disabled'] != null && attrs['data-disabled'] !== false)

  const primitiveRef = ret.ref
  if (primitiveRef) {
    ret.ref = (templateRef: VNodeRef) => {
      const el = getElFromTemplateRef(templateRef)

      if (Array.isArray(primitiveRef)) {
        for (const setRef of primitiveRef) {
          setRef(el)
        }
      }
      else {
        primitiveRef(el)
      }
    }
  }

  if (extraAttrsList.length === 0) {
    return ret as IAttrsData
  }

  let hasDisabledAttr = 'disabled' in attrs
  let isOuterDisabled = false

  const isDisabled = isInnerDisabled || isOuterDisabled

  for (let i = 0; i < extraAttrsList.length; i++) {
    const extraAttrs = extraAttrsList[i]!

    hasDisabledAttr = hasDisabledAttr || 'disabled' in extraAttrs
    isOuterDisabled = isOuterDisabled || extraAttrs.disabled === true || (extraAttrs['data-disabled'] != null && extraAttrs['data-disabled'] !== false)

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
      else if (propName === 'ref') {
        const incoming = extraAttrs[propName]
        if (incoming) {
          const existing = ret[propName]
          ret[propName] = existing ? [].concat(existing as any, incoming as any) : incoming as any
        }
      }
      else if (propName !== '') {
        ret[propName] = extraAttrs[propName]
      }
    }
  }

  if (isInnerDisabled && !isOuterDisabled) {
    if (hasDisabledAttr) {
      ret.disabled = true
    }
    ret['data-disabled'] = true
  }

  if (!isInnerDisabled && isOuterDisabled) {
    for (const propName in ret) {
      if (isOn(propName)) {
        ret[propName] = NOOP
      }
    }
  }

  const _primitiveRef = ret.ref
  if (Array.isArray(_primitiveRef)) {
    ret.ref = (templateRef: any) => {
      for (const setRef of _primitiveRef) {
        setRef(templateRef)
      }
    }
  }

  return ret as IAttrsData
}
