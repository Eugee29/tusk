import { utilService } from '../services/util.service'
import { activityService } from '../services/activity.service'

export function ActivityList(props) {
  const { board } = props

  let task, onToggleMenu
  if (props.task) task = props.task
  if (props.onToggleMenu) onToggleMenu = props.onToggleMenu

  const activities = task ? activityService.getTaskActivities(task.id, board) : board.activities

  return (
    <div className="activities">
      {activities.map((activity) => (
        <div className="activity" key={activity.id}>
          {activity.byMember.imgURL ? (
            <div>
              <img className="member-img" src={activity.byMember.imgURL} alt="..." />
            </div>
          ) : (
            <div className="member-img user-initials ">{utilService.getInitials(activity.byMember.fullname)}</div>
          )}
          <div className="activity-info" key={activity.id}>
            <h3 className="activity-text">
              <span className="fullname">{activity.byMember.fullname}&nbsp;</span>
              {activity.isComment && (
                <span className="activity-time"> {utilService.getTimeAgo(activity.createdAt)} </span>
              )}
              {activity.isComment && !task && (
                <div className="comment">
                  {activityService.getActivityText(activity, board, task).map((text, index) => {
                    return <span key={index}>{text}&nbsp;</span>
                  })}
                  <div className="comment-container">
                    <span className="comment-content" key={activity.id}>
                      {activity.text}&nbsp;
                    </span>
                  </div>
                </div>
              )}
              {activity.isComment && task && (
                <div className="comment">
                  <div className="comment-container">
                    <span className="comment-content" key={activity.id}>
                      {activity.text}&nbsp;
                    </span>
                  </div>
                </div>
              )}
              {!activity.isComment &&
                task &&
                activityService.getActivityText(activity, board, task).map((text, index) => (
                  <span className="activity-content" key={index}>
                    {text}&nbsp;
                  </span>
                ))}
              {!activity.isComment &&
                !task &&
                activityService.getActivityText(activity, board, onToggleMenu).map((text, index) => (
                  <span className="activity-content" key={index}>
                    {text}&nbsp;
                  </span>
                ))}
            </h3>
            {!activity.isComment && <h3 className="activity-time"> {utilService.getTimeAgo(activity.createdAt)} </h3>}
          </div>
        </div>
      ))}
    </div>
  )
}
