import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { setModal } from './store/app/app.actions'

import './assets/style/main.scss'

import { HomePage } from './pages/home-page'
import { LoginSignupPage } from './pages/login-signup-page'
import { Workspace } from './pages/workspace'
import { BoardDetails } from './pages/board-details'
import { TaskDetails } from './pages/task-details'
import { Dashboard } from './pages/dashboard'

import { AppHeader } from './cmps/app-header'
import { DynamicModal } from './cmps/dynamic-modal'

export function RootCmp() {
  const { modal } = useSelector(({ appModule }) => appModule)
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        if (modal) dispatch(setModal(null))
      }}
    >
      <AppHeader />
      {modal && <DynamicModal />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignupPage type="login" />} />
        <Route path="/signup" element={<LoginSignupPage type="signup" />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/board/:boardId/*" element={<BoardDetails />}>
          <Route path=":groupId/:taskId" element={<TaskDetails />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}
