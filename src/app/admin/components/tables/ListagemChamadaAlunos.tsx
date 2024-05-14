import { UserCheck, UserX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ListagemChamadaAlunos() {
  return (
    <Table>
      <TableHeader className="border-b">
        <TableHead className="w-auto">Nome do aluno</TableHead>
        <TableHead className="w-[100px]">Presente</TableHead>
        <TableHead className="w-[100px]">Falta</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Aluno A</TableCell>
          <TableCell className="w-[100px] ">
            <Button className="rounded-full bg-app-green-600 hover:bg-app-green-700 w-auto h-[55px] shadow-md dark:shadow-none">
              <UserCheck className="text-white" />
            </Button>
          </TableCell>
          <TableCell className="w-[100px]">
            <Button className="rounded-full bg-app-red-600 hover:bg-app-red-700 w-auto h-[55px] shadow-md dark:shadow-none">
              <UserX className="text-white" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
