import './App.css';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Header from './components/Home/Header/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import ToDoListRFC from './pages/ToDoList/ToDoListRFC';
import ToDoList from './pages/ToDoList/ToDoList';
import ToDoListRedux from './pages/ToDoList/ToDoListRedux';
import BaiTapToDoListSaga from './pages/BaiTapToDoListSaga/BaiTapToDoListSaga';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import DemoHOCModal from './pages/DemoHOCModal/DemoHOCModal';
import Modal from './HOC/Modal/Modal';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import React, { Fragment, useEffect, useState } from 'react';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';

import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import { history } from './util/libs/history'
import { useDispatch } from 'react-redux'
import { CyberbugsTemplate } from './templates/HomeTemplate/CyberbugsTemplate';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import DrawerCyberBugs from './HOC/CyberbugsHOC/DrawerCyberBugs';
import DemoDragDrop from './pages/DemoDragDrop/DemoDragDrop';
import DragAndDropDnD from './pages/DragAndDropDnD/DragAndDropDnD';


function App() {
  // useEffect phải set sao chỉ chạy lần đầu tiên khi load App lên thôi
  const history = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'ADD_HISTORY',
      history: history
    })
  }, [])
  return (
    <>
      {/* Ko để thẻ trong Route auto hiển thị ra  */}
      {/* <Header /> */}
      {/* <Modal /> */}
      <LoadingComponent />
      <DrawerCyberBugs />


      <Routes history={history}>
        {/* Mặc định ứng dụng mở lên sẽ vô trang Home */}

        {/* <Route path='/lala' element={<About headElement={<Header />} />}/> */}
        {/* <Route path='' element={
          <Fragment>
            <Header />
            <Outlet />
          </Fragment>
        } /> */}
        {/* <Route path='/' element={<Home />} /> */}
        
        <Route path='/' element={
          <CyberbugsTemplate propsPath="projectmanagement">
            {/* Ở trong dây là CreateProject */}
          </CyberbugsTemplate>
        } />
        <Route path='/home' element={<Home />} />
        <Route path='contact' element={<Contact />} />
        <Route path='about' element={<About />} />
        {/* <Route path='/login' element={
          <UserLoginTemplate>
            <LoginCyberBugs />
          </UserLoginTemplate>
        } /> */}
        <Route path='/login' element={
          <UserLoginTemplate />
        } />
        <Route path='/main' element={
          <CyberbugsTemplate propsPath="main">
            {/* Ở trong dây là IndexCyberBugs */}

          </CyberbugsTemplate>
        } />
        <Route path='/createproject' element={
          <CyberbugsTemplate propsPath="createproject">
            {/* Ở trong dây là CreateProject */}
          </CyberbugsTemplate>
        } />
        <Route path='/projectmanagement' element={
          <CyberbugsTemplate propsPath="projectmanagement">
            {/* Ở trong dây là CreateProject */}
          </CyberbugsTemplate>
        } />
        {/* Project detail */}
        <Route path='/projectdetail/:projectId' element={
          <CyberbugsTemplate propsPath="projectdetail">
          </CyberbugsTemplate>
        } />
        

        <Route path='/detail' element={<Detail />} />
        <Route path='/detail/:detailId' element={<Detail />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/todolist' element={<ToDoList />} />
        <Route path='/todolistrfc' element={<ToDoListRFC />} />
        <Route path='/todolistredux' element={<ToDoListRedux />} />
        <Route path='/todolistsaga' element={<BaiTapToDoListSaga />} />

        
        <Route path='/demohocmodal' element={<DemoHOCModal />} />
        {/* Demo drag */}
        <Route path='/dragdrop' element={<DemoDragDrop />} />
        <Route path='/demodragdropdnd' element={<DragAndDropDnD />} />



        {/* Bắt lỗi khi người dùng nhập tùm lùm */}
        <Route path='*' element={<PageNotFound />} />


      </Routes>

    </>

  );
}

export default App;
