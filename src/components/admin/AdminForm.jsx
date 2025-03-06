import PropTypes from 'prop-types'
import Input from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'

function AdminForm({
  title,
  setTitle,
  num,
  setNum,
  link,
  setLink,
  desc,
  setDesc,
  content,
  setContent,
  period,
  setPeriod,
  info1,
  setInfo1,
  info2,
  setInfo2,
  info3,
  setInfo3,
  images,
  setImages,
  fileInputRefs,
  handleUpload,
  handleClick,
  editItem,
  isLoading,
}) {
  return (
    <form className="admin__form" id="admin-form" name="admin-form">
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Title*"
        required
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setNum(e.target.value)}
        value={num}
        placeholder="Item Number"
        required
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setLink(e.target.value)}
        value={link}
        placeholder="Link"
        required
      />
      <textarea
        className="input-border"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        placeholder="Description"
        required
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Content"
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setPeriod(e.target.value)}
        value={period}
        placeholder="Period"
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setInfo1(e.target.value)}
        value={info1}
        placeholder="Info 1"
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setInfo2(e.target.value)}
        value={info2}
        placeholder="Info 2"
      />
      <Input
        className="input-border"
        type="text"
        onChange={(e) => setInfo3(e.target.value)}
        value={info3}
        placeholder="Info 3"
      />
      {images.map((img, index) => (
        <div className="admin__image-input" key={index}>
          <Input
            className="input-border"
            type="file"
            onChange={(e) => handleUpload(e, index)}
            ref={fileInputRefs[index]}
          />
          <Input
            className="input-border"
            type="text"
            value={img}
            onChange={(e) =>
              setImages((prev) => {
                const newImages = [...prev]
                newImages[index] = e.target.value
                return newImages
              })
            }
            placeholder={`Image ${index + 1} URL`}
          />
        </div>
      ))}
      <Button
        className="admin__button"
        variant={isLoading ? 'disabled' : editItem ? 'secondary' : 'primary'}
        type="button"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading
          ? editItem
            ? 'Updating...'
            : 'Adding...'
          : editItem
            ? 'Update'
            : 'Add'}
      </Button>
    </form>
  )
}

AdminForm.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  num: PropTypes.string,
  setNum: PropTypes.func,
  link: PropTypes.string,
  setLink: PropTypes.func,
  desc: PropTypes.string,
  setDesc: PropTypes.func,
  content: PropTypes.string,
  setContent: PropTypes.func,
  period: PropTypes.string,
  setPeriod: PropTypes.func,
  info1: PropTypes.string,
  setInfo1: PropTypes.func,
  info2: PropTypes.string,
  setInfo2: PropTypes.func,
  info3: PropTypes.string,
  setInfo3: PropTypes.func,
  images: PropTypes.array,
  setImages: PropTypes.func,
  fileInputRefs: PropTypes.array,
  handleUpload: PropTypes.func,
  handleClick: PropTypes.func,
  editItem: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default AdminForm
