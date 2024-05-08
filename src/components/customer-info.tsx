'use client'

import React, { type ReactNode, useRef, useState } from "react";

export function CustomerInfo (): ReactNode {
  const firstNameRef = useRef(document.createElement('input'));
  const lastNameRef = useRef(document.createElement('input'));

  return (
    <>
      <h2>Customer Info</h2>
      <div className="grid grid-cols-2 gap-1 w-1/3">
        <input ref={firstNameRef} name="first-name" data-recurly="first_name" placeholder="First Name" />
        <input ref={lastNameRef} name="last-name" data-recurly="last_name" placeholder="Last Name" />
      </div>
    </>
  );
}
