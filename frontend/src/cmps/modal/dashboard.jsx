import React from 'react'

import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Pie, Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export const Dashboard = ({ board }) => {
  return (
    <section className="task-dashboard">
      <Bar className="bar" options={optionsBar} data={dataBar} />
      <Pie data={dataPie} />
      <Line options={optionsLine} data={dataLine} />
    </section>
  )
}

const labelsBar = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
const count = [150, 100, 150, 100, 140, 80, 100]

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Bar Chart' },
  },
}

export const dataBar = {
  labels: labelsBar,
  datasets: [
    {
      label: 'Dataset 1',
      data: count,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export const dataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const labelsLine = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Line Chart',
    },
  },
}

export const dataLine = {
  labels: labelsLine,
  datasets: [
    {
      label: 'Dataset 1',
      data: labelsLine.map(() => 100),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labelsLine.map(() => 100),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}
