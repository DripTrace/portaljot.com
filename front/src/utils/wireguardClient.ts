// export const wgConfigContent = `
// [Interface]
// Address = 10.255.254.60
// PrivateKey = mH7XnlGTCPyi1uI2DqJzaszdB+j7IVFrKpF7TnjqGXw=
// ListenPort = 51820
// DNS = 10.255.254.36,10.255.254.37,9.9.9.9

// [Peer]
// PublicKey = B5jalZ6kj+df0xC1087IO+s0GK8LWbBnWvGmkH/X5zg=
// PresharedKey = QFCa0X3gpiVB/IaoRKKFEw13wQOoVvwmYTPBWQuxe8w=
// Endpoint = 172.233.156.176:51820
// AllowedIPs = 10.255.254.0/25,192.168.255.128/25,10.255.255.128/25,192.168.254.0/24,192.168.4.0/24,192.168.1.0/24
// `;

export const wgConfigContent = `
[Interface]
Address = ${process.env.WIREGUARD_ADDRESS}
PrivateKey = ${process.env.WIREGUARD_PRIVATE_KEY}
ListenPort = ${process.env.WIREGUARD_LISTEN_PORT}
DNS = ${process.env.WIREGUARD_DNS}

[Peer]
PublicKey = ${process.env.WIREGUARD_PUBLIC_KEY}
PresharedKey = ${process.env.WIREGUARD_PRE_SHARED_KEY}
Endpoint = ${process.env.WIREGUARD_SERVER_ENDPOINT}:${process.env.WIREGUARD_LISTEN_PORT}
AllowedIPs = ${process.env.WIREGUARD_ALLOWED_IPS}
PersistentKeepalive = ${process.env.WIREGUARD_PERSISTENT_KEEPALIVE}
`;
