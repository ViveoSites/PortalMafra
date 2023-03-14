import classNames from 'classnames'
import React, { ReactNode, useCallback, useEffect } from 'react'

type Properties = {
  className?: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<Properties> = ({
  className,
  isOpen,
  onClose,
  children,
}) => {
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleEscKey, false)

    return () => {
      document.removeEventListener('keyup', handleEscKey, false)
    }
  }, [handleEscKey])

  return (
    <div
      className={classNames(
        'fixed w-full h-full top-0 left-0 z-20 duration-300 overflow-y-auto',
        className,
        {
          'invisible opacity-0': !isOpen,
          'visible opacity-100': isOpen,
        }
      )}
    >
      <button
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40"
        onClick={onClose}
      />
      {children}
    </div>
  )
}

export default Modal
