import PropTypes from "prop-types"

const Select = ({ selectedCategory, setSelectedCategory }) => {
  return (
      <select
          className="admin__select"
          onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}
      >
          <option value="projects">Projects</option>
          <option value="courses">Courses</option>
          <option value="about">About</option>
          <option value="info">Info</option>
          <option value="social">Social</option>
      </select>
  )
}

Select.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
}

export default Select
