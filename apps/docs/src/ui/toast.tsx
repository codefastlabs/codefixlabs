'use client';

import * as React from 'react';
import { Button, toast } from '@codefixlabs/ui';
import { cn } from '@/lib/utils';

export default function Toast({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  return (
    <div className={cn(className)}>
      <Button
        onClick={() => {
          toast.success('Success');
        }}
      >
        Toast
      </Button>
    </div>
  );
}
