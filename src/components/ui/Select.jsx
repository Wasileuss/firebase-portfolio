import PropTypes from "prop-types"
import { capitalize } from "../../utils/capitalize.js"

const Select = ({ selectedCategory, setSelectedCategory, className, id, name, options }) => {
  return (
      <select
          name={name}
          id={id}
          className={className}
          onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {capitalize(option.value)}
          </option>
        ))}
      </select>
  )
}

Select.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
}

export default Select
