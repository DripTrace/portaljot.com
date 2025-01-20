"use server";

import {
	SecretsManagerClient,
	GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import {
	Route53Client,
	ListHostedZonesCommand,
	ListResourceRecordSetsCommand,
} from "@aws-sdk/client-route-53";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import dotenv from "dotenv";

dotenv.config();

async function handleAwsView() {
	const secretName = "nexusconjurecom-cloud-api-secret";

	// Create a Secrets Manager client
	const secretsClient = new SecretsManagerClient({
		region: process.env.AWS_REGION,
	});

	try {
		const response = await secretsClient.send(
			new GetSecretValueCommand({
				SecretId: secretName,
				VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
			})
		);

		if (!response.SecretString) {
			throw new Error("SecretString is undefined");
		}

		const secret = JSON.parse(response.SecretString);
		console.log("Retrieved Secret Structure:", secret);

		if (!secret.accessKeyId || !secret.secretAccessKey) {
			throw new Error("Invalid secret structure");
		}

		const credentials = {
			accessKeyId: secret.accessKeyId,
			secretAccessKey: secret.secretAccessKey,
		};

		// Route 53 Client
		const route53Client = new Route53Client({
			region: "us-east-1", // Route 53 is global, but specify a region if necessary
			credentials,
		});

		// List Hosted Zones
		const hostedZonesData = await route53Client.send(
			new ListHostedZonesCommand({})
		);
		const hostedZones = hostedZonesData.HostedZones || [];

		// List Resource Record Sets for each Hosted Zone
		const domains = await Promise.all(
			hostedZones.map(async (zone) => {
				const recordSetsData = await route53Client.send(
					new ListResourceRecordSetsCommand({
						HostedZoneId: zone.Id,
					})
				);
				return {
					zone,
					recordSets: recordSetsData.ResourceRecordSets,
				};
			})
		);

		console.log("Route 53 Hosted Zones:", hostedZones);
		console.log("Route 53 Domains:", domains);

		// EC2 Client
		const ec2Client = new EC2Client({
			region: process.env.AWS_REGION,
			credentials,
		});

		// Describe EC2 Instances
		const ec2InstancesData = await ec2Client.send(
			new DescribeInstancesCommand({})
		);
		const ec2Instances =
			ec2InstancesData.Reservations?.flatMap(
				(reservation) => reservation.Instances
			) || [];

		console.log("EC2 Instances:", ec2Instances);

		return { hostedZones, domains, ec2Instances };
	} catch (error) {
		console.error("Error retrieving AWS data:", error);
		throw new Error("Failed to retrieve AWS data");
	}
}

export { handleAwsView };
