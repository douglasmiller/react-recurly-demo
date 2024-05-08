'use client'

import { useRecurly } from "@recurly/react-recurly";
import React, { FormEvent, PropsWithChildren, type ReactNode, useRef } from "react";

export function PaymentForm ({ children }: PropsWithChildren): ReactNode {
  const formRef = useRef(document.createElement('form'));
  const recurly = useRecurly();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit');
    recurly.token(formRef.current, (err, token) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('token', token);
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
      <button>Submit</button>
    </form>
  );
}
