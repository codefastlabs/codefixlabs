import plugin from 'tailwindcss/plugin';
import colors from 'tailwindcss/colors';
import { hexToHsl } from '@/lib/utils';

export const slate = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--ui-accent': hexToHsl(colors.slate[100]),
      '--ui-accent-foreground': hexToHsl(colors.slate[900]),

      '--ui-background': hexToHsl(colors.white),
      '--ui-border': hexToHsl(colors.slate[200]),

      '--ui-card': hexToHsl(colors.white),
      '--ui-card-foreground': hexToHsl(colors.slate[900]),

      '--ui-destructive': hexToHsl(colors.red[500]),
      '--ui-destructive-foreground': hexToHsl(colors.slate[100]),

      '--ui-foreground': hexToHsl(colors.slate[900]),
      '--ui-info': hexToHsl(colors.blue[500]),

      '--ui-info-foreground': hexToHsl(colors.slate[100]),
      '--ui-input': hexToHsl(colors.slate[200]),

      '--ui-muted': hexToHsl(colors.slate[100]),
      '--ui-muted-foreground': hexToHsl(colors.slate[500]),

      '--ui-popover': hexToHsl(colors.white),
      '--ui-popover-foreground': hexToHsl(colors.slate[900]),

      '--ui-primary': hexToHsl(colors.sky[500]),
      '--ui-primary-foreground': hexToHsl(colors.slate[100]),

      '--ui-radius': '0.5rem',

      '--ui-ring': hexToHsl(colors.sky[500]),

      '--ui-secondary': hexToHsl(colors.slate[100]),
      '--ui-secondary-foreground': hexToHsl(colors.slate[900]),

      '--ui-success': hexToHsl(colors.green[500]),
      '--ui-success-foreground': hexToHsl(colors.slate[100]),

      '--ui-warning': hexToHsl(colors.yellow[500]),
      '--ui-warning-foreground': hexToHsl(colors.slate[100]),
    },
  });
  addBase({
    '.dark': {
      '--ui-accent': hexToHsl(colors.slate[900]),
      '--ui-accent-foreground': hexToHsl(colors.slate[100]),

      '--ui-background': hexToHsl(colors.black),
      '--ui-border': hexToHsl(colors.slate[800]),

      '--ui-card': hexToHsl(colors.black),
      '--ui-card-foreground': hexToHsl(colors.slate[100]),

      '--ui-destructive': hexToHsl(colors.red[500]),
      '--ui-destructive-foreground': hexToHsl(colors.slate[900]),

      '--ui-foreground': hexToHsl(colors.slate[100]),
      '--ui-info': hexToHsl(colors.blue[500]),

      '--ui-info-foreground': hexToHsl(colors.slate[900]),
      '--ui-input': hexToHsl(colors.slate[800]),

      '--ui-muted': hexToHsl(colors.slate[900]),
      '--ui-muted-foreground': hexToHsl(colors.slate[500]),

      '--ui-popover': hexToHsl(colors.black),
      '--ui-popover-foreground': hexToHsl(colors.slate[100]),

      '--ui-primary': hexToHsl(colors.sky[500]),
      '--ui-primary-foreground': hexToHsl(colors.slate[900]),

      '--ui-ring': hexToHsl(colors.sky[500]),

      '--ui-secondary': hexToHsl(colors.slate[900]),
      '--ui-secondary-foreground': hexToHsl(colors.slate[100]),

      '--ui-success': hexToHsl(colors.green[500]),
      '--ui-success-foreground': hexToHsl(colors.slate[900]),

      '--ui-warning': hexToHsl(colors.yellow[500]),
      '--ui-warning-foreground': hexToHsl(colors.slate[900]),
    },
  });
});
