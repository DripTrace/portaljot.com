declare module "digitalocean" {
	interface Account {
		droplet_limit: number;
		floating_ip_limit: number;
		volume_limit: number;
		email: string;
		uuid: string;
		email_verified: boolean;
		status: string;
		status_message: string;
	}

	interface Client {
		account: {
			get(): Promise<Account>;
		};
		// Add other resources as needed
	}

	function client(token: string): Client;

	export = { client };
}
