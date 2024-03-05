'use client'

import { useRecurly } from '@recurly/react-recurly';
import React, { useMemo, useRef } from 'react';
import { useConfigurationContext } from './configuration-context';


export function Venmo() {
  const recurly = useRecurly();
  const formRef = useRef(null);

  const { braintreeAuth } = useConfigurationContext();

  const venmo = useMemo(() => {
    return recurly.Venmo({
      braintree: { clientAuthorization: braintreeAuth },
      form: formRef.current
    });

  }, [recurly, formRef, braintreeAuth]);

  const handleSubmit = (event) => {
    if (event.preventDefault) event.preventDefault();
    venmo.start();
  };

  venmo.on('error', (err) => console.log('ERROR', err.message, err));
  venmo.on('token', (token) => console.log('TOKEN', token));

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input type="text" data-recurly="first_name" placeholder="First name" />
      <input type="text" data-recurly="last_name" placeholder="Last name" />
      <button>Pay with Venmo</button>
    </form>
  );
}
