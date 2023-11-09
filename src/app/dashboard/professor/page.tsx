import { NavMain } from '@/components/header/NavMain'
import { itensNav } from '@/components/header/NavMainItens'
import { UserNav } from '@/components/header/UserNav'
import { SeletorTema } from '@/components/theme/seletor-tema'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from "@/components/ui/separator"
import { Metadata } from 'next'
import Calendario from '@/components/calendario'
import { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { UserCheck, UserX } from 'lucide-react'
import { ListaDisciplina } from '@/components/disciplina/ListaDisciplina'
import { ListaTurma } from '@/components/turma/ListaTurma'

export const metadata: Metadata = {
    title: 'Chamada Escolar | Professor',
}

const listaItensMenu: itensNav[] = [
    {
        refRouter: "#",
        titleItem: "Gerenciar Turmas"
    },
    {
        refRouter: "#",
        titleItem: "Gerenciar Disciplinas"
    }
]


export default function ProfessorPage() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <NavMain className="mx-6" listaItensMenu={listaItensMenu} />
                        <div className="ml-auto flex items-center space-x-4">
                            <SeletorTema />
                            <UserNav />
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">{'Bem vindo(a)!'}</h2>
                    </div>
                    <Tabs defaultValue="chamada" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="chamada">Fazer chamada</TabsTrigger>
                            <TabsTrigger value="relatorio" disabled>
                                Relatório de frequência
                            </TabsTrigger>
                        </TabsList>
                        <Separator />
                        <TabsContent value="chamada" className="space-y-4">
                            <div className='flex-1 items-center flex-row space-y-4'>
                                <div className='flex justify-center items-center gap-4'>
                                    <ListaDisciplina />
                                    <ListaTurma />
                                </div>
                                <Separator />
                                <div className="grid gap-2 grid-flow-col grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                    <div className='w-min'><Calendario /></div>
                                    <div className='rounded-md border p-2'>
                                        <Table>
                                            <TableCaption>Turma A | Disciplina B</TableCaption>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className='w-auto'>Nome do aluno</TableHead>
                                                    <TableHead className="w-[100px]">Presente</TableHead>
                                                    <TableHead className="w-[100px]">Falta</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium">Aluno A</TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-green-500 hover:bg-green-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserCheck className='text-white' /></Button>
                                                    </TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-red-500 hover:bg-red-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserX /></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Aluno B</TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-green-500 hover:bg-green-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserCheck className='text-white' /></Button>
                                                    </TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-red-500 hover:bg-red-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserX /></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Aluno C</TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-green-500 hover:bg-green-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserCheck className='text-white' /></Button>
                                                    </TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-red-500 hover:bg-red-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserX /></Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium">Aluno D</TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-green-500 hover:bg-green-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserCheck className='text-white' /></Button>
                                                    </TableCell>
                                                    <TableCell className="w-[100px]">
                                                        <Button className='rounded-full bg-red-500 hover:bg-red-600 w-auto h-[55px] shadow-md dark:shadow-none'><UserX /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="chamada" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}