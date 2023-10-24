import type * as React from 'react';

/* -----------------------------------------------------------------------------
 * Component: Icons
 * -------------------------------------------------------------------------- */

export type IconType =
  | React.FC<React.ComponentProps<'svg'>>
  | React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.ComponentPropsWithoutRef<'svg'>> &
        React.RefAttributes<React.ElementRef<'svg'>>
    >;
