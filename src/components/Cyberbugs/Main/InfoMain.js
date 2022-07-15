import React, { Fragment } from 'react'
// Chuyễn đổi từ description họ nhập
import ReactHtmlParser from 'react-html-parser';

export default function InfoMain(props) {
    // console.log("~ props", props.members)

    const {projectDetail}=props
   


    const renderAvatar = () => {
        return projectDetail?.members.map((user,index) => {
            return <div className="avatar" key={index}>
                <img src={user.avatar} alt={user.avatar}/>
            </div>
        })
    }

    return (
        <Fragment>
            
            <h3>{projectDetail.projectName}</h3>
            <section>
                {ReactHtmlParser(projectDetail.description)}
            </section>


                <div className="info" style={{ display: 'flex' }}>
                    <div className="search-block">
                        <input className="search" />
                        <i className="fa fa-search" />
                    </div>
                    <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                    </div>
                    <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                    <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
                </div>
            
        </Fragment>
    )
}
