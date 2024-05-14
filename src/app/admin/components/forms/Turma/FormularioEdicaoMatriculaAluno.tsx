// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'

// import { register } from 'module'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { format } from 'date-fns'
// import { ptBR } from 'date-fns/locale'
// import { CalendarIcon, Save, Trash } from 'lucide-react'
// import React from 'react'
// import { Controller, useFieldArray, useForm } from 'react-hook-form'
// import { z } from 'zod'

// import { schemaFormularioMatriculaAluno } from '@/app/admin/schemas/SchemaAlunosTurma'
// import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Separator } from '@/components/ui/separator'
// import { Switch } from '@/components/ui/switch'
// import { cn } from '@/lib/utils'

// export interface FormularioMatriculaAlunoProps {
//   idAluno: string
// }

// export function FormularioMatriculaAluno({
//   idAluno,
// }: FormularioMatriculaAlunoProps) {
//   const formMatriculaAluno = useForm<
//     z.infer<typeof schemaFormularioMatriculaAluno>
//   >({
//     resolver: zodResolver(schemaFormularioMatriculaAluno),
//     defaultValues: {
//       idAluno,
//       nome: '',
//       cpf: '',
//       rg: '',
//       ra: '',
//       dataNascimento: new Date(),
//       nomeResponsavel: '',
//       cpfResponsavel: '',
//       telefones: [],
//       emails: [],
//     },
//     mode: 'onChange',
//   })

//   const {
//     fields: phoneFields,
//     append: appendPhone,
//     remove: removePhone,
//   } = useFieldArray({
//     control: formMatriculaAluno.control,
//     name: 'telefones',
//   })

//   const {
//     fields: emailFields,
//     append: appendEmail,
//     remove: removeEmail,
//   } = useFieldArray({
//     control: formMatriculaAluno.control,
//     name: 'emails',
//   })

//   return (
//     <Form {...formMatriculaAluno}>
//       <form
//         onSubmit={formMatriculaAluno.handleSubmit(() => {})}
//         className="space-y-8"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//           <div>
//             <FormField
//               control={formMatriculaAluno.control}
//               name="cpf"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>CPF do aluno</FormLabel>
//                   <FormControl>
//                     <Input placeholder="000.000.000-00" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:col-span-2">
//             <FormField
//               control={formMatriculaAluno.control}
//               name="nome"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nome completo</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Nome do aluno" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
//           <FormField
//             control={formMatriculaAluno.control}
//             name="rg"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>RG do aluno</FormLabel>
//                 <FormControl>
//                   <Input placeholder="00.000.000-0" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={formMatriculaAluno.control}
//             name="ra"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>RA do aluno</FormLabel>
//                 <FormControl>
//                   <Input placeholder="00000000" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={formMatriculaAluno.control}
//             name="dataNascimento"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Data de nascimento</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant={'outline'}
//                         className={cn(
//                           'w-full pl-3 text-left font-normal',
//                           !field.value && 'text-muted-foreground',
//                         )}
//                       >
//                         {field.value ? (
//                           format(field.value, 'P', {
//                             locale: ptBR,
//                           })
//                         ) : (
//                           <span>Selecione a data de nascimento...</span>
//                         )}
//                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0" align="center">
//                     <Calendar
//                       mode={'single'}
//                       captionLayout="dropdown-buttons"
//                       fromYear={1990}
//                       toYear={new Date().getFullYear()}
//                       selected={field.value}
//                       onSelect={field.onChange}
//                       locale={ptBR}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Separator />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//           <div>
//             <FormField
//               control={formMatriculaAluno.control}
//               name="cpfResponsavel"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>CPF do Responsável</FormLabel>
//                   <FormControl>
//                     <Input placeholder="000.000.000-00" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="md:col-span-2">
//             <FormField
//               control={formMatriculaAluno.control}
//               name="nomeResponsavel"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nome completo</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Nome do responsável" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <div className="flex flex-col gap-2">
//             <Button type="button" onClick={() => appendEmail({ email: '' })}>
//               Novo email
//             </Button>
//             {emailFields.map((email, index) => (
//               <div key={index} className="flex justify-between gap-2">
//                 <FormField
//                   key={email.id}
//                   control={formMatriculaAluno.control}
//                   name={`emails.${index}.email`}
//                   render={({ field }) => (
//                     <FormItem className="w-full">
//                       <FormControl>
//                         <Input {...field} placeholder="E-mail" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   className="shadow"
//                   variant={'destructive'}
//                   type="button"
//                   onClick={() => removeEmail(index)}
//                 >
//                   <Trash />
//                 </Button>
//               </div>
//             ))}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Button
//               type="button"
//               onClick={() =>
//                 appendPhone({ ddd: '', numero: '', whatsapp: false })
//               }
//             >
//               Novo Telefone
//             </Button>
//             {phoneFields.map((telefone, index) => (
//               <div key={index} className="flex justify-between gap-2">
//                 <FormField
//                   key={telefone.id}
//                   control={formMatriculaAluno.control}
//                   name={`telefones.${index}.ddd`}
//                   render={({ field }) => (
//                     <FormItem className="w-28">
//                       <FormControl>
//                         <Input {...field} placeholder="DDD" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   key={index}
//                   control={formMatriculaAluno.control}
//                   name={`telefones.${index}.numero`}
//                   render={({ field }) => (
//                     <FormItem className="w-full">
//                       <FormControl>
//                         <Input {...field} placeholder="N° Telefone" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={formMatriculaAluno.control}
//                   name={`telefones.${index}.whatsapp`}
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg px-2 gap-2">
//                       <FormControl>
//                         <Switch
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                         />
//                       </FormControl>
//                       <div className="pb-2">
//                         <FormLabel className="text-base">Whatsapp</FormLabel>
//                       </div>
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   className="shadow"
//                   variant={'destructive'}
//                   type="button"
//                   onClick={() => removePhone(index)}
//                 >
//                   <Trash />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex items-center">
//           <Button
//             type="submit"
//             className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
//           >
//             <Save />
//             Salvar
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
