import Softphone from "@/ref/soft/src/softphone";

let softphone: Softphone;

async function initializeSoftphone() {
    const sipInfo = {
        username: process.env.SIP_INFO_USERNAME!,
        password: process.env.SIP_INFO_PASSWORD!,
        authorizationId: process.env.SIP_INFO_AUTHORIZATION_ID!,
        domain: process.env.SIP_INFO_DOMAIN!,
    };
    
    console.log("Initializing Softphone with info:", sipInfo);
    
    softphone = new Softphone(sipInfo);
    
    try {
        await softphone.register();
        console.log("Softphone registered successfully");
    } catch (error) {
        console.error("Failed to register Softphone:", error);
    }
}

initializeSoftphone();

export { softphone };