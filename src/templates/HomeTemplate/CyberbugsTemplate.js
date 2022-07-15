import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import SidebarCyberbugs from '../../components/Cyberbugs/SidebarCyberbugs';
import MenuCyberbugs from '../../components/Cyberbugs/MenuCyberbugs';
import Header from '../../components/Home/Header/Header';
import '../../index.css'
import ModalCyberBugs from '../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs';
import IndexCyberBugs from '../../pages/CyberBugs/ProjectDetail/IndexCyberBugs';
import CreateProject from '../../pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagerment from '../../pages/CyberBugs/ProjectManagerment/ProjectManagerment';

export const CyberbugsTemplate = (props) => {
    const { children, propsPath, ...restParam } = props;
    if (propsPath == 'main') {
        return <>
            <div className="jira">
                {/* Sider Bar  */}
                <SidebarCyberbugs />
                <MenuCyberbugs />
                <IndexCyberBugs />

                <ModalCyberBugs />
            </div>

        </>
    }
    else if ((propsPath == 'createproject')) {
        return <>
            <div className="jira">
                {/* Sider Bar  */}
                <SidebarCyberbugs />
                <MenuCyberbugs />
                <CreateProject />
                <ModalCyberBugs />
            </div>

        </>
    }
    else if ((propsPath == 'projectmanagement')) {
        return <>
            <div className="jira">
                {/* Sider Bar  */}
                <SidebarCyberbugs />
                <MenuCyberbugs />
                <ProjectManagerment />
                <ModalCyberBugs />
            </div>

        </>
    }
    else if ((propsPath == 'projectdetail')) {
        return <>
            <div className="jira">
                {/* Sider Bar  */}
                <SidebarCyberbugs />
                <MenuCyberbugs />
                <IndexCyberBugs />
                <ModalCyberBugs />
            </div>

        </>
    }
    
    else {
        return <>
        </>
    }
 
}