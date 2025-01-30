"use client";
import { useState } from "react";
import { toast } from "react-toastify";

declare global {
    interface Window {
        keplr: any;
    }
}

export const useKeplr = () => {
    const [address, setAddress] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [localAddress] = useState<string | null>(
        typeof window !== "undefined" ? localStorage.getItem("address") : null
    );
    const [localBalance] = useState<string | null>(
        typeof window !== "undefined" ? localStorage.getItem("balance") : null
    );
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);

    const connect = async () => {
        try {
            // const chainId = 'constantine-3';
            const chainId = "archway-1";
            await window.keplr.enable(chainId);

            const offlineSigner = window.keplr.getOfflineSigner(chainId);
            const accounts = await offlineSigner.getAccounts();
            const address = accounts[0].address;
            const rpcUrl = "https://rpc.mainnet.archway.io:443"; // Mainnet
            // const rpcUrl = chainId === 'constantine-3'
            //     ? 'https://rpc.constantine.archway.io:443' // Testnet
            //     : 'https://rpc.mainnet.archway.io:443'; // Mainnet

            const { SigningStargateClient } = require("@cosmjs/stargate");
            const client = await SigningStargateClient.connectWithSigner(
                rpcUrl,
                offlineSigner
            );
            //const rawBalance = await client.getBalance(address, 'aconst');
            const rawBalance = await client.getBalance(address, "aarch");
            const balance = BigInt(rawBalance.amount) / BigInt(10 ** 18);

            setAddress(address);
            setBalance(balance.toString());
            localStorage.setItem("address", address);
            localStorage.setItem("balance", balance.toString());
            setIsWalletConnected(true);
            toast.success("Wallet connected successfully");
            console.log(balance.toString() + " ARCH");
        } catch (error) {
            console.error("Error connecting to Keplr or fetching balance:");
            alert(
                "Error connecting to Keplr wallet or fetching balance. Please try again."
            );
        }
    };
    const disconnect = () => {
        setIsDisconnecting(true);
        setAddress(null);
        setBalance(null);
        localStorage.removeItem("address");
        localStorage.removeItem("balance");
        console.log("disconnect");
        setIsWalletConnected(false);
    };

    if (localAddress && !isWalletConnected && !isDisconnecting) {
        setAddress(localAddress);
        setBalance(localBalance);
        setIsWalletConnected(true);
    }

    //console.log(localStorage.getItem('address'));
    return {
        address,
        balance,
        connect,
        disconnect,
        isWalletConnected,
        setIsWalletConnected,
    };
};
