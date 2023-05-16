import type { ComponentPublicInstance, VNodeRef } from 'vue'
import { isRef, ref, watch } from 'vue'
import { unrefElement } from './unrefElement'

function useUnrefToRefa(...values: VNodeRef[]) {
  return function (
    ref: Element | ComponentPublicInstance | null,
    refs: Record<string, any>,
  ) {
    for (const r of values) {
      if (typeof r === 'string')
        refs[r] = ref

      else if (typeof r === 'function')
        r(ref, refs)

      else if (isRef(r))
        r.value = ref
    }
  }
}

function useUnrefToRef<T>() {
  const mergedRef = ref<T>()
  const nodeRef = ref<VNodeRef>()

  watch([nodeRef, mergedRef], () => {
    if (nodeRef.value)
      mergedRef.value = unrefElement(nodeRef.value)

    console.log(mergedRef.value)
  }, { deep: true })

  // onMounted(() => {
  //   if (refone && !mergedRef.value) {
  //     const value = unrefElement(refone)
  //     if (value)
  //       mergedRef.value = value as any
  //   }
  // })

  // watch(refone, () => {
  //   if (refone) {
  //     const value = unrefElement(refone)
  //     if (value)
  //       mergedRef.value = value as any
  //   }
  // })

  return {
    mergedRef,
    nodeRef,
  }
}

export { useUnrefToRef }
