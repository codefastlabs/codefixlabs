import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import { em } from '@/lib';

export const sharedConfig: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@codefixlabs/ui/dist/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  plugins: [
    typography,
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
  theme: {
    extend: {
      animation: {
        'collapsible-down':
          'collapsible-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'collapsible-up': 'collapsible-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        'content-hide': 'content-hide 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'content-show': 'content-show 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'drawer-hide-to-left':
          'drawer-hide-to-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'drawer-hide-to-right':
          'drawer-hide-to-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'drawer-show-from-left':
          'drawer-show-from-left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'drawer-show-from-right':
          'drawer-show-from-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'enter-from-left': 'enter-from-left 300ms ease',
        'enter-from-right': 'enter-from-right 300ms ease',
        'exit-to-left': 'exit-to-left 300ms ease',
        'exit-to-right': 'exit-to-right 300ms ease',
        'fade-in': 'fade-in 200ms ease',
        'fade-out': 'fade-out 200ms ease',
        'overlay-hide':
          'overlay-hide 300ms cubic-bezier(0.645, 0.045, 0.355, 1)',
        'overlay-show':
          'overlay-show 300ms cubic-bezier(0.645, 0.045, 0.355, 1)',
        'scale-in': 'scale-in 200ms ease',
        'scale-out': 'scale-out 200ms ease',
        'slide-in-down': 'slide-in-down 300ms cubic-bezier(0.21, 1.02, 0.73,1)',
        'slide-in-from-bottom':
          'slide-in-from-bottom 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-left':
          'slide-in-from-left 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-right':
          'slide-in-from-right 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-from-top':
          'slide-in-from-top 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slide-in-left 300ms cubic-bezier(0.21, 1.02, 0.73,1)',
        'slide-in-right':
          'slide-in-right 300ms cubic-bezier(0.21, 1.02, 0.73,1)',
        'slide-in-up': 'slide-in-up 300ms cubic-bezier(0.21, 1.02, 0.73,1)',
        'slide-out-down':
          'slide-out-down 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'slide-out-left':
          'slide-out-left 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'slide-out-right':
          'slide-out-right 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'slide-out-to-bottom':
          'slide-out-to-bottom 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-to-left':
          'slide-out-to-left 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-to-right':
          'slide-out-to-right 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-to-top':
          'slide-out-to-top 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-up': 'slide-out-up 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'swipe-out-down':
          'swipe-out-down 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'swipe-out-left':
          'swipe-out-left 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'swipe-out-right':
          'swipe-out-right 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
        'swipe-out-up': 'swipe-out-up 300ms cubic-bezier(0.06, 0.71, 0.55, 1)',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--ui-border))',
      },
      borderRadius: {
        '2xl': 'calc(var(--ui-radius) + 0.5rem)',
        '3xl': 'calc(var(--ui-radius) + 1rem)' /* 2px */,
        DEFAULT: 'calc(var(--ui-radius) - 0.25rem)' /* 4px */,
        inherit: 'inherit' /* 6px */,
        lg: 'var(--ui-radius)' /* 8px */,
        md: 'calc(var(--ui-radius) - 0.125rem)' /* 12px */,
        sm: 'calc(var(--ui-radius) - 0.375rem)' /* 16px */,
        xl: 'calc(var(--ui-radius) + 0.25rem)' /* 24px */,
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--ui-accent))',
          foreground: 'hsl(var(--ui-accent-foreground))',
        },
        background: 'hsl(var(--ui-background))',
        border: 'hsl(var(--ui-border))',
        card: {
          DEFAULT: 'hsl(var(--ui-card))',
          foreground: 'hsl(var(--ui-card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--ui-destructive))',
          foreground: 'hsl(var(--ui-destructive-foreground))',
        },
        foreground: 'hsl(var(--ui-foreground))',
        info: {
          DEFAULT: 'hsl(var(--ui-info))',
          foreground: 'hsl(var(--ui-info-foreground))',
        },
        input: 'hsl(var(--ui-input))',
        muted: {
          DEFAULT: 'hsl(var(--ui-muted))',
          foreground: 'hsl(var(--ui-muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--ui-popover))',
          foreground: 'hsl(var(--ui-popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--ui-primary))',
          foreground: 'hsl(var(--ui-primary-foreground))',
        },
        ring: 'hsl(var(--ui-ring))',
        secondary: {
          DEFAULT: 'hsl(var(--ui-secondary))',
          foreground: 'hsl(var(--ui-secondary-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--ui-success))',
          foreground: 'hsl(var(--ui-success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--ui-warning))',
          foreground: 'hsl(var(--ui-warning-foreground))',
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      data: {
        'align-center': 'align="center"',
        'align-end': 'align="end"',
        'align-start': 'align="start"',
        disabled: 'disabled',
        highlighted: 'highlighted',
        invalid: 'invalid="true"',
        'motion-from-end': 'motion="from-end"',
        'motion-from-start': 'motion="from-start"',
        'motion-to-end': 'motion="to-end"',
        'motion-to-start': 'motion="to-start"',
        'orientation-horizontal': 'orientation="horizontal"',
        'orientation-vertical': 'orientation="vertical"',
        placeholder: 'placeholder',
        selected: 'selected',
        'side-bottom': 'side="bottom"',
        'side-left': 'side="left"',
        'side-right': 'side="right"',
        'side-top': 'side="top"',
        'state-active': 'state="active"',
        'state-checked': 'state="checked"',
        'state-closed': 'state="closed"',
        'state-delayed-open': 'state="delayed-open"',
        'state-hidden': 'state="hidden"',
        'state-inactive': 'state="inactive"',
        'state-indeterminate': 'state="indeterminate"',
        'state-off': 'state="off"',
        'state-on': 'state="on"',
        'state-open': 'state="open"',
        'state-selected': 'state="selected"',
        'state-unchecked': 'state="unchecked"',
        'state-visible': 'state="visible"',
        'swipe-cancel': 'swipe="cancel"',
        'swipe-direction-down': 'swipe-direction="down"',
        'swipe-direction-left': 'swipe-direction="left"',
        'swipe-direction-right': 'swipe-direction="right"',
        'swipe-direction-up': 'swipe-direction="up"',
        'swipe-end': 'swipe="end"',
        'swipe-move': 'swipe="move"',
        'swipe-start': 'swipe="start"',
        valid: 'valid="true"',
      },
      fontFamily: {
        sans: [`var(--font-sans, ${fontFamily.sans.join(', ')})`],
      },
      height: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- fix later
        // @ts-expect-error
        screen: ['100vh', '100dvh'],
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        'content-hide': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-40px)' },
        },
        'content-show': {
          from: { opacity: '0', transform: 'translateY(-40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'drawer-hide-to-left': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-100%)' },
        },
        'drawer-hide-to-right': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(100%)' },
        },
        'drawer-show-from-left': {
          from: { opacity: '0', transform: 'translateX(-100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'drawer-show-from-right': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'enter-from-left': {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'enter-from-right': {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'exit-to-left': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' },
        },
        'exit-to-right': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'overlay-hide': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'overlay-show': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg)' },
        },
        'scale-out': {
          from: { opacity: '1', transform: 'rotateX(0deg)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' },
        },
        'slide-in-down': {
          from: {
            opacity: '0',
            transform: 'translateY(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { opacity: '0', transform: 'translateY(-0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { opacity: '0', transform: 'translateX(0.5rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { opacity: '0', transform: 'translateX(-0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-top': {
          from: { opacity: '0', transform: 'translateY(0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: {
            opacity: '0',
            transform: 'translateX(calc(-100% - var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: {
            opacity: '0',
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(calc(-100% - var(--viewport-padding)))',
          },
          to: { transform: 'translateY(0)' },
        },
        'slide-out-down': {
          from: { transform: 'translateY(0)' },
          to: {
            opacity: '0',
            transform: 'translateY(calc(100% + var(--viewport-padding)))',
          },
        },
        'slide-out-left': {
          from: { transform: 'translateX(0)' },
          to: {
            opacity: '0',
            transform: 'translateX(calc(-100% - var(--viewport-padding)))',
          },
        },
        'slide-out-right': {
          from: { transform: 'translateX(0)' },
          to: {
            opacity: '0',
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
        },
        'slide-out-to-bottom': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(-0.5rem)' },
        },
        'slide-out-to-left': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(0.5rem)' },
        },
        'slide-out-to-right': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-0.5rem)' },
        },
        'slide-out-to-top': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { opacity: '0', transform: 'translateY(0.5rem)' },
        },
        'slide-out-up': {
          from: { transform: 'translateY(0)' },
          to: {
            opacity: '0',
            transform: 'translateY(calc(-100% - var(--viewport-padding)))',
          },
        },
        'swipe-out-down': {
          from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          to: {
            opacity: '0',
            transform: 'translateY(calc(100% + var(--viewport-padding)))',
          },
        },
        'swipe-out-left': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: {
            opacity: '0',
            transform: 'translateX(calc(-100% - var(--viewport-padding)))',
          },
        },
        'swipe-out-right': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: {
            opacity: '0',
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
        },
        'swipe-out-up': {
          from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          to: {
            opacity: '0',
            transform: 'translateY(calc(-100% - var(--viewport-padding)))',
          },
        },
      },
      maxHeight: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- fix later
        // @ts-expect-error
        screen: ['100vh', '100dvh'],
      },
      minHeight: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- fix later
        // @ts-expect-error
        screen: ['100vh', '100dvh'],
      },
      spacing: {
        0.75: '0.1875rem' /* 3px */,
        1.25: '0.3125rem' /* 5px */,
        1.75: '0.4375rem' /* 7px */,
        2.25: '0.5625rem' /* 9px */,
        2.75: '0.6875rem' /* 11px */,
        3.25: '0.8125rem' /* 13px */,
        3.75: '0.9375rem' /* 15px */,
        4.25: '1.0625rem' /* 17px */,
        4.5: '1.125rem' /* 18px */,
        4.75: '1.1875rem' /* 19px */,
        5.25: '1.3125rem' /* 21px */,
        5.5: '1.375rem' /* 22px */,
        5.75: '1.4375rem' /* 23px */,
        6.25: '1.5625rem' /* 25px */,
        6.5: '1.625rem' /* 26px */,
        6.75: '1.6875rem' /* 27px */,
        7.25: '1.8125rem' /* 29px */,
        7.5: '1.875rem' /* 30px */,
        7.75: '1.9375rem' /* 31px */,
        8.25: '2.0625rem' /* 33px */,
        8.5: '2.125rem' /* 34px */,
        8.75: '2.1875rem' /* 35px */,
        9.25: '2.3125rem' /* 37px */,
        9.5: '2.375rem' /* 38px */,
        9.75: '2.4375rem' /* 39px */,
        10.25: '2.5625rem' /* 41px */,
        10.5: '2.625rem' /* 42px */,
        10.75: '2.6875rem' /* 43px */,
        11.25: '2.8125rem' /* 45px */,
        11.5: '2.875rem' /* 46px */,
        11.75: '2.9375rem' /* 47px */,
        12.25: '3.0625rem' /* 49px */,
        12.5: '3.125rem' /* 50px */,
        12.75: '3.1875rem' /* 51px */,
        13.25: '3.3125rem' /* 53px */,
        13.5: '3.375rem' /* 54px */,
        13.75: '3.4375rem' /* 55px */,
        14.25: '3.5625rem' /* 57px */,
        14.5: '3.625rem' /* 58px */,
        14.75: '3.6875rem' /* 59px */,
        15: '3.75rem' /* 60px */,
        15.25: '3.8125rem' /* 61px */,
        15.5: '3.875rem' /* 62px */,
        15.75: '3.9375rem' /* 63px */,
        16.25: '4.0625rem' /* 65px */,
        16.5: '4.125rem' /* 66px */,
        16.75: '4.1875rem' /* 67px */,
        17.25: '4.3125rem' /* 69px */,
        17.5: '4.375rem' /* 70px */,
        17.75: '4.4375rem' /* 71px */,
        18: '4.5rem' /* 72px */,
        18.25: '4.5625rem' /* 73px */,
        18.5: '4.625rem' /* 74px */,
        18.75: '4.6875rem' /* 75px */,
        19.25: '4.8125rem' /* 77px */,
        19.5: '4.875rem' /* 78px */,
        19.75: '4.9375rem' /* 79px */,
      },
      transformOrigin: {
        'top-center': 'top center',
      },
      typography: () => {
        const css = {
          'td p, th p': {
            marginTop: '0',
            marginBottom: '0',
          },
          'tbody tr th:first-child': {
            paddingLeft: '0',
          },
          'tbody tr th:last-child': {
            paddingRight: '0',
          },
        };

        return {
          sm: {
            css: [
              {
                'tbody tr th': {
                  paddingRight: em(12, 12),
                  paddingBottom: em(8, 12),
                  paddingLeft: em(12, 12),
                },
              },
              css,
            ],
          },
          base: {
            css: [
              {
                'tbody tr th': {
                  paddingRight: em(8, 14),
                  paddingBottom: em(8, 14),
                  paddingLeft: em(8, 14),
                },
              },
              css,
            ],
          },
          lg: {
            css: [
              {
                'tbody tr th': {
                  paddingRight: em(12, 16),
                  paddingBottom: em(12, 16),
                  paddingLeft: em(12, 16),
                },
              },
              css,
            ],
          },
          xl: {
            css: [
              {
                'tbody tr th': {
                  paddingRight: em(12, 18),
                  paddingBottom: em(16, 18),
                  paddingLeft: em(12, 18),
                },
              },
              css,
            ],
          },
          '2xl': {
            css: [
              {
                'tbody tr th': {
                  paddingRight: em(12, 20),
                  paddingBottom: em(16, 20),
                  paddingLeft: em(12, 20),
                },
              },
              css,
            ],
          },
        };
      },
    },
  },
};
