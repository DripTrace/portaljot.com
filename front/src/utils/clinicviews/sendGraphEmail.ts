async function sendGraphEmail(
    accessToken: string,
    to: string,
    subject: string,
    html: string,
    attachments?: any[]
) {
    const url = `https://graph.microsoft.com/v1.0/users/${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}/sendMail`;
    const emailData = {
        message: {
            subject,
            body: {
                contentType: "HTML",
                content: html,
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: to,
                    },
                },
            ],
            attachments: attachments
                ? attachments.map((attachment) => ({
                      "@odata.type": "#microsoft.graph.fileAttachment",
                      name: attachment.filename,
                      contentBytes: attachment.content,
                  }))
                : [],
        },
        saveToSentItems: true,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending email via Graph:", errorData);
        throw new Error("Failed to send email via Graph");
    }

    console.log("Email sent successfully via Graph");
}
