import { ApexOptions } from 'apexcharts'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

import { ChartDonutProps } from './ChartInterface'

export default function NotificacoesTurmasChart({
  series,
  labels,
}: ChartDonutProps) {
  const Chart = dynamic(() => import('react-apexcharts'), {
    loading: () => (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
    ssr: false,
  })

  const { theme: tema } = useTheme()
  const confChartFreqAlunos: ApexOptions = {
    theme: {
      mode: tema && tema === 'light' ? 'light' : 'dark',
    },
    chart: {
      id: 'notifcacoes-turmas',
      toolbar: {
        show: false,
      },
      background: '#FFFFFFF',
    },
    labels,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
          },
          total: {
            show: false,
            label: 'TOTAL',
          },
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
      width: 1,
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: tema,
    },
  }

  return (
    <>
      <Chart
        options={confChartFreqAlunos}
        series={series}
        type="donut"
        width={'100%'}
        height={'auto'}
      />
    </>
  )
}
