import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/server/cn';
import { Button } from '@/react/button';
import { PrimitiveInput, type PrimitiveInputProps } from '@/react/input';

/* -----------------------------------------------------------------------------
 * Component: InputPassword
 * -------------------------------------------------------------------------- */

export type InputPasswordProps = Omit<PrimitiveInputProps, 'type'>;
export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({ className, ...props }, forwardedRef) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const type = showPassword ? 'text' : 'password';
  const toggleShowPassword = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn('relative', props.inline && 'inline-block')}>
      <PrimitiveInput
        className={cn('pr-10.5', className)}
        ref={forwardedRef}
        type={type}
        {...props}
      />
      <Button
        className="right-1.25 absolute top-1/2 -translate-y-1/2 rounded-full"
        disabled={props.disabled}
        onClick={toggleShowPassword}
        size="sm"
        startIcon={
          type === 'password' ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />
        }
        variant="ghost"
      />
    </div>
  );
});
InputPassword.displayName = 'InputPassword';
