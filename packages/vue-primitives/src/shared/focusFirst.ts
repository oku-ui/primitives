export function focusFirst(candidates: HTMLElement[], preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement

  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return true

    candidate.focus({ preventScroll })

    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return true
  }

  return false
}
