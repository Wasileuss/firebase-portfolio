import PropTypes from "prop-types"

const buttonVariants = {
    primary: "primary",
    secondary: "secondary",
    delete: "delete"

}

const Button = ({ children, variant, className, type, onClick }) => {
    return (
      <button
          className={`${className} ${buttonVariants[variant]}`}
          type={type}
          onClick={onClick}
      >
          {children}
      </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(Object.values(buttonVariants)),
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default Button