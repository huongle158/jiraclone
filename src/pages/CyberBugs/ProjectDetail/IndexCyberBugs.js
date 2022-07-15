import React, { Fragment,useEffect } from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'
// Sử dụng 2 hooks kết nối redux 
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'



export default function IndexCyberBugs(props) {
   
        // console.log("~ projectId", projectId)
    
        // Lấy dữ liệu từ redux
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    console.log("~ projectDetail", projectDetail)

    
    const dispatch = useDispatch()

    const { projectId } = useParams()
    

    // Dể [] tức useEffect như componentDidMount chỉ chạy 1 lần thôi, ko chạy lại khi state thay đổi ...
    useEffect (() => {
        // Khi users links qua trang này bằng thẻ NavLink hoặc users tự gõ url thì ta sẽ lấy tham số url(id)-> gửi về saga

        // Đối với rfc thì để trong đây dảm bảo cập nhật lại hơn dê ngoài
        dispatch({
            type: 'GET_PROJECT_DETAIL', 
            // Để 1 tham số thì ES6 tự render ra thuộc tính trùng tên (tương tự projectId: projectId)
            projectId
        })
        
    }, [])

    

    return (
        <Fragment>
            <div className="main">
                <HeaderMain projectDetail={projectDetail} />
                <InfoMain projectDetail={projectDetail} />
                <ContentMain projectDetail={projectDetail} />
            </div>
        </Fragment>
    )
}
