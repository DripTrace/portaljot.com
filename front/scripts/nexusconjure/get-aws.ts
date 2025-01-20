import {
	SecretsManagerClient,
	GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";

dotenv.config();

const secretName = "nexusconjurecom-cloud-api-secret";

async function getAwsCredentials() {
	const client = new SecretsManagerClient({
		region: `${process.env.AWS_REGION}`,
		credentials: {
			accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
			secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
		},
	});

	console.log("Using Access Key ID:", process.env.AWS_ACCESS_KEY_ID);
	console.log(
		"Using Secret Access Key:",
		process.env.AWS_SECRET_ACCESS_KEY ? "******" : "Not Provided"
	);

	try {
		const response = await client.send(
			new GetSecretValueCommand({
				SecretId: secretName,
				VersionStage: "AWSCURRENT",
			})
		);

		if (!response.SecretString) {
			throw new Error("SecretString is undefined");
		}

		const secret = JSON.parse(response.SecretString);
		console.log("AWS Credentials:", secret);
	} catch (error) {
		console.error("Error retrieving secret:", error);
	}
}

getAwsCredentials();
