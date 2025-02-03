import PropTypes from "prop-types"

function Loading({ text = "Loading..." }) {
  return (
    <div className="loading">
      <p>{text}</p>
    </div>
  )
}

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading
