'use client'

import { useRecurly } from '@recurly/react-recurly';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useConfigurationContext } from './configuration-context';
import { RecurlyError, TokenPayload } from '@recurly/recurly-js';


export function Venmo() {
  const recurly = useRecurly();
  const formRef = useRef(document.createElement('form'));
  const [form, setForm] = useState(formRef.current);
  const setFormRef = (ref: HTMLFormElement) => setForm(ref);

  const { braintreeAuth } = useConfigurationContext();

  const venmo = useMemo(() => recurly.Venmo({
      braintree: { clientAuthorization: braintreeAuth },
      form: form,
    }), [recurly, form, braintreeAuth]);

  const handleSubmit = (event) => {
    if (event.preventDefault) event.preventDefault();
    venmo.start();
  };

  useEffect(() => {
    venmo.on('error', (err: RecurlyError) => console.log('ERROR', err.message, err));
    venmo.on('token', (token: TokenPayload) => console.log('TOKEN', token));
  }, [venmo])


  return (
    <form onSubmit={handleSubmit} ref={setFormRef}>
      <input className="text-slate-600" type="text" data-recurly="first_name" placeholder="First name" />
      <input className="text-slate-600" type="text" data-recurly="last_name" placeholder="Last name" />
      { venmo && <button>Pay with Venmo</button> }
    </form>
  );
}
