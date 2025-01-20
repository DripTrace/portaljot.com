import { DeviceInfo } from "./types";

declare global {
	interface Navigator {
		connection: {
			downlink: number;
			effectiveType: string;
			rtt: number;
		};
	}
}

export interface Dimensions {
	width: number;
	height: number;
	fontSize: number;
	deviceInfo: DeviceInfo;
}

export interface WireGuardInterface {
	address: string[];
	privateKey: string;
	dns: string[];
	listenPort: number;
}

export interface WireGuardPeer {
	allowedIps: string[];
	publicKey: string;
	endpoint: string;
	preSharedKey: string;
}

export interface WireGuardConfig {
	wgInterface: WireGuardInterface;
	filePath: string;
	peers: WireGuardPeer[];
	preSharedKey: string | undefined;
	publicKey: string;
}

export interface TrueNASSystemInfo {
	version: string;
	buildtime: { $date: number };
	hostname: string;
	physmem: number;
	model: string;
	cores: number;
	physical_cores: number;
	loadavg: number[];
	uptime: string;
	uptime_seconds: number;
	system_serial: string;
	system_product: string;
	system_product_version: string;
	license: null;
	boottime: { $date: number };
	datetime: { $date: number };
	birthday: null;
	timezone: string;
	system_manufacturer: string;
	ecc_memory: boolean;
}

export interface TrueNASPool {
	id: number;
	name: string;
	guid: string;
	path: string;
	status: string;
	scan: {
		function: null;
		state: null;
		start_time: null;
		end_time: null;
		percentage: null;
		bytes_to_process: null;
		bytes_processed: null;
		bytes_issued: null;
		pause: null;
		errors: null;
		total_secs_left: null;
	};
	topology: {
		data: any[];
		log: any[];
		cache: any[];
		spare: any[];
		special: any[];
		dedup: any[];
	};
	healthy: boolean;
	warning: boolean;
	status_code: string;
	status_detail: null;
	size: number;
	allocated: number;
	free: number;
	freeing: number;
	fragmentation: string;
	size_str: string;
	allocated_str: string;
	free_str: string;
	freeing_str: string;
	autotrim: {
		value: string;
		rawvalue: string;
		parsed: string;
		source: string;
	};
}

export interface TrueNASConfig {
	systemInfo: TrueNASSystemInfo;
	pools: TrueNASPool[];
}

export interface AzureResource {
	id: string;
	name: string;
	type: string;
	location: string;
	tags: Record<string, string>;
	kind: string;
	sku: {
		name: string;
		tier: string;
	};
}

export interface GCPProject {
	labels: Record<string, string>;
	name: string;
	parent: string;
	projectId: string;
	state: string;
	displayName: string;
	createTime: { seconds: string; nanos: number };
	updateTime: null;
	deleteTime: null;
	etag: string;
}

export interface AWSInstance {
	AmiLaunchIndex: number;
	ImageId: string;
	InstanceId: string;
	InstanceType: string;
	KeyName: string;
	LaunchTime: Date;
	Monitoring: { State: string };
	Placement: {
		AvailabilityZone: string;
		GroupName: string;
		Tenancy: string;
	};
	PrivateDnsName: string;
	PrivateIpAddress: string;
	ProductCodes: any[];
	PublicDnsName: string;
	PublicIpAddress: string;
	State: { Code: number; Name: string };
	StateTransitionReason: string;
	SubnetId: string;
	VpcId: string;
	Architecture: string;
	BlockDeviceMappings: any[];
	ClientToken: string;
	EbsOptimized: boolean;
	EnaSupport: boolean;
	Hypervisor: string;
	NetworkInterfaces: any[];
	RootDeviceName: string;
	RootDeviceType: string;
	SecurityGroups: any[];
	SourceDestCheck: boolean;
	Tags: any[];
	VirtualizationType: string;
	CpuOptions: { CoreCount: number; ThreadsPerCore: number };
	CapacityReservationSpecification: { CapacityReservationPreference: string };
	HibernationOptions: { Configured: boolean };
	MetadataOptions: {
		State: string;
		HttpTokens: string;
		HttpPutResponseHopLimit: number;
		HttpEndpoint: string;
		HttpProtocolIpv6: string;
		InstanceMetadataTags: string;
	};
	EnclaveOptions: { Enabled: boolean };
	PlatformDetails: string;
	UsageOperation: string;
	UsageOperationUpdateTime: Date;
	PrivateDnsNameOptions: {
		HostnameType: string;
		EnableResourceNameDnsARecord: boolean;
		EnableResourceNameDnsAAAARecord: boolean;
	};
	MaintenanceOptions: { AutoRecovery: string };
	CurrentInstanceBootMode: string;
}

