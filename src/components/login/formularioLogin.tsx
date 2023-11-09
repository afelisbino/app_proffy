"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Separator } from "../ui/separator"

const formSchema = z.object({
    email: z.string().email({
        message: 'Email do usuário inválido!'
    }),
    password: z.string().min(8, { message: 'Senha inválida' })
})

export default function FormularioLogin() {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        router.push('/dashboard/professor')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-900">Email</FormLabel>
                            <FormControl>
                                <Input className="light" placeholder="user@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500 leading-none text-sm" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-900">Senha</FormLabel>
                            <FormControl>
                                <Input className="light" type="password" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500 leading-none text-sm" />
                        </FormItem>
                    )}

                />
                <Separator />
                <Button className="shadow-md relative w-full flex justify-center font-alt text-sm uppercase leading-none bg-[#1438A6] rounded text-white hover:bg-[#1E4DD9" type="submit">Entrar</Button>
            </form>
        </Form>
    )
}