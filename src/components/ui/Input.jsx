import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Input = forwardRef(({ className, ...props }, ref) => {
  return <input className={className} ref={ref} {...props} />
})

Input.displayName = 'Input'

Input.propTypes = {
  className: PropTypes.string,
}

export default Input