export interface AWSDomain {
	zone: {
		Id: string;
		Name: string;
		CallerReference: string;
		Config: { PrivateZone: boolean };
		ResourceRecordSetCount: number;
	};
	recordSets: any[];
}

export interface AWSConfig {
	hostedZones: any[];
	domains: AWSDomain[];
	ec2Instances: AWSInstance[];
}

export interface LinodeInstance {
	id: number;
	label: string;
	group: string;
	status: string;
	created: string;
	updated: string;
	type: string;
	ipv4: string[];
	ipv6: string;
	image: string;
	region: string;
	site_type: string;
	specs: any;
	alerts: any;
	backups: any;
	hypervisor: string;
	watchdog_enabled: boolean;
	tags: string[];
	host_uuid: string;
	has_user_data: boolean;
	placement_group: null;
	disk_encryption: string;
	lke_cluster_id: null;
}

export interface VultrInstance {
	id: string;
	label: string;
	os: string;
	region: string;
}

export interface DigitalOceanAccount {
	droplet_limit: number;
	floating_ip_limit: number;
	reserved_ip_limit: number;
	volume_limit: number;
	email: string;
	name: string;
	uuid: string;
	email_verified: boolean;
	status: string;
	status_message: string;
	team: {
		uuid: string;
		name: string;
	};
}

export interface DigitalOceanDroplet {
	id: number;
	name: string;
	memory: number;
	vcpus: number;
	disk: number;
	locked: boolean;
	status: string;
	kernel: null;
	created_at: string;
	features: string[];
	backup_ids: any[];
	next_backup_window: null;
	snapshot_ids: any[];
	image: {
		id: number;
		name: string;
		distribution: string;
		slug: null;
		public: boolean;
		regions: any[];
		created_at: string;
		min_disk_size: number;
		type: string;
		size_gigabytes: number;
		description: string;
		tags: any[];
		status: string;
	};
	volume_ids: any[];
	size: {
		slug: string;
		memory: number;
		vcpus: number;
		disk: number;
		transfer: number;
		price_monthly: number;
		price_hourly: number;
		regions: string[];
		available: boolean;
		description: string;
		networking_througput: number;
	};
	size_slug: string;
	networks: {
		v4: any[];
		v6: any[];
	};
	region: {
		name: string;
		slug: string;
		features: string[];
		available: boolean;
		sizes: string[];
	};
	tags: string[];
	vpc_uuid: string;
}

export interface DigitalOceanConfig {
	account: DigitalOceanAccount;
	droplets: DigitalOceanDroplet[];
}

export interface ProxmoxNode {
	status: string;
	type: string;
	level: string;
	ssl_fingerprint: string;
	id: string;
	node: string;
}

export interface CloudDataComplete {
	wireguard: WireGuardConfig;
	truenas: TrueNASConfig;
	azure: AzureResource[];
	gcp: GCPProject[];
	aws: AWSConfig;
	linode: {
		data: LinodeInstance[];
		page: number;
		pages: number;
		results: number;
	};
	vultr: {
		instances: VultrInstance[];
		meta: {
			total: number;
			links: any;
		};
	};
	digitalOcean: DigitalOceanConfig;
	proxmox: ProxmoxNode[];
}
