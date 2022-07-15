import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

export default function MenuCyberbugs() {
    return (
        <Fragment>
            {/* Menu */}
            <div className="menu">
                <div className="account">
                    <div className="avatar">
                        <img src={require('../../assets/img/download.jfif')}  />
                    </div>
                    <div className="account-info">
                        <p>Huongle158</p>
                        <p>Đăng nhập: <strong className="font-weight-bold">sally@gmail.com</strong>  Pass: <strong className="font-weight-bold">123456</strong></p>
                    </div>
                   
                </div>
                <div className="control">
                    <div>
                        <i className="fa fa-credit-card mr-1" />
                        <NavLink className={(navData) => navData.isActive ? "active font-weight-bold" : "text-dark"}  to="/login"> LOGIN NOW</NavLink>
                    </div>
                    
                    <div>
                        <i className="fa fa-cog mr-1" />
                        <NavLink className={(navData) => navData.isActive ? "active font-weight-bold" : "text-dark"}  to="/createproject">Create project</NavLink>
                    </div>

                    <div>
                        <i className="fa fa-credit-card mr-1" />
                        <NavLink className={(navData) => navData.isActive ? "active font-weight-bold" : "text-dark"} to="/projectmanagement">Project management</NavLink>
                    </div>
                </div>
                {/* <div className="feature">
                    <div>
                        <i className="fa fa-truck mr-1" />
                        <span>Releases</span>
                    </div>
                    <div>
                        <i className="fa fa-equals mr-1" />
                        <span>Issues and filters</span>
                    </div>
                    <div>
                        <i className="fa fa-paste mr-1" />
                        <span>Pages</span>
                    </div>
                    <div>
                        <i className="fa fa-location-arrow mr-1" />
                        <span>Reports</span>
                    </div>
                    <div>
                        <i className="fa fa-box mr-1" />
                        <span>Components</span>
                    </div>
                </div> */}
            </div>


        </Fragment>
    )
}

