'use client'

import React, { PropsWithChildren, type ReactNode} from "react";

export function PaymentMethods ({ children }: PropsWithChildren): ReactNode {

  return (
    <div>
      methods
      {children}
    </div>
  );
}
