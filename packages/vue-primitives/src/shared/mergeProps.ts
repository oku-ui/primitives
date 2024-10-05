import type { PrimitiveElAttrs, VNodeRef } from './typeUtils'
import { isArray, isOn } from '@vue/shared'
import { normalizeClass, normalizeStyle, type VNodeProps } from 'vue'
import { getElFromTemplateRef } from './getElFromTemplateRef.ts'

export type IAttrsData = Record<string, unknown> & Omit<VNodeProps, 'ref'> & {
  ref?: ((nodeRef: VNodeRef) => void)
}

export function mergePrimitiveAttrs(attrs: PrimitiveElAttrs, extraAttrsList: PrimitiveElAttrs[]): PrimitiveElAttrs {
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
      else if (propName === 'elRef') {
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

export function normalizeAttrs(attrs: PrimitiveElAttrs): IAttrsData {
  normalizeTemplateRefs(attrs)

  return attrs
}

function normalizeTemplateRefs(attrs: PrimitiveElAttrs) {
  const _elRef = attrs.elRef
  delete attrs.elRef

  let elRef: ((nodeRef: VNodeRef) => void) | undefined
  if (_elRef) {
    elRef = (templateRef: VNodeRef) => {
      const el = getElFromTemplateRef(templateRef)

      if (Array.isArray(_elRef)) {
        for (const setRef of _elRef) {
          setRef(el)
        }
      }
      else {
        _elRef(el)
      }
    }
  }

  const _templateRef = attrs.ref
  delete attrs.ref
  let templateRef: ((nodeRef: VNodeRef) => void) | undefined

  if (_templateRef) {
    if (Array.isArray(_templateRef)) {
      templateRef = (templateRef: any) => {
        for (const setRef of _templateRef) {
          setRef(templateRef)
        }
      }
    }
  }

  if (elRef && templateRef) {
    attrs.ref = (templateRef: any) => {
      elRef(templateRef)
      templateRef(elRef)
    }
  }
  else if (elRef) {
    attrs.ref = elRef
  }
  else if (templateRef) {
    attrs.ref = templateRef
  }
}
