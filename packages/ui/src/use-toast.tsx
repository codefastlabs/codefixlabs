'use client';

import type * as React from 'react';
import { useEffect, useState } from 'react';
import type { Toast, ToastAction } from '@/toast';

const TOAST_LIMIT = 20;
const TOAST_EXPIRE_DISMISS_DELAY = 1000;

type ToasterToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  action?: React.ReactElement<typeof ToastAction>;
  id: string;
  description?: React.ReactNode;
  title?: React.ReactNode;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
} as const;

let count = 0;

function generateId(): string {
  count = (count + 1) % Number.MAX_VALUE;

  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      toast: Partial<ToasterToastProps>;
      type: ActionType['UPDATE_TOAST'];
    }
  | {
      toast: ToasterToastProps;
      type: ActionType['ADD_TOAST'];
    }
  | {
      toastId?: ToasterToastProps['id'];
      type: ActionType['DISMISS_TOAST'];
    }
  | {
      toastId?: ToasterToastProps['id'];
      type: ActionType['REMOVE_TOAST'];
    };

interface ToastsState {
  toasts: ToasterToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string): void {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      toastId,
      type: 'REMOVE_TOAST',
    });
  }, TOAST_EXPIRE_DISMISS_DELAY);

  toastTimeouts.set(toastId, timeout);
}

const reducer = (state: ToastsState, action: Action): ToastsState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach(({ id }) => {
          addToRemoveQueue(id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t,
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: ((state: ToastsState) => void)[] = [];

let memoryState: ToastsState = { toasts: [] };

function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/* -----------------------------------------------------------------------------
 * Utility: Toast
 * -------------------------------------------------------------------------- */

interface ToastOptions {
  id: string;
  dismiss: () => void;
  update: (notify: ToasterToastProps) => void;
}

export function toast(props: Omit<ToasterToastProps, 'id'>): ToastOptions {
  const id = generateId();

  function update(notify: ToasterToastProps): void {
    dispatch({ toast: { ...notify, id }, type: 'UPDATE_TOAST' });
  }

  const dismiss = (): void => {
    dispatch({ toastId: id, type: 'DISMISS_TOAST' });
  };

  dispatch({
    toast: {
      ...props,
      id,
      onOpenChange: (open) => {
        !open && dismiss();
      },
      open: true,
    },
    type: 'ADD_TOAST',
  });

  return {
    dismiss,
    id,
    update,
  };
}

/* -----------------------------------------------------------------------------
 * Hook: useToast
 * -------------------------------------------------------------------------- */

export const useToast = (): {
  toasts: ToasterToastProps[];
  toast: (props: Omit<ToasterToastProps, 'id'>) => ToastOptions;
  dismiss: (toastId?: string) => void;
} => {
  const [state, setState] = useState<ToastsState>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    dismiss: (toastId?: string) => {
      dispatch({ toastId, type: 'DISMISS_TOAST' });
    },
    toast,
  };
};
