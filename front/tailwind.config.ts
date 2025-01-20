import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";
import Nth from "tailwindcss-nth-child";
import colors from "tailwindcss/colors";
import { fontFamily } from "tailwindcss/defaultTheme";
import { PluginAPI } from "tailwindcss/types/config";
// import withPlugins from "next-compose-plugins";
const plugin = new Nth("2");
import daisyui from "daisyui";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
    prefix: '',
	darkMode: ["class"],
	theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
              '2xl': '1400px',
            },
          },
		extend: {
            spacing: {
                "1/10": "10%",
            },
            brightness: {
                60: ".6",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
			screens: {
				vs: { min: "20em" }, //  Smallest  @ 320px * 787px
				xs: { min: "23.4375em" }, //  iPhone SE @ 375px * 667px
				"0xs": { min: "24.375em" }, //  iPhone 12 Pro @ 390px * 884px
				"1xs": { min: "24.5625em" }, //  Pixel 5 @ 393px * 851px
				"2xs": { min: "25.875em" }, //  iPhone XR @ 414px * 896px
				"mobile-l": { min: "26.5625em" }, //  MobileL @425px * 787px
				sm: { min: "40em" },
				tablet: { min: "48em" }, //  Tablet / iPadMini
				"tablet-l": { min: "51.25em" }, //  Tablet L / iPadAir
				md: { min: "60em" },
				laptop: { min: "64em" }, //  Laptop
				lg: { min: "80em" },
				"laptop-l": { min: "90em" }, //  Laptop L
				xl: { min: "100em" },
				"2xl": { min: "120em" },
				"3xl": { min: "140em" },
				"4vl": { min: "160em" },
                // sm: "640px",
                // md: "768px",
                // lg: "1024px",
                // xl: "1280px",
                // "2xl": "1536px",
			},
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
			colors: {
                'in-active': '#545454',
                connector: '#F0F1F6',
                'keyword-yellow': '#E1CE26',
                'keyword-purple': '#7C21D6',
                'keyword-red': '#EB441F',
                'keyword-green': '#2FE699',
                'light-blue': '#3352CC',
                'background-90': '#1D1D1D',
                'background-80': '#252525',
                'text-secondary': '#9B9CA0',
                cream: '#F5F5F5',
                gravel: '#4E4E4E',
                iridium: '#3F3F3F',
                orange: '#FFA947',
                peach: '#FFE0BD',
                platinum: '#E6E6E6',
                ghost: '#CDCDCD',
                grandis: '#FFC989',
                porcelain: '#F1F1F1',
                ironside: '#636363',
                themeBlack: "#09090B",
                themeGray: "#27272A",
                themeDarkGray: "#27272A",
                themeTextGray: "#B4B0AE",
                themeTextWhite: "#F7ECE9",
        //     'fsc-blue-gray': '#99AAC0',
        //     'fsc-dark-blue': '#0C3C60',
        //     'fsc-light-blue': '#6EA4CE',
        //     'fsc-pale-blue': '#D1E0EB',
        //     'fsc-teal': '#1FABC7',
        //     'fsc-light-gray': '#D8DADC',
        //     'fsc-dark-gray': '#494949',
        //     'fsc-lavender': '#B3BEDC',
                // accent: "var(--accent)",
                canvas: "var(--canvas)",
                canvasText: "var(--canvasText)",
                tremor: {
                    brand: {
                        faint: colors.blue[50],
                        muted: colors.blue[200],
                        subtle: colors.blue[400],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[700],
                        inverted: colors.white,
                    },
                    background: {
                        muted: colors.gray[50],
                        subtle: colors.gray[100],
                        DEFAULT: colors.white,
                        emphasis: colors.gray[700],
                    },
                    // background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    border: {
                        DEFAULT: colors.gray[200],
                    },
                    ring: {
                        DEFAULT: colors.gray[200],
                    },
                    content: {
                        subtle: colors.gray[400],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[700],
                        strong: colors.gray[900],
                        inverted: colors.white,
                    },
                },
                "dark-tremor": {
                    brand: {
                        faint: "#0B1229",
                        muted: colors.blue[950],
                        subtle: colors.blue[800],
                        DEFAULT: colors.blue[500],
                        emphasis: colors.blue[400],
                        inverted: colors.blue[950],
                    },
                    background: {
                        muted: "#131A2B",
                        subtle: colors.gray[800],
                        DEFAULT: colors.gray[900],
                        emphasis: colors.gray[300],
                    },
                    border: {
                        DEFAULT: colors.gray[700],
                    },
                    ring: {
                        DEFAULT: colors.gray[800],
                    },
                    content: {
                        subtle: colors.gray[600],
                        DEFAULT: colors.gray[500],
                        emphasis: colors.gray[200],
                        strong: colors.gray[50],
                        inverted: colors.gray[950],
                    },
                },
				boxShadow: {
					glass: "0 0.9375em 1.5625em rgba(0, 0, 0, 0.05)",

					// glass: "0 25px 45px rgba(0, 0, 0, 0.1)",
					"active-menu": "0 0 0 #111827",
					"active-dark-menu": "0 0 0 #4C8EFF",
                    // light
                    "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    "tremor-card":
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    "tremor-dropdown":
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    // dark
                    "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                    "dark-tremor-card":
                        "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                    "dark-tremor-dropdown":
                        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    DEFAULT:
                        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
                    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
                    none: "none",
                    "social-glass": "0 5px 45px rgba(0, 0, 0, 0.1)",
                    "dark-glass":
                        "0 0.9375em 1.5625em rgba(255, 255, 255, 0.1)",
                    menu: "0 -0.5em 0 #111827",
                    "dark-menu": "0 -0.5em 0 #4C8EFF",
                    "login-modal": "0 0 10px rgba(0,0,0,0.25)",
                    "login-modal-dark": "0 0 10px rgba(255,255,255,0.25)",
                    "glass-form": "0 25px 45px rgba(0, 0, 0, 0.1)",
                    "glass-form-dark": "0 25px 45px rgba(255, 255, 255, 0.1)",
                    glass1: "0 15px 35px rgba(0, 0, 0,0.05)",
                    glass1a: "0 5px 10px rgba(0, 0, 0, 0.1)",
                    glass2: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    glass3: "0 25px 45px rgba(0, 0, 0, 0.1)",
                    glass3a: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    size: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    button: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    svg_display:
                        "0.1875em 0.3125em 0.4375em rgba(0, 0, 0, 0.5)",
                    svg_display_dark:
                        "0.1875em 0.3125em 0.4375em rgba(255, 255, 255, 0.5)",

                    imageCapture: "1px -7px 7px -6px rgba(0, 0, 0, 0.44)",
				},
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))',
                },
			},
			keyframes: {
                'caret-blink': {
                    '0%,70%,100%': { opacity: '1' },
                    '20%,50%': { opacity: '0' },
                },
                'open-sidebar': {
                    from: { width: '60px' },
                    to: { width: '300px' },
                },
                'close-sidebar': {
                    from: { width: '300px' },
                    to: { width: '60px' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
				"glass-square-move": {
					"0%, 100%": {
						transform: "translateY(-40px)",
					},
					"50%": {
						transform: "translateY(40px)",
					},
				},
                "accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
                "automation-zoom-in": {
                    "0%": { transform: "translateY(-30px) scale(0.2)" },
                    "100%": {
                        transform: "transform: translateY(0px) scale(1)",
                    },
                },
                social_glass: {
                    "0% 100%": { transform: "skewX(45deg)" },
                    "50%": { transform: "translateX(9.375em)" },
                },
                social_glass0: {
                    "0% 100%": { transform: "skewX(45deg)" },
                    "50%": { transform: "translateX(-9.375em)" },
                },
                initial_page_load: {
                    "0%": {
                        transform: "translateX(0)",
                    },
                    "50%": {
                        transform: "translateX(-65%)",
                    },
                    "100%": {
                        transform: "translateX(0)",
                    },
                },
                move: {
                    "0%, 100%": {
                        transform: "translateY(50px)",
                    },
                    "50%": {
                        transform: "translateY(100px)",
                    },
                },
                move1: {
                    "0%, 100%": {
                        transform: "translateY(-20px)",
                    },
                    "50%": {
                        transform: "translateY(20px)",
                    },
                },
                squaremove: {
                    "0%, 100%": {
                        transform: "translateY(-40px)",
                    },
                    "50%": {
                        transform: "translateY(40px)",
                    },
                },
                breath_1: {
                    "0%, 100%": {
                        transform: "translateY(1rem)",
                    },
                    "50%": {
                        transform: "translateY(2rem)",
                    },
                },
                breath_2: {
                    "0%, 100%": {
                        transform: "translateY(-4rem)",
                    },
                    "50%": {
                        transform: "translateX(-2rem)",
                    },
                },
                breath_3: {
                    "0%, 100%": {
                        transform: "translateY(-1rem)",
                    },
                    "50%": {
                        transform: "translateX(-1rem)",
                    },
                },
                breath_4: {
                    "0%, 100%": {
                        transform: "rotateZ(0deg)",
                    },
                    "50%": {
                        transform: "rotateZ(10deg)",
                    },
                },
                breath_6: {
                    "0%, 100%": {
                        transform: "translateY(-2rem)",
                    },
                    "50%": {
                        transform: "translateY(-1rem)",
                    },
                },
                asset_1: {
                    "0%, 100%": {
                        transform: "translateY(1rem)",
                    },
                    "50%": {
                        transform: "translateX(-2rem)",
                    },
                },
                asset_2: {
                    "0%, 100%": {
                        transform: "translateX(1rem)",
                    },
                    "50%": {
                        transform: "rotateX(180deg)",
                    },
                },
                asset_3: {
                    "0%, 100%": {
                        transform: "rotateZ(-50deg)",
                    },
                    "50%": {
                        transform: "rotateY(90deg)",
                    },
                },
                asset_4: {
                    "0%, 100%": {
                        transform: "translateY(5rem)",
                    },
                    "50%": {
                        transform: "translateX(-5rem)",
                    },
                },
                asset_5: {
                    "0%, 100%": {
                        transform: "scale(2)",
                    },
                    "50%": {
                        transform: "translateY(2rem)",
                    },
                },
                asset_6: {
                    "0%, 100%": {
                        transform: "translateX(-1rem)",
                    },
                    "50%": {
                        transform: "rotate(-45deg)",
                    },
                },
                asset_7: {
                    "0%, 100%": {
                        transform: "scaleY(0.5)",
                    },
                    "50%": {
                        transform: "rotateZ(10deg)",
                    },
                },
                asset_8: {
                    "0%, 100%": {
                        transform: "rotateX(86deg)",
                    },
                    "50%": {
                        transform: "translateY(3rem)",
                    },
                },
                asset_9: {
                    "0%, 100%": {
                        transform: "scale(0.3)",
                    },
                    "50%": {
                        transform: "rotateZ(-100deg)",
                    },
                },
                asset_10: {
                    "0%, 100%": {
                        transform: "translateX(5rem)",
                    },
                    "50%": {
                        transform: "translateX(-5rem)",
                    },
                },
                asset_11: {
                    "0%, 100%": {
                        transform: "rotateY(90deg)",
                    },
                    "50%": {
                        transform: "scale(2)",
                    },
                },
                asset_12: {
                    "0%, 100%": {
                        transform: "scaleX(5)",
                    },
                    "50%": {
                        transform: "translateY(2rem)",
                    },
                },
                asset_13: {
                    "0%, 100%": {
                        transform: "rotateZ(20deg)",
                    },
                    "50%": {
                        transform: "translateY(3rem)",
                    },
                },
                asset_14: {
                    "0%, 100%": {
                        transform: "scaleX(0.9))",
                    },
                    "50%": {
                        transform: "translateX(9rem)",
                    },
                },
                asset_15: {
                    "0%, 100%": {
                        transform: "translateY(-2rem)",
                    },
                    "50%": {
                        transform: "translateY(2rem)",
                    },
                },
                asset_16: {
                    "0%, 100%": {
                        transform: "rotateY(45deg)",
                    },
                    "50%": {
                        transform: "rotateY(-45deg)",
                    },
                },
                asset_17: {
                    "0%, 100%": {
                        transform: "scale(2)",
                    },
                    "50%": {
                        transform: "scale(0.5)",
                    },
                },
                asset_18: {
                    "0%, 100%": {
                        transform: "rotateY(90deg)",
                    },
                    "50%": {
                        transform: "rotateZ(90deg)",
                    },
                },
                asset_19: {
                    "0%, 100%": {
                        transform: "translateX(1rem)",
                    },
                    "50%": {
                        transform: "translateY(-12rem)",
                    },
                },
                asset_20: {
                    "0%, 100%": {
                        transform: "rotateX(-40deg)",
                    },
                    "50%": {
                        transform: "rotateX(40deg)",
                    },
                },
                asset_21: {
                    "0%, 100%": {
                        transform: "rotateY(5deg)",
                    },
                    "50%": {
                        transform: "scale(5)",
                    },
                },
                asset_22: {
                    "0%, 100%": {
                        transform: "translateX(-4rem)",
                    },
                    "50%": {
                        transform: "rotateY(145deg)",
                    },
                },
                asset_23: {
                    "0%, 100%": {
                        transform: "rotateY(50deg)",
                    },
                    "50%": {
                        transform: "scale(0.7)",
                    },
                },
                asset_24: {
                    "0%, 100%": {
                        transform: "scale(3)",
                    },
                    "50%": {
                        transform: "rotateX(200deg)",
                    },
                },
                asset_25: {
                    "0%, 100%": {
                        transform: "translateX(30rem)",
                    },
                    "50%": {
                        transform: "rotateZ(40deg)",
                    },
                },
                asset_26: {
                    "0%, 100%": {
                        transform: "scaleY(2)",
                    },
                    "50%": {
                        transform: "scaleX(0.2)",
                    },
                },
                asset_27: {
                    "0%, 100%": {
                        transform: "rotateX(40deg)",
                    },
                    "50%": {
                        transform: "rotateX(-50deg)",
                    },
                },
                asset_28: {
                    "0%, 100%": {
                        transform: "rotateZ(45deg)",
                    },
                    "50%": {
                        transform: "scale(1.5)",
                    },
                },
                asset_29: {
                    "0%, 100%": {
                        transform: "scaleY(2)",
                    },
                    "50%": {
                        transform: "scaleX(1.5)",
                    },
                },
                asset_30: {
                    "0%, 100%": {
                        transform: "translateX(1rem)",
                    },
                    "50%": {
                        transform: "rotateX(90deg)",
                    },
                },
                asset_31: {
                    "0%, 100%": {
                        transform: "rotateY(95deg)",
                    },
                    "50%": {
                        transform: "rotateZ(-40deg)",
                    },
                },
                asset_32: {
                    "0%, 100%": {
                        transform: "scale(1.1)",
                    },
                    "50%": {
                        transform: "scale(0.1)",
                    },
                },
                asset_33: {
                    "0%, 100%": {
                        transform: "translateY(4rem)",
                    },
                    "50%": {
                        transform: "translateY(-4rem)",
                    },
                },
                asset_34: {
                    "0%, 100%": {
                        transform: "rotateY(300deg)",
                    },
                    "50%": {
                        transform: "rotateY(-30deg)",
                    },
                },
                asset_35: {
                    "0%, 100%": {
                        transform: "translateX(2rem)",
                    },
                    "50%": {
                        transform: "rotateZ(330deg)",
                    },
                },
                asset_36: {
                    "0%, 100%": {
                        transform: "scale(1.7)",
                    },
                    "50%": {
                        transform: "rotate(50deg)",
                    },
                },
                asset_37: {
                    "0%, 100%": {
                        transform: "rotateY(-50deg)",
                    },
                    "50%": {
                        transform: "scale(0.7)",
                    },
                },
                asset_38: {
                    "0%, 100%": {
                        transform: "rotateX(60deg)",
                    },
                    "50%": {
                        transform: "translateX(2rem)",
                    },
                },
                asset_39: {
                    "0%, 100%": {
                        transform: "scaleX(3)",
                    },
                    "50%": {
                        transform: "scaleY(2.7)",
                    },
                },
                asset_40: {
                    "0%, 100%": {
                        transform: "rotateZ(45deg)",
                    },
                    "50%": {
                        transform: "rotateX(45deg)",
                    },
                },
                asset_41: {
                    "0%, 100%": {
                        transform: "translateY(-3rem)",
                    },
                    "50%": {
                        transform: "translateX(3rem)",
                    },
                },
                asset_42: {
                    "0%, 100%": {
                        transform: "rotate(-20deg)",
                    },
                    "50%": {
                        transform: "rotate(40deg)",
                    },
                },
                asset_43: {
                    "0%, 100%": {
                        transform: "scale(1.5)",
                    },
                    "50%": {
                        transform: "rotateY(30deg)",
                    },
                },
                asset_44: {
                    "0%, 100%": {
                        transform: "translateX(-2rem)",
                    },
                    "50%": {
                        transform: "translateY(0.5rem)",
                    },
                },             
			},
			animation: {
                'caret-blink': 'caret-blink 1.25s ease-out infinite',
                'open-sidebar': 'open-sidebar 0.2s ease-out',
                'close-sidebar': 'close-sidebar 0.2s ease-out',
                'fade-in': 'fade-in 0.2s ease-out',
				"glass-square-move": "glass-square-move 10s linear infinite",
                "accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
                "automation-zoom-in": "automation-zoom-in 0.5s",
                "social-glass": "social_glass 0.5s",
                "social-glass0": "social_glass0",
                "initial-page-load":
                    "initial_page_load 1000ms ease-in-out infinite",
                move: "move 5s linear infinite",
                move1: "move1 5s linear infinite",
                squaremove: "squaremove 10s linear infinite",
                breath1: "breath_1 7s ease-out infinite",
                breath2: "breath_2 7s ease-out infinite",
                breath3: "breath_3 7s ease-out infinite",
                breath4: "breath_4 7s ease-out infinite",
                breath5: "breath_5 7s ease-out infinite",
                breath6: "breath_6 7s ease-out infinite",
                asset1: "asset_1 0s ease-out infinite",
                asset2: "asset_2 0s ease-out infinite",
                asset3: "asset_3 0s ease-out infinite",
                asset4: "asset_4 0s ease-out infinite",
                asset5: "asset_5 0s ease-out infinite",
                asset6: "asset_6 0s ease-out infinite",
                asset7: "asset_7 0s ease-out infinite",
                asset8: "asset_8 0s ease-out infinite",
                asset9: "asset_9 0s ease-out infinite",
                asset10: "asset_10 0s ease-out infinite",
                asset11: "asset_11 0s ease-out infinite",
                asset12: "asset_12 0s ease-out infinite",
                asset13: "asset_13 0s ease-out infinite",
                asset14: "asset_14 0s ease-out infinite",
                asset15: "asset_15 0s ease-out infinite",
                asset16: "asset_16 0s ease-out infinite",
                asset17: "asset_17 0s ease-out infinite",
                asset18: "asset_18 0s ease-out infinite",
                asset19: "asset_19 0s ease-out infinite",
                asset20: "asset_20 0s ease-out infinite",
                asset21: "asset_21 0s ease-out infinite",
                asset22: "asset_22 0s ease-out infinite",
                asset23: "asset_23 0s ease-out infinite",
                asset24: "asset_24 0s ease-out infinite",
                asset25: "asset_25 0s ease-out infinite",
                asset26: "asset_26 0s ease-out infinite",
                asset27: "asset_27 0s ease-out infinite",
                asset28: "asset_28 0s ease-out infinite",
                asset29: "asset_29 0s ease-out infinite",
                asset30: "asset_30 0s ease-out infinite",
                asset31: "asset_31 0s ease-out infinite",
                asset32: "asset_32 0s ease-out infinite",
                asset33: "asset_33 0s ease-out infinite",
                asset34: "asset_34 0s ease-out infinite",
                asset35: "asset_35 0s ease-out infinite",
                asset36: "asset_36 0s ease-out infinite",
                asset37: "asset_37 0s ease-out infinite",
                asset38: "asset_38 0s ease-out infinite",
                asset39: "asset_39 0s ease-out infinite",
                asset40: "asset_40 0s ease-out infinite",
                asset41: "asset_41 0s ease-out infinite",
                asset42: "asset_42 0s ease-out infinite",
                asset43: "asset_43 0s ease-out infinite",
                asset44: "asset_44 0s ease-out infinite",
			},
            backgroundSize: {
                "size-200": "200% 200%",
            },
            backgroundPosition: {
                "pos-0": "0% 0%",
                "pos-25": "0% 100%",
                "pos-75": "100% 0%",
                "pos-100": "100% 100%",
            },
            gridTemplateRows: {
                8: "repeat(8, minmax(0,1fr))",
                layout: "15em minmax(60em, 1fr) 20em",
                designMixHorizontal: "repeat(11, minmax(0, 1fr))",
            },
			gridTemplateColumns: {
				mobile: "repeat(4, minmax(0, 1fr))",
				mobile_medium: "repeat(6, minmax(0, 1fr))",
				desktop: "repeat(11, minmax(0, 1fr))",
				onboarding_form: "repeat(auto-fit, minmax(10em, 1fr))",
				onboarding_form_bigger:
					"repeat(auto-fit, minmax(15.625em, 1fr))",
				svg_grid: "repeat(3, 1fr)",
			},
		},
	},
    safelist: [
        {
            pattern:
                /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ["hover", "ui-selected"],
        },
        {
            pattern:
                /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern:
                /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
    ],
	variants: {
		extend: {
			boxShadow: ["active", "hover"],
			transform: ["hover"],
			rotate: ["hover"],
			scale: ["hover"],
			translate: ["hover"],
			background: ["hover", "active", "nth-child"],
			top: ["nth-child"],
			bottom: ["nth-child"],
			left: ["nth-child"],
			right: ["nth-child"],
			width: ["nth-child"],
			height: ["nth-child"],
			backgroundColor: ["checked", "nth-child"],
			strokeWidth: ["nth-child", "first"],
			strokeColor: ["nth-child", "first"],
			fillColor: ["nth-child", "first"],
			fill: ["nth-child", "first"],
			typography: ["dark"],
			padding: {
				xs: "6em",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin.nthChild(),
		require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        daisyui
	],
};
export default withUt(config);
