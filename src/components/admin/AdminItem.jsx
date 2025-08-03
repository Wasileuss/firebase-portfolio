import PropTypes from 'prop-types'
import { capitalize } from '../../utils/capitalize.js'
import Button from '../ui/Button.jsx'

function AdminItem({
  value,
  expandedItem,
  toggleAccordion,
  handleDelete,
  handleEdit,
}) {
  return (
    <li className="admin__item" key={value.id}>
      <h3
        className="admin__title input-border"
        onClick={() => toggleAccordion(value.id)}
      >
        {capitalize(value.category)}: No.{value.num}
      </h3>
      <div
        className={`accordion-content ${expandedItem === value.id ? 'expanded' : ''}`}
      >
        <p className="input-border">Title: {value.title}</p>
        <p className="input-border input-border--break">Link: {value.link}</p>
        <p className="input-border">Subtitle: {value.subTitle}</p>
        <p className="input-border input-border--break">Sublink: {value.subLink}</p>
        <p className="input-border">Description: {value.desc}</p>
        <p className="input-border">Content: {value.content}</p>
        <p className="input-border">Period: {value.period}</p>
        <p className="input-border">Info 1: {value.info1}</p>
        <p className="input-border">Info 2: {value.info2}</p>
        <p className="input-border">Info 3: {value.info3}</p>
        <div className="admin__images">
          {value.images?.map(
            (img, index) =>
              img && (
                <img
                  className="admin__image"
                  rel="preload"
                  loading="eager"
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  height="50px"
                />
              ),
          )}
        </div>
        <div className="admin__buttons">
          <Button
            className="input-border"
            type="button"
            variant="secondary"
            onClick={() => handleEdit(value.id)}
          >
            Edit
          </Button>
          <Button
            className="input-border"
            type="button"
            variant="delete"
            onClick={() => handleDelete(value.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </li>
  )
}

AdminItem.propTypes = {
  value: PropTypes.object.isRequired,
  expandedItem: PropTypes.string,
  toggleAccordion: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default AdminItem
