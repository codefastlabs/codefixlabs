import type { StoreApi, UseBoundStore } from 'zustand';
import { create } from 'zustand';

type ModalType = string;

export interface UseModal<T> {
  actions: {
    onClose: () => void;
    onOpen: (data?: T) => void;
  };
  isOpen: boolean;
  data?: T;
}

type ModalStore<T> = UseBoundStore<StoreApi<UseModal<T>>>;

const stores: Map<ModalType, ModalStore<unknown>> = new Map<
  ModalType,
  ModalStore<unknown>
>();

function getModalStore<T>(type: ModalType): ModalStore<T> | undefined {
  return stores.get(type) as ModalStore<T> | undefined;
}

function setModalStore<T>(
  type: ModalType,
  store: ModalStore<T>,
): ModalStore<T> {
  stores.set(type, store as ModalStore<unknown>);

  return store;
}

function createModalStore<T>(): ModalStore<T> {
  return create<UseModal<T>>((set) => ({
    actions: {
      onClose: () => {
        set({ isOpen: false });
      },
      onOpen: (data) => {
        set({ data, isOpen: true });
      },
    },
    data: undefined,
    isOpen: false,
  }));
}

export function useModalActions<T>(type: ModalType): UseModal<T>['actions'] {
  let store = getModalStore<T>(type);

  if (!store) {
    store = setModalStore<T>(type, createModalStore<T>());
  }

  return store((state) => state.actions);
}

export function useModalOpen<T>(type: ModalType): UseModal<T>['isOpen'] {
  let store = getModalStore<T>(type);

  if (!store) {
    store = setModalStore(type, createModalStore<T>());
  }

  return store((state) => state.isOpen);
}

export function useModalData<T>(type: ModalType): T | undefined {
  let store = getModalStore<T>(type);

  if (!store) {
    store = setModalStore<T>(type, createModalStore<T>());
  }

  return store((state) => state.data);
}

export function switchModal<T>(
  currentType: ModalType,
  targetType: ModalType,
): void {
  const currentStore = getModalStore<T>(currentType);
  const targetStore = getModalStore<T>(targetType);

  if (currentStore && targetStore) {
    currentStore.setState({ isOpen: false });
    targetStore.setState({ isOpen: true });
  } else if (!targetStore) {
    const newStore = createModalStore<T>();
    setModalStore<T>(targetType, newStore);
    newStore.setState({ isOpen: true });
  }
}
