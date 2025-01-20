import React, { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface WireGuardInterface {
    address: string[];
    privateKey: string;
    dns: string[];
    listenPort: number;
}

interface WireGuardPeer {
    allowedIps: string[];
    publicKey: string;
    endpoint: string;
    preSharedKey: string;
}

interface WireGuardConfig {
    wgInterface: WireGuardInterface;
    peers: WireGuardPeer[];
    publicKey: string;
}

interface TrueNASSystemInfo {
    version: string;
    hostname: string;
    physmem: number;
    model: string;
    cores: number;
    uptime: string;
}

interface TrueNASPoolDisk {
    device: string;
}

interface TrueNASPool {
    name: string;
    size: number;
    status: string;
    allocated: number;
    free: number;
    topology: {
        data: {
            children: TrueNASPoolDisk[];
        }[];
    };
}

interface TrueNASConfig {
    systemInfo: TrueNASSystemInfo;
    pools: TrueNASPool[];
}

interface AzureResource {
    id: string;
    name: string;
    type: string;
}

interface GCPProject {
    projectId: string;
    state: string;
}

interface AWSInstance {
    InstanceId: string;
    InstanceType: string;
    State: {
        Name: string;
    };
}

interface AWSDomain {
    zone: {
        Id: string;
        Name: string;
    };
}

interface AWSConfig {
    ec2Instances: AWSInstance[];
    domains: AWSDomain[];
}

interface LinodeInstance {
    id: number;
    label: string;
    type: string;
    region: string;
}

interface VultrInstance {
    id: string;
    label: string;
    os: string;
    region: string;
}

interface DigitalOceanAccount {
    email: string;
}

interface DigitalOceanDroplet {
    id: number;
    name: string;
    size: {
        slug: string;
    };
    region: {
        slug: string;
    };
}

interface DigitalOceanConfig {
    account: DigitalOceanAccount;
    droplets: DigitalOceanDroplet[];
}

interface CloudData {
    wireguard: WireGuardConfig;
    truenas: TrueNASConfig;
    azure: AzureResource[];
    gcp: GCPProject[];
    aws: AWSConfig;
    linode: {
        data: LinodeInstance[];
    };
    vultr: {
        instances: VultrInstance[];
    };
    digitalOcean: DigitalOceanConfig;
}

interface SpecialCharProps {
    children: ReactNode;
}

const SpecialChar: React.FC<SpecialCharProps> = ({ children }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-blue-500 font-bold"
    >
        {children}
    </motion.span>
);

interface AnimatedLineProps {
    children: ReactNode;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({ children }) => (
    <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

interface ExpandableSectionProps {
    title: string;
    children: ReactNode;
    isExpanded: boolean;
    onToggle: () => void;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    title,
    children,
    isExpanded,
    onToggle,
}) => (
    <>
        <AnimatedLine>
            <span onClick={onToggle} style={{ cursor: "pointer" }}>
                <SpecialChar>{isExpanded ? "▼" : "▶"}</SpecialChar> {title}
            </span>
        </AnimatedLine>
        {isExpanded && children}
    </>
);

interface ASCIITreeProps {
    data: CloudData;
}

const ASCIITree: React.FC<ASCIITreeProps> = ({ data }) => {
    const [animationKey, setAnimationKey] = useState(0);
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({});

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey((prevKey) => prevKey + 1);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const formatBytes = (bytes: number): string => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes === 0) return "0 Bytes";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
            sizes[i]
        }`;
    };

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const expandAll = () => {
        const allSections = [
            // "wireguard",
            // "truenas",
            "azure",
            "gcp",
            "aws",
            "linode",
            "vultr",
            "digitalOcean",
        ];
        const expandedAll = allSections.reduce(
            (acc, section) => ({ ...acc, [section]: true }),
            {}
        );
        setExpandedSections(expandedAll);
    };

    // Transform DigitalOcean droplets
    const transformedDroplets = React.useMemo(() => {
        const dropletsArray = data?.digitalOcean?.droplets;
        if (
            dropletsArray &&
            typeof dropletsArray === "object" &&
            !Array.isArray(dropletsArray)
        ) {
            return Object.values(dropletsArray).filter(
                (
                    item
                ): item is {
                    id: string;
                    name: string;
                    size: { slug: string };
                    region: { slug: string };
                } => typeof item === "object" && item !== null && "id" in item
            );
        }
        return dropletsArray;
    }, [data?.digitalOcean?.droplets]);

    return (
        <motion.pre
            key={animationKey}
            className="text-xs font-mono whitespace-pre overflow-x-auto p-4 bg-gray-900 text-green-400 rounded-lg shadow-lg"
        >
            <AnimatedLine>
                <SpecialChar>☰</SpecialChar> Cloud Infrastructure Dashboard
            </AnimatedLine>
            <AnimatedLine>
                <span onClick={expandAll} style={{ cursor: "pointer" }}>
                    <SpecialChar>⊞</SpecialChar> Expand All
                </span>
            </AnimatedLine>

            {/* <ExpandableSection
				title="WireGuard Interfaces"
				isExpanded={expandedSections["wireguard"]}
				onToggle={() => toggleSection("wireguard")}
			>
				<AnimatedLine>
					<SpecialChar>┃ ┣━ ⚡</SpecialChar> Interface:{" "}
					{data.wireguard.wgInterface.address[0]}
				</AnimatedLine>
				<AnimatedLine>
					<SpecialChar>┃ ┣━ ⚷</SpecialChar> Public Key:{" "}
					{data.wireguard.publicKey.substring(0, 10)}...
				</AnimatedLine>
				<AnimatedLine>
					<SpecialChar>┃ ┣━ ⚶</SpecialChar> Listen Port:{" "}
					{data.wireguard.wgInterface.listenPort}
				</AnimatedLine>
				<AnimatedLine>
					<SpecialChar>┃ ┗━ ⚸</SpecialChar> DNS:{" "}
					{data.wireguard.wgInterface.dns.join(", ")}
				</AnimatedLine>
			</ExpandableSection> */}

            {/* <ExpandableSection
                title="TrueNAS Configuration"
                isExpanded={expandedSections["truenas"]}
                onToggle={() => toggleSection("truenas")}
            >
                <AnimatedLine>
                    <SpecialChar>┃ ┣━ ⚙</SpecialChar> System Info
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┣━ ⚛</SpecialChar> Version:{" "}
                    {data.truenas.systemInfo.version}
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┣━ ⚚</SpecialChar> Hostname:{" "}
                    {data.truenas.systemInfo.hostname}
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┣━ ⚕</SpecialChar> Memory:{" "}
                    {formatBytes(data.truenas.systemInfo.physmem)}
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┣━ ⚒</SpecialChar> CPU:{" "}
                    {data.truenas.systemInfo.model},{" "}
                    {data.truenas.systemInfo.cores} cores
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┗━ ⚑</SpecialChar> Uptime:{" "}
                    {data.truenas.systemInfo.uptime}
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┗━ ⛃</SpecialChar> Pools
                </AnimatedLine>
                {data.truenas.pools.map((pool, index) => (
                    <React.Fragment key={pool.name}>
                        <AnimatedLine>
                            <SpecialChar>┃ ┣━ ⛊</SpecialChar> {pool.name} (
                            {formatBytes(pool.size)})
                        </AnimatedLine>
                        <AnimatedLine>
                            <SpecialChar>┃ ┃ ┣━ ⚐</SpecialChar> Status:{" "}
                            {pool.status}
                        </AnimatedLine>
                        <AnimatedLine>
                            <SpecialChar>┃ ┃ ┣━ ⛁</SpecialChar> Allocated:{" "}
                            {formatBytes(pool.allocated)}
                        </AnimatedLine>
                        <AnimatedLine>
                            <SpecialChar>┃ ┃ ┣━ ⛀</SpecialChar> Free:{" "}
                            {formatBytes(pool.free)}
                        </AnimatedLine>
                        <AnimatedLine>
                            <SpecialChar>┃ ┃ ┗━ ⛃</SpecialChar> Disks:{" "}
                            {pool.topology.data[0].children
                                .map((disk) => disk.device)
                                .join(", ")}
                        </AnimatedLine>
                        {index < data.truenas.pools.length - 1 && (
                            <AnimatedLine>
                                <SpecialChar>┃ ┃</SpecialChar>
                            </AnimatedLine>
                        )}
                    </React.Fragment>
                ))}
            </ExpandableSection> */}

            <AnimatedLine>
                <SpecialChar>┣━ ☁</SpecialChar> Cloud Providers
            </AnimatedLine>

            <ExpandableSection
                title="Azure"
                isExpanded={expandedSections["azure"]}
                onToggle={() => toggleSection("azure")}
            >
                {data.azure.map((resource, index) => (
                    <AnimatedLine key={resource.id}>
                        <SpecialChar>┃ ┃ ┣━ ◈</SpecialChar> {resource.name} (
                        {resource.type})
                    </AnimatedLine>
                ))}
            </ExpandableSection>

            <ExpandableSection
                title="GCP"
                isExpanded={expandedSections["gcp"]}
                onToggle={() => toggleSection("gcp")}
            >
                {data.gcp.map((project, index) => (
                    <AnimatedLine key={project.projectId}>
                        <SpecialChar>┃ ┃ ┣━ ◇</SpecialChar> {project.projectId}{" "}
                        - {project.state}
                    </AnimatedLine>
                ))}
            </ExpandableSection>

            <ExpandableSection
                title="AWS"
                isExpanded={expandedSections["aws"]}
                onToggle={() => toggleSection("aws")}
            >
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┣━ ◆</SpecialChar> EC2 Instances
                </AnimatedLine>
                {data.aws.ec2Instances.map((instance, index) => (
                    <AnimatedLine key={instance.InstanceId}>
                        <SpecialChar>┃ ┃ ┃ ┣━ ◊</SpecialChar>{" "}
                        {instance.InstanceId} ({instance.InstanceType}) - State:{" "}
                        {instance.State.Name}
                    </AnimatedLine>
                ))}
                <AnimatedLine>
                    <SpecialChar>┃ ┃ ┗━ ◇</SpecialChar> Route 53 Domains
                </AnimatedLine>
                {data.aws.domains.map((domain, index) => (
                    <AnimatedLine key={domain.zone.Id}>
                        <SpecialChar>┃ ┃ ┣━ ◎</SpecialChar> {domain.zone.Name}
                    </AnimatedLine>
                ))}
            </ExpandableSection>

            <ExpandableSection
                title="Linode"
                isExpanded={expandedSections["linode"]}
                onToggle={() => toggleSection("linode")}
            >
                {data.linode.data.map((instance, index) => (
                    <AnimatedLine key={instance.id}>
                        <SpecialChar>┃ ┃ ┣━ ◉</SpecialChar> {instance.label} (
                        {instance.type}) - {instance.region}
                    </AnimatedLine>
                ))}
            </ExpandableSection>

            <ExpandableSection
                title="Vultr"
                isExpanded={expandedSections["vultr"]}
                onToggle={() => toggleSection("vultr")}
            >
                {data.vultr.instances.map((instance, index) => (
                    <AnimatedLine key={instance.id}>
                        <SpecialChar>┃ ┃ ┣━ ◍</SpecialChar> {instance.label} (
                        {instance.os}) - Region: {instance.region}
                    </AnimatedLine>
                ))}
            </ExpandableSection>

            <ExpandableSection
                title="DigitalOcean"
                isExpanded={expandedSections["digitalOcean"]}
                onToggle={() => toggleSection("digitalOcean")}
            >
                <AnimatedLine>
                    <SpecialChar>┃ ┣━ ◐</SpecialChar> Account:{" "}
                    {data.digitalOcean.account.email}
                </AnimatedLine>
                <AnimatedLine>
                    <SpecialChar>┃ ┗━ ◑</SpecialChar> Droplets
                </AnimatedLine>
                {Array.isArray(transformedDroplets) &&
                    transformedDroplets.map((droplet, index) => (
                        <AnimatedLine key={droplet.id}>
                            <SpecialChar>┃ ┣━ ◒</SpecialChar> {droplet.name} (
                            {droplet.size.slug}) - Region: {droplet.region.slug}
                        </AnimatedLine>
                    ))}
            </ExpandableSection>

            <AnimatedLine>
                <SpecialChar>┗━ ☷</SpecialChar> End of Infrastructure Overview
            </AnimatedLine>
        </motion.pre>
    );
};

export default ASCIITree;
