import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
// Import để lấy dữ liệu từ store state về
import { connect, useSelector, useDispatch } from 'react-redux'


function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;


    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault();
        alert('Submit edit')
    }

    // Y như componentDidMount ứng vs react life cycle
    useEffect(() => {

        // Gọi api load project category
        dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })


        // Load sự kiện submit lên drawer nút submit
        dispatch({
            type: 'SET_SUBMIT_EDIT_PROJECT',
            submitFunction: handleSubmit
        })
    }, [])


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    return (
        <form className="container-fulid" onSubmit={submitForm}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project ID</p>
                        <input value={values.id} disabled type="text" className="form-control" name="id" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Name</p>
                        <input value={values.projectName} type="text" className="form-control" name="projectName" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select name="categoryId" value={values.categoryId}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.projectCategoryName
                                }</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor name="description123"
                            // initialValue={values.description}
                            value={values.description}
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

                    </div>
                </div>

            </div>
        </form>
    )
}

const EditProjectForm = withFormik({
    // Muốn mỗi lần render lại từ redux (ko muon chỉ chạy 1 lần ) => thêm thuộc Tính
    enableReinitialize: true,

    // Biến props từ component của mình nó sẽ lấy ra thành values
    mapPropsToValues: (props) => {
        const { projectEdit } = props

        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({
        // Validate form field

    }),
    // Bóc tách email, password từ values
    handleSubmit: (values, { props, setSubmitting }) => {
        // Khi người dùng bấm submit -> mình sẽ đưa dữ liệu về backend thong qua api
        // Gọi saga 
        // console.log(values)
            props.dispatch({
                type: 'UPDATE_PROJECT_SAGA',
                projectUpdate: values
            })


    },

    displayName: 'EditProjectForm',

})(FormEditProject);

// Lấy state từ redux => tạo thành biến props
const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}

export default connect(mapStateToProps)(EditProjectForm)
