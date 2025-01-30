// pages/api/auth/keplr/[...nextauth].js
import { connectToDatabase } from "@/utils/database"; // adjust path
// console.log("KeplrProvider");
// const KeplrProvider = {
//   id: "keplr",
//   name: "Keplr",
//   type: "oauth",
//   credentials: {
//     address: { label: "Address", type: "text" },
//   },
//   authorize: async (credentials) => {
export default async function KeplrProvider(req, res) {
    const { address } = req.body;

    // // 1. Access token extraction:
    // const accessToken = getAccessTokenFromCredentials(credentials); // Implement this

    // // 2. Token validation placeholder:
    // const isValidToken = await validateAccessToken(accessToken); // Implement this

    // if (!isValidToken) {
    //   console.log("Invalid token");
    //   return Promise.resolve(null); // Invalid token
    // }

    try {
        // Connect to database
        const pool = await connectToDatabase();

        // Validate address in database
        const [rows] = await pool.query(
            "SELECT * FROM wallets WHERE address = ?",
            address
        );

        const wallet = rows[0];
        if (wallet.userId) {
            // Fetch user data if address is valid
            const [userRows] = await pool.query(
                "SELECT * FROM users WHERE id = ?",
                wallet.userId
            );

            const user = userRows[0];

            if (user) {
                console.log("User found:", user);
                // Remove sensitive data from user object
                delete user.hashed_password;
                delete user.accessToken;
                delete user.salt;
                delete user.refreshToken;
                delete user.updates_at;

                // Return the user object
                return Promise.resolve(user);
            }
        }

        // If the address or user is not valid, return null
        return Promise.resolve(null);
    } catch (error) {
        console.error("Login error:", error);
        return Promise.resolve(null);
    }
}
// };
// export default KeplrProvider;
