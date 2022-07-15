import React, { Fragment, useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Radio, Select, Slider } from "antd";
import { GET_ALL_PROJECT_SAGA } from "../../../util/constants/Cyberbugs/ProjectConstatnts";
import { GET_ALL_STATUS_SAGA } from "../../../util/constants/Cyberbugs/StatusConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../util/constants/Cyberbugs/TaskTypeConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../../util/constants/Cyberbugs/PriorityConstant";
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from "../../../util/constants/Cyberbugs/UserConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
// Import để lấy dữ liệu từ store state về
import { connect, useSelector, useDispatch } from "react-redux";

const { Option } = Select;
const children = [];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }
// const handleChange = (value) => {
//   console.log(`Selected: ${value}`);
// };

function FormCreateTask(props) {
  const dispatch = useDispatch();

  // Do kết nối với withFormik => component có các props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  // Lấy dữ lieu từ redux
  const { arrProject } = useSelector((state) => state.ProjectCyberBugsReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  // Nghiệp vụ assign task
  const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);
  console.log("~ arrUser", arrUser)
  // Hàm biến đổi Option cho thẻ Select
  const userOptions = arrUser.map((item, index) => {
    return {
      value: item.userId,
      label: item.name,
    };
  });

  // hook
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    // keyWord rỗng -> Lấy all users
    dispatch({
      type: "GET_USER_API",
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
      keyWord: "",
    });
    dispatch({
      type: "SET_SUBMIT_CREATE_TASK",
      submitFunction:handleSubmit
    });
  }, []);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
    }
  };

  const [size, setSize] = useState("middle");

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId" defaultValue="0"
          className="form-control"
          onChange={(e) => {
            // Ko thể xài handleChange của formik được nữa vì có nhiều việc cần làm hơn => thay bằng setFiledValue
            // Dispatch giá trị làm thay dổi arrUser
            let { value } = e.target;
            console.log("~ valueeeeeeeeeeeeeeeeee", value)
            
            dispatch({
              type:GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });

            // Cập nhật giá trị cho projectId
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProject?.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      {/* TaskName */}
      <div className="form-group">
        <p>Task name</p>
        <input
          type="text"
          name="taskName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      {/* Status id */}
      <div className="form-group">
        <p>Status</p>
        <select
          type="text"
          name="statusId"
          className="form-control"
          onChange={handleChange}
        >
          {arrStatus.map((statusItem, index) => {
            // 32:15
            return (
              <option key={index} value={statusItem.statusId}>
                {statusItem.statusName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              onChange={handleChange}
              className="form-control"
            >
              {arrPriority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-6">
            <p>Task type</p>
            <select
              name="typeId"
              onChange={handleChange}
              className="form-control"
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assign</p>
            <Select
              mode="multiple"
              options={userOptions}
              optionFilterProp="label"
              size={size}
              placeholder="Please select"
              // defaultValue={[]}
              onChange={(values) => {
                // set lại giá trị cho listUserAssign
                setFieldValue("listUserAsign", values);
              }}
              onSelect={(value) => {
                // Mỗi khi chọn nó lấy values dc chọn
                // console.log("~ value", value);
              }}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
            <div className="row mt-2">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  // value={
                  //   Number(timeTracking.timeTrackingRemaining) +
                  //   Number(timeTracking.timeTrackingSpent)
                  // }
                  onChange={handleChange}
                  name="originalEstimate"
                  type="number"
                  min="0"
                  defaultValue={0}
                  className="form-control"
                  height="30"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time Tracking</p>
            <Slider
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingRemaining) +
                Number(timeTracking.timeTrackingSpent)
              }
              tooltipisible
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h remaining
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <p>Time spend</p>
                <input
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                  className="form-control"
                  defaultValue="0"
                  min="0"
                  type="number"
                />
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                  className="form-control"
                  defaultValue="0"
                  min="0"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(content, editor) => {
            setFieldValue("description", content);
          }}
        />
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

const formCreateTask = withFormik({
  // Muốn mỗi lần render lại từ redux (ko muon chỉ chạy 1 lần ) => thêm thuộc Tính
  enableReinitialize: true,

  // Biến props từ component của mình nó sẽ lấy ra thành values
  mapPropsToValues: (props) => {
    // Bóc tách phần tử cho gọn
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;
    // Vì kết nối với redux nên có props này 
    // if(arrProject.length > 0){
    //   props.dispatch({
    //   type: GET_USER_BY_PROJECT_ID_SAGA,
    //   // Truyền lên projectId đâu tiên
    //   idProject: arrProject[0]?.id
    // });
    // }
    
    return {
      listUserAsiDgn: [],
      taskName: "string",
      description: "string",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      // nếu ko có ? nó sẽ lỗi ngay vì chưa load xong
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
  }),
  // Bóc tách email, password từ values
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_TASK_SAGA",
      taskObject: values,
    });
    console.log("~ taskObject", values);
  },

  displayName: "createTaskForm",
})(FormCreateTask);

// Lấy state từ redux => tạo thành biến props
const mapStateToProps = (state) => {
  // const { arrProject } = useSelector((state) => state.ProjectCyberBugsReducer);
  // const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  // const { arrPriority } = useSelector((state) => state.PriorityReducer);
  // const { arrStatus } = useSelector((state) => state.StatusReducer);
  return {
    // Lấy giá trị về để gán thuộc tính cho những thằng đầu tiên của values
    arrProject: state.ProjectCyberBugsReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

// Muốn kết nối redux nhớ dùng connect
export default connect(mapStateToProps)(formCreateTask);
