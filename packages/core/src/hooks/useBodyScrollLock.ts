import { isClient, isIOS } from '@vueuse/core'

export function useBodyScrollLock(): () => void {
  if (!isClient)
    return () => {}

  const body = document.body
  if (body.hasAttribute('data-scroll-lock'))
    return () => {}

  const html = document.documentElement
  const bodyStyle = body.style

  const originalStyles = {
    overflow: bodyStyle.overflow,
    overflowX: bodyStyle.overflowX,
    overflowY: bodyStyle.overflowY,
    position: bodyStyle.position,
    top: bodyStyle.top,
    left: bodyStyle.left,
    right: bodyStyle.right,
    bottom: bodyStyle.bottom,
    scrollBehavior: html.style.scrollBehavior,
  }

  const initialOverflow = bodyStyle.overflow
  const scrollY = window.scrollY

  bodyStyle.top = `-${scrollY}px`
  bodyStyle.overflowX = 'hidden'
  html.style.scrollBehavior = 'auto'

  if (body.scrollHeight > window.innerHeight)
    bodyStyle.setProperty('overflow-y', 'scroll', 'important')

  bodyStyle.position = 'fixed'
  bodyStyle.left = '0'
  bodyStyle.right = '0'
  bodyStyle.bottom = '0'
  body.setAttribute('data-scroll-lock', 'true')

  let stopTouchMoveListener: (() => void) | undefined

  if (isIOS) {
    function onTouchmove(e: TouchEvent) {
      preventDefault(e)
    }

    document.addEventListener('touchmove', onTouchmove, {
      passive: false,
    })

    stopTouchMoveListener = () => {
      document.removeEventListener('touchmove', onTouchmove)
    }
  }

  const unlock = () => {
    bodyStyle.overflow = initialOverflow ?? ''
    body.removeAttribute('data-scroll-lock')

    bodyStyle.overflowY = originalStyles.overflowY
    bodyStyle.position = originalStyles.position
    bodyStyle.left = originalStyles.left
    bodyStyle.right = originalStyles.right
    bodyStyle.bottom = originalStyles.bottom

    bodyStyle.top = originalStyles.top
    window.scrollTo(0, scrollY)
    html.style.scrollBehavior = originalStyles.scrollBehavior

    stopTouchMoveListener?.()
  }

  return unlock
}

function preventDefault(event: TouchEvent): boolean {
  const _target = event.target as Element

  // Do not prevent if element or parentNodes have overflow: scroll set.
  if (checkOverflowScroll(_target))
    return false

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (event.touches.length > 1)
    return true

  if (event.preventDefault)
    event.preventDefault()

  return false
}

function checkOverflowScroll(el: Element): boolean {
  const style = window.getComputedStyle(el)
  if (
    style.overflowX === 'scroll'
    || style.overflowY === 'scroll'
    || (style.overflowX === 'auto' && el.clientWidth < el.scrollWidth)
    || (style.overflowY === 'auto' && el.clientHeight < el.scrollHeight)
  ) {
    return true
  }
  else {
    const parent = el.parentNode as Element

    if (!parent || parent.tagName === 'BODY')
      return false

    return checkOverflowScroll(parent)
  }
}
