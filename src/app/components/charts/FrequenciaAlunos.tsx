import { ApexOptions } from 'apexcharts'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { ChartBarProps } from './ChartInterface'

export default function FrequenciaAlunosChart({
  series,
  categories,
}: ChartBarProps) {
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
      id: 'frequencia-alunos-turmas',
      toolbar: {
        show: false,
      },
      background: '#FFFFFFF',
    },
    xaxis: {
      categories,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
        },
        borderRadius: 5,
        columnWidth: 30,
        borderRadiusApplication: 'around',
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: 4,
      offsetX: -2,
      style: {
        fontSize: '12px',
      },
    },
    legend: {
      show: true,
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
        type="bar"
        width={'100%'}
        height={'auto'}
      />
    </>
  )
}
