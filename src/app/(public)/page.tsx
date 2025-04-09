import Image from 'next/image'

import { Card, CardContent } from '@/components/ui/card'
import { FormularioLogin } from '@/components/forms/formulario-login'

export default function LoginPage() {
	
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<div className="flex flex-col gap-6">
					<Card className="overflow-hidden shadow-lg">
						<CardContent className="grid p-0 md:grid-cols-2">
              <FormularioLogin/>
							<div className="relative hidden bg-muted md:block">
								<Image
									src="/logo-app.jpg"
									alt="Proffy Thumbnail"
									width={300}
									loading="lazy"
									height={300}
									className="absolute inset-0 h-full w-full object-cover"
								/>
							</div>
						</CardContent>
					</Card>
					<div className="leading-none font-semibold text-center text-xs text-black/90 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
						{"Em desenvolvimento </>"}
					</div>
				</div>
			</div>
		</div>
    
  )
}
