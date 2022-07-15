import React, { Fragment, useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
// Import để lấy dữ liệu từ store state về
import { connect, useSelector, useDispatch } from 'react-redux'


function CreateProject(props) {

  const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)
  const dispatch = useDispatch()

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })

  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };
  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  }
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
  return (
    <Fragment>
      <div className="container m-5" onSubmit={handleSubmit} onChange={handleChange}>
        <h3>Create Project</h3>
        <form className="container">
          <div className="form-group">
            <p>Name</p>
            <input type="text" className="form-control" name="projectName" />
          </div>
          <div className="form-group">
            <p>Description</p>
            <Editor name="description"
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue=""
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }} onEditorChange={handleEditorChange}
            />
            {/* <button onClick={log}>Log editor content</button> */}
          </div>
          <div className="form-group">
            <select className="form-control" name="categoryId" onChange={handleChange}>
              {arrProjectCategory.map((item, index) => {
                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
              })}
            </select>
          </div>

          <button className="btn btn-outline-primary mb-5" type="submit">Create project</button>
          <p>.</p>

        </form>
      </div>

    </Fragment>
  )
}
const createProjectForm = withFormik({
  // Muốn mỗi lần render lại từ redux (ko muon chỉ chạy 1 lần ) => thêm thuộc Tính
  enableReinitialize: true,

  // Biến props từ component của mình nó sẽ lấy ra thành values
  mapPropsToValues: (props) => ({
    projectName: '',
    description: '',
    // nếu có mới lấy vì ban đầu redux mảng bằng rỗng chưa xử lý api
    categoryId: props.arrProjectCategory[0]?.id,

  }),
  validationSchema: Yup.object().shape({
    // Validate form field

  }),
  // Bóc tách email, password từ values
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: 'CREATE_PROJECT_SAGA',
      newProject: values
    })

  },

  displayName: 'CreateProjectFormik',

})(CreateProject);

// Lấy state từ redux => tạo thành biến props
const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
  }
}

export default connect(mapStateToProps)(createProjectForm)

