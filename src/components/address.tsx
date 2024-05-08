'use client'

import React, { type ReactNode, useRef, useState } from "react";

export function Address (): ReactNode {
  const companyRef = useRef(document.createElement('input'));
  const address1Ref = useRef(document.createElement('input'));
  const address2Ref = useRef(document.createElement('input'));
  const cityRef = useRef(document.createElement('input'));
  const stateRef = useRef(document.createElement('input'));
  const postalCodeRef = useRef(document.createElement('input'));
  const countryRef = useRef(document.createElement('input'));
  const phoneRef = useRef(document.createElement('input'));

  return (
    <>
      <h2>Billing Address</h2>
      <div className="grid grid-cols-2 gap-1 w-1/3">
        <input className="col-span-2" ref={companyRef} name="company" placeholder="Company Name" />
        <input ref={address1Ref} name="address1" data-recurly="address1" placeholder="Address Line 1" />
        <input ref={address2Ref} name="address2" data-recurly="address2" placeholder="Address Line 2" />
        <input ref={cityRef} name="city" data-recurly="city" placeholder="City" />
        <input ref={stateRef} name="state" data-recurly="state" placeholder="State" />
        <input ref={postalCodeRef} name="postalCode" data-recurly="postal_code" placeholder="Postal Code" />
        <input ref={countryRef} name="country" data-recurly="country" placeholder="Country" />
        <input ref={phoneRef} name="phone" data-recurly="phone" placeholder="Phone Number" />
      </div>
    </>
  );
}
