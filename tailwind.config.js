const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px'
			}
		},
		extend: {
			fontFamily: {
				sans: [
					'var(--font-sans)',
					...fontFamily.sans
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				gray: {
					'50': '#eaeaea',
					'100': '#bebebf',
					'200': '#9e9ea0',
					'300': '#727275',
					'400': '#56565a',
					'500': '#2c2c31',
					'600': '#28282d',
					'700': '#1f1f23',
					'800': '#18181b',
					'900': '#121215'
				},
				purple: {
					'50': '#f3eefc',
					'100': '#d8cbf7',
					'200': '#c6b2f3',
					'300': '#ab8eee',
					'400': '#9b79ea',
					'500': '#8257e5',
					'600': '#764fd0',
					'700': '#5c3ea3',
					'800': '#48307e',
					'900': '#372560'
				},
				green: {
					'50': '#e6fbef',
					'100': '#b1f1ce',
					'200': '#8cebb6',
					'300': '#57e295',
					'400': '#36dc81',
					'500': '#04d361',
					'600': '#04c058',
					'700': '#039645',
					'800': '#027435',
					'900': '#025929'
				},
				app: {
					blue: {
						'50': '#f0f8ff',
						'100': '#e0f1fe',
						'200': '#bbe3fc',
						'300': '#7ecdfb',
						'400': '#3ab4f6',
						'500': '#109ae7',
						'600': '#0487d9',
						'700': '#0462a0',
						'800': '#085384',
						'900': '#0d466d',
						'950': '#092c48'
					},
					yellow: {
						'50': '#fefee8',
						'100': '#ffffc2',
						'200': '#fffa88',
						'300': '#fff145',
						'400': '#fde112',
						'500': '#f2cb05',
						'600': '#cd9b01',
						'700': '#a36e05',
						'800': '#87570c',
						'900': '#724711',
						'950': '#432505'
					},
					orange: {
						'50': '#fffbec',
						'100': '#fff6d4',
						'200': '#ffe9a7',
						'300': '#ffd770',
						'400': '#ffba36',
						'500': '#ffa30f',
						'600': '#f28705',
						'700': '#c86706',
						'800': '#9e500e',
						'900': '#7f420f',
						'950': '#452005'
					},
					red: {
						'50': '#fef3f2',
						'100': '#ffe4e1',
						'200': '#ffcec9',
						'300': '#feaba3',
						'400': '#fb7a6e',
						'500': '#f24130',
						'600': '#e03322',
						'700': '#bd2618',
						'800': '#9c2418',
						'900': '#81241b',
						'950': '#460e09'
					},
					green: {
						'50': '#f1fcf3',
						'100': '#ddfbe3',
						'200': '#bef4cb',
						'300': '#8beaa2',
						'400': '#51d772',
						'500': '#2abf4f',
						'600': '#1d9c3d',
						'700': '#1a7b32',
						'800': '#1a612c',
						'900': '#175027',
						'950': '#072c12'
					},
					white: {
						'50': '#f8f8f8',
						'100': '#f2f2f2',
						'200': '#dcdcdc',
						'300': '#bdbdbd',
						'400': '#989898',
						'500': '#7c7c7c',
						'600': '#656565',
						'700': '#525252',
						'800': '#464646',
						'900': '#3d3d3d',
						'950': '#292929'
					},
					azulClaro: {
						'50': '#f0faff',
						'100': '#e1f3fd',
						'200': '#bbe9fc',
						'300': '#76d4f9',
						'400': '#3cc2f4',
						'500': '#12ace5',
						'600': '#068bc3',
						'700': '#066e9e',
						'800': '#0a5d82',
						'900': '#0e4d6c',
						'950': '#093248'
					},
					azulMedio: {
						'50': '#f2f8fd',
						'100': '#e4effa',
						'200': '#c3def4',
						'300': '#8dc3ec',
						'400': '#51a5df',
						'500': '#2a88cd',
						'600': '#1d73b9',
						'700': '#17568d',
						'800': '#174a75',
						'900': '#193f61',
						'950': '#102841'
					},
					azulEscuro: {
						'50': '#eef9ff',
						'100': '#daf1ff',
						'200': '#bde7ff',
						'300': '#8fdaff',
						'400': '#5ac3ff',
						'500': '#34a6fd',
						'600': '#2b8ff3',
						'700': '#1671df',
						'800': '#195ab4',
						'900': '#1a4e8e',
						'950': '#153056'
					},
					verdeClaro: {
						'50': '#efffee',
						'100': '#d7ffd7',
						'200': '#b3ffb2',
						'300': '#94ff94',
						'400': '#33f534',
						'500': '#09de0a',
						'600': '#01b802',
						'700': '#059007',
						'800': '#0a710c',
						'900': '#0a5d0d',
						'950': '#003402'
					},
					verdeMedio: {
						'50': '#f2fcf1',
						'100': '#defade',
						'200': '#c0f3bf',
						'300': '#8de88d',
						'400': '#54d454',
						'500': '#32cd32',
						'600': '#209920',
						'700': '#1c791d',
						'800': '#1b601c',
						'900': '#184f1a',
						'950': '#082b09'
					},
					verdeEscuro: {
						'50': '#f1fcf1',
						'100': '#e0f9df',
						'200': '#c2f1c1',
						'300': '#92e491',
						'400': '#5bce5a',
						'500': '#34b334',
						'600': '#238b23',
						'700': '#217421',
						'800': '#1f5c20',
						'900': '#1b4c1c',
						'950': '#092a0b'
					},
					amareloClaro: {
						'50': '#ffffe0',
						'100': '#fdfec9',
						'200': '#f8fd99',
						'300': '#eff85e',
						'400': '#e0ee2d',
						'500': '#c2d40e',
						'600': '#98aa06',
						'700': '#72810a',
						'800': '#59650f',
						'900': '#4b5611',
						'950': '#283003'
					},
					amareloMedio: {
						'50': '#ffffe7',
						'100': '#fdffc1',
						'200': '#fffe86',
						'300': '#fff641',
						'400': '#ffe80d',
						'500': '#ffd900',
						'600': '#d1a000',
						'700': '#a67202',
						'800': '#89590a',
						'900': '#74490f',
						'950': '#442604'
					},
					amareloEscuro: {
						'50': '#fffcea',
						'100': '#fff5c5',
						'200': '#ffec85',
						'300': '#ffdb46',
						'400': '#ffc81b',
						'450': '#DDA011',
						'500': '#ffa600',
						'600': '#e27d00',
						'700': '#bb5602',
						'800': '#984208',
						'900': '#7c370b',
						'950': '#481b00'
					}
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: 0
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: 0
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				stripes: 'linear-gradient(to bottom, #1E4DD9, #1E4DD9 12.5%, transparent 12.5%, transparent)'
			},
			fontSize: {
				'5xl': '2.5rem'
			},
			backgroundSize: {
				stripes: '100% 8px'
			},
			blur: {
				full: '194px'
			}
		}
	},
	plugins: [require('tailwindcss-animate')],
}
