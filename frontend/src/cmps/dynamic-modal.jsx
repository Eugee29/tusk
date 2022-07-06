import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { debounce } from 'lodash'

import { IoIosArrowBack } from 'react-icons/io'
import { CgClose } from 'react-icons/cg'

import { setModal } from '../store/app/app.actions'

import { utilService } from '../services/util.service'

import { ModalLabelCreate } from './modal/modal-label-create'
import { ModalLabelChange } from './modal/modal-label-change'
import { ModalCreateBoard } from './modal/modal-create-board'
import { ModalGroupActions } from './modal/modal-group-actions'
import { ModalCover } from './modal/modal-cover'
import { ModalDates } from './modal/modal-dates'
import { ModalMember } from './modal/modal-member'
import { ModalBoardMember } from './modal/modal-board-member'
import { ModalLabel } from './modal/modal-label'
import { TodoActions } from './modal/todo-actions'
import { ChecklistDelete } from './modal/checklist-delete'
import { ChecklistAdd } from './modal/checklist-add'
import { AttachmentAdd } from './modal/attachment-add.jsx'
import { AttachmentDelete } from './modal/attachment-delete'
import { AttachmentEdit } from './modal/attachment-edit'
import { MemberActions } from './modal/member-actions'
import { TaskDelete } from './modal/task-delete'
import { MoreMembers } from './modal/more-members'
import { AccountActions } from './modal/account-actions'
import { TaskFilter } from './modal/task-filter'
import { Dashboard } from './modal/dashboard'

export const DynamicModal = () => {
  const [position, setPosition] = useState(null)
  const { modal } = useSelector(({ appModule }) => appModule)
  const editLabel = useRef()
  const deleteMember = useRef()
  const buttonRef = useRef()
  const modalRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('resize', debouncedAdjust)
    return () => window.removeEventListener('resize', debouncedAdjust)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    adjustPosition()
    // eslint-disable-next-line
  }, [modal.element])

  const changeEditLabel = (label) => {
    editLabel.current = label
  }

  const deleteMemberFromBoard = (id) => {
    deleteMember.current = id
  }

  const adjustPosition = () => {
    const position = utilService.getPosition(modal.element)
    // Gives the modal some space from the element that triggered it, equal to 1/4 of that element height
    position.top += modal.element.offsetHeight * 1.25

    // Pushes the modal into the viewport when it does not have enough space to open up, + 10 px from the edge of the viewport.
    if (position.top + modalRef.current.offsetHeight >= window.innerHeight) {
      position.top = window.innerHeight - modalRef.current.offsetHeight - 10
    }
    if (position.left + modalRef.current.offsetWidth >= window.innerWidth) {
      position.left = window.innerWidth - modalRef.current.offsetWidth - 10
    }

    setPosition(position)
  }

  const debouncedAdjust = debounce(adjustPosition, 200)

  var cmp

  switch (modal.category) {
    case 'Cover':
      cmp = <ModalCover {...modal.props} />
      break
    case 'Members':
      cmp = <ModalMember {...modal.props} />
      break
    case 'Dates':
      cmp = <ModalDates {...modal.props} />
      break
    case 'Labels':
      cmp = <ModalLabel {...modal.props} changeEditLabel={changeEditLabel} />
      break
    case 'Create label':
      cmp = <ModalLabelCreate {...modal.props} />
      break
    case 'Change label':
      cmp = <ModalLabelChange {...modal.props} editLabel={editLabel.current} />
      break
    case 'Create board':
      cmp = <ModalCreateBoard />
      break
    case 'Board members':
      cmp = <ModalBoardMember {...modal.props} deleteMemberFromBoard={deleteMemberFromBoard} />
      break

    case 'todo-actions':
      cmp = <TodoActions {...modal.props} />
      break
    case 'checklist-delete':
      cmp = <ChecklistDelete {...modal.props} />
      break
    case 'checklist-add':
      cmp = <ChecklistAdd {...modal.props} />
      break
    case 'attachment-add':
      cmp = <AttachmentAdd {...modal.props} />
      break
    case 'Group actions':
      cmp = <ModalGroupActions {...modal.props} />
      break
    case 'attachment-delete':
      cmp = <AttachmentDelete {...modal.props} />
      break
    case 'attachment-edit':
      cmp = <AttachmentEdit {...modal.props} />
      break
    case 'member-actions':
      cmp = <MemberActions {...modal.props} />
      break
    case 'task-delete':
      cmp = <TaskDelete {...modal.props} />
      break
    case 'more-members':
      cmp = <MoreMembers {...modal.props} />
      break
    case 'account-actions':
      cmp = <AccountActions {...modal.props} />
      break
    case 'task-filter':
      cmp = <TaskFilter {...modal.props} />
      break
    case 'dashboard':
      cmp = <Dashboard {...modal.props} />
      break
    default:
      break
  }

  const onOpenModal = (ev, category) => {
    ev.stopPropagation()
    dispatch(
      setModal({
        element: modal.element,
        category,
        title: category,
        props: {
          ...modal.props,
        },
      })
    )
  }

  return (
    <div
      className={`dynamic-modal ${
        modal.category === 'task-filter' ? 'wide' : modal.category === 'dashboard' ? 'wide-dashboard' : ''
      }`}
      style={{ ...position }}
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
    >
      {modal.category !== 'member-actions' && (
        <header>
          {modal.category === 'Create label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span>
                <IoIosArrowBack />
              </span>
            </button>
          )}
          {modal.category === 'Change label' && (
            <button ref={buttonRef} onClick={(ev) => onOpenModal(ev, 'Labels')} className="sidebar-icon-left">
              <span>
                <IoIosArrowBack />
              </span>
            </button>
          )}
          <div className="label">{modal.title ? modal.title : modal.category}</div>
          <button className="sidebar-icon-right" onClick={() => dispatch(setModal(null))}>
            <span>
              <CgClose />
            </span>
          </button>
        </header>
      )}
      <main className="main-modal">{cmp}</main>
    </div>
  )
}
