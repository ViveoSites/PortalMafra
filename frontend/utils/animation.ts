import type { Transition } from 'framer-motion'

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 140,
  damping: 40,
}

export const getTransition = (extraConfigs: Transition = {}): Transition => ({
  ...DEFAULT_TRANSITION,
  ...extraConfigs,
})
