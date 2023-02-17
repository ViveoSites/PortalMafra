/**
 * Observe if any element in the dom has changed
 * @param object element that will be observer
 * @param callback function that fires when something changes
 * @returns function to deconstruct the observation
 * Example usage:
 * import { observeDOM } from '~/utils/dom'
 * useEffect(() => {
 *  const element = document.getElementById("my-element");
 *  return observeDOM(element, () => {
 *    // Element Change
 *    doSomething()
 *  })
 * }, [onScroll])
 */

export const observeDOM = (object: HTMLElement, callback: () => void) => {
  if (!object || object.nodeType !== 1) return

  const MutationObserver = window.MutationObserver
  if (MutationObserver) {
    // define a new observer
    const mutationObserver = new MutationObserver(callback)

    // have the observer observe foo for changes in children
    mutationObserver.observe(object, {
      childList: true,
      subtree: true,
    })

    return () => {
      mutationObserver.disconnect()
    }
  } else if (window.addEventListener) {
    object.addEventListener('DOMNodeInserted', callback, false)
    object.addEventListener('DOMNodeRemoved', callback, false)
    return () => {
      object.removeEventListener('DOMNodeInserted', callback, false)
      object.removeEventListener('DOMNodeRemoved', callback, false)
    }
  }
}
