'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type ApplicationFormContextValue = {
  isOpen: boolean;
  plan: string | undefined;
  openForm: (plan?: string) => void;
  closeForm: () => void;
};

const ApplicationFormContext =
  createContext<ApplicationFormContextValue | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<string | undefined>();

  const openForm = useCallback((nextPlan?: string) => {
    setPlan(nextPlan);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    setPlan(undefined);
  }, []);

  return (
    <ApplicationFormContext.Provider
      value={{ isOpen, plan, openForm, closeForm }}
    >
      {children}
    </ApplicationFormContext.Provider>
  );
}

export function useApplicationForm() {
  const ctx = useContext(ApplicationFormContext);
  if (!ctx) {
    throw new Error('useApplicationForm must be used within FormProvider');
  }
  return ctx;
}
