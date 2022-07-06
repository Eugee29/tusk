import { useState } from 'react'
import { Bar } from 'react-chartjs-2'

export const DashboardChart = ({ tasks, board }) => {
  const [dataType, setDataType] = useState('label')

  var chartLabels = []
  var chartData = []
  var chartColors = []

  switch (dataType) {
    case 'label':
      // eslint-disable-next-line
      const labelsIdMap = board.labels.reduce((acc, label) => ((acc[label.id] = 0), acc), {})
      tasks.forEach((task) => task.labelIds.forEach((labelId) => (labelsIdMap[labelId] += 1)))

      for (let labelId in labelsIdMap) {
        const label = board.labels.find((label) => label.id === labelId)
        chartData.push(labelsIdMap[labelId])
        chartLabels.push(label.title)
        chartColors.push(label.color)
      }

      break
    case 'group':
      board.groups.forEach((group) => {
        chartLabels.push(group.title)
        chartData.push(group.tasks.length)
      })
      break
    case 'member':
      // eslint-disable-next-line
      const membersIdMap = board.members.reduce((acc, member) => ((acc[member._id] = 0), acc), {})
      tasks.forEach((task) =>
        task.members.forEach((member) => {
          if (membersIdMap[member._id] !== undefined) membersIdMap[member._id] += 1
        })
      )

      for (let memberId in membersIdMap) {
        const member = board.members.find((member) => member._id === memberId)
        chartData.push(membersIdMap[memberId])
        chartLabels.push(member.fullname)
      }
      break
    default:
      break
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  }

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Tasks',
        data: chartData,
        backgroundColor: chartColors.length ? chartColors : ['rgb(66, 82, 110)'],
        borderRadius: 3,
      },
    ],
  }
  return (
    <div className="dashboard-chart">
      <header className="chart-header">
        <h1 className="title">Tasks per {dataType}</h1>
        <nav className="chart-options">
          <button className="label" disabled={dataType === 'label'} onClick={() => setDataType('label')}>
            Label
          </button>
          <button className="group" disabled={dataType === 'group'} onClick={() => setDataType('group')}>
            Group
          </button>
          <button className="member" disabled={dataType === 'member'} onClick={() => setDataType('member')}>
            Member
          </button>
        </nav>
      </header>
      <div className="graph-container">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
