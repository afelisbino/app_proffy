'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { autenticarUsuario } from '@/api/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
	email: z.string().email({ message: 'Email inválido' }).trim(),
	senha: z
		.string({
			required_error: 'Necessário informar a senha.',
		})
		.trim(),
})

export type FormAuthType = z.infer<typeof formSchema>

export function FormularioLogin() {
	const router = useRouter()
	const formAuth = useForm<FormAuthType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			senha: '',
		},
	})

	async function iniciarSessao(credenciais: FormAuthType) {
		const autentica = await autenticarUsuario(credenciais)

		if (!autentica?.status) {
			toast.warning(autentica?.message)
			router.refresh()
			return
		}

		router.push('/')
	}

	return (
		<Form {...formAuth}>
			<form className="p-6 md:p-8 space-y-8" onSubmit={formAuth.handleSubmit(iniciarSessao)}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center text-center">
						<h1 className="text-2xl font-bold">Bem vindo</h1>
						<p className="text-balance text-muted-foreground">
							Acessar conta proffy
						</p>
					</div>
					<div className="grid gap-2">
						<FormField
							control={formAuth.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											placeholder="email@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={formAuth.control}
							name="senha"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											autoComplete="off"
											type="password"
											placeholder="123456"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button disabled={formAuth.formState.isSubmitting} className="capitalize font-medium text-base text-center text-white bg-app-verdeMedio-600 hover:bg-app-verdeMedio-700 w-full shadow-md">
					{formAuth.formState.isSubmitting ? "validando..." : "entrar"}
				</Button>
			</form>
		</Form>
	)
}
