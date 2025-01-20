"use client";

import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useStripeConnect } from "@/hooks/payment";
import { useEffect } from "react";

type StripeConnectProps = {
  connected: boolean;
  groupid: string;
};

export const StripeConnect = ({ connected, groupid }: StripeConnectProps) => {
  console.log(
    "STRIPE DETAILS CONNECTED:[INTEGRATIONS/_COMP_CONNECT/INDEX]: ",
    connected,
    "\n[GID]: ",
    groupid,
  );
  const { onStripeConnect, onStripeAccountPending } = useStripeConnect(groupid);

  useEffect(() => {
    // console.log("THE STRIPE DETAILS[CONNECTINDEX]: ", onStripeConnect)
  }, []);
  return (
    <Button disabled={connected} onClick={onStripeConnect}>
      <Loader loading={onStripeAccountPending}>
        {connected ? "Connected" : "Connect to stripe"}
      </Loader>
    </Button>
  );
};
