import type { PrimitiveElAttrs, VNodeRef } from './typeUtils'
import { isArray, isOn, NOOP } from '@vue/shared'
import { isClient } from '@vueuse/core'
import { normalizeClass, normalizeStyle, type VNodeProps } from 'vue'
import { getElFromTemplateRef } from './getElFromTemplateRef.ts'

export type IAttrsData = Record<string, unknown> & VNodeProps

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
            ret[propName] = existing ? [].concat(incoming as any, existing as any) : incoming
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
  const _elRef = attrs.elRef
  delete attrs.elRef

  let elRef: ((vNodeRef: VNodeRef) => void) | undefined
  if (_elRef) {
    elRef = (templateRef: VNodeRef) => {
      // Skip DOM operations on server side
      if (!isClient)
        return

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

  let templateRef = _templateRef as ((vNodeRef: VNodeRef) => void) | undefined

  if (_templateRef) {
    if (Array.isArray(_templateRef)) {
      templateRef = (templateRef: any) => {
        // Handle array refs safely in SSR
        if (!isClient && typeof templateRef === 'function')
          return templateRef

        for (const setRef of _templateRef) {
          setRef(templateRef)
        }
      }
    }
  }

  // Combine refs only on client side
  if (isClient) {
    if (elRef && templateRef) {
      attrs.ref = (vNodeRef: VNodeRef) => {
        elRef(vNodeRef)
        templateRef(vNodeRef)
      }
    }
    else if (elRef) {
      attrs.ref = elRef
    }
    else if (templateRef) {
      attrs.ref = templateRef
    }
  }
  else {
    // In SSR, only pass through template refs
    if (templateRef)
      attrs.ref = templateRef
  }

  const disabled = attrs.disabled === true || attrs['data-disabled'] != null || attrs['aria-disabled'] === true

  if (disabled) {
    for (const propName in attrs) {
      if (isOn(propName) && attrs[propName] !== undefined) {
        attrs[propName] = NOOP
      }
    }
  }

  return attrs
}
