// pages/test.js
import { useSession } from "next-auth/react";

function SessionPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Session Information</h1>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>ID: {session.user.id}</p>
      <p>Session Expires: {session.expires}</p>
    </div>
  );
}

export default SessionPage;
