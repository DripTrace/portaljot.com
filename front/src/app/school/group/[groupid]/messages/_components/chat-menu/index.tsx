// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useGroupChat } from "@/hooks/groups";

// import { useAppSelector } from "@/redux/store";
// import { User } from "lucide-react";
// import Link from "next/link";

// type GroupChatMenuProps = {
//   groupid: string;
// };

// export const GroupChatMenu = ({ groupid }: GroupChatMenuProps) => {
//   const { members } = useAppSelector((state) => state.onlineTrackingReducer);

//   const { data, pathname } = useGroupChat(groupid);

//   return (
//     <div className="flex flex-col">
//       {data?.status === 200 &&
//         data.members?.map((member) => (
//           <Link
//             href={`${pathname}/${member.id}`}
//             key={member.id}
//             className="flex gap-x-2 items-center p-5 hover:bg-themeGray"
//           >
//             <div className="relative">
//               {members.map(
//                 (m) =>
//                   m.id == member.userId && (
//                     <span
//                       key={m.id}
//                       className="absolute bottom-0 right-0 z-50 w-2 h-2 rounded-full bg-green-600"
//                     ></span>
//                   ),
//               )}
//               <Avatar>
//                 <AvatarImage src={member.User?.image!} alt="user" />
//                 <AvatarFallback>
//                   <User />
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="flex flex-col">
//               <h3>{`${member.User?.firstname} ${member.User?.lastname}`}</h3>
//               <p className="text-sm text-themeTextGray">
//                 No active chat found...
//               </p>
//             </div>
//           </Link>
//         ))}
//     </div>
//   );
// };

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGroupChat } from "@/hooks/groups"; // Imported hook
import { useAppSelector } from "@/redux/store";
import { User as LucideUser } from "lucide-react";
import Link from "next/link";
// import { onGetAllGroupMembers } from "@/api/groups";  // Ensure this is imported

// Define types for GroupChat data
type User = {
  id: string;
  firstname: string;
  lastname: string;
  image: string | null;
};

type GroupMember = {
  User: User | null;
  userId: string;
};

type GroupChatData = {
  status: number;
  members: GroupMember[];
};

type GroupChatMenuProps = {
  groupid: string;
};

export const GroupChatMenu = ({ groupid }: GroupChatMenuProps) => {
  const { members } = useAppSelector((state) => state.onlineTrackingReducer);

  // Use the imported useGroupChat hook
  const { data } = useGroupChat(groupid) as { data: GroupChatData | null };

  // Check if data is available and has a status of 200
  if (!data || data.status !== 200) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col">
      {data.members?.map((member: GroupMember) => (
        <Link
          href={`/group/${groupid}/messages/${member.userId}`}
          key={member.userId}
          className="flex gap-x-2 items-center p-5 hover:bg-themeGray"
        >
          <div className="relative">
            {members.map(
              (m) =>
                m.id === member.userId && (
                  <span
                    key={m.id}
                    className="absolute bottom-0 right-0 z-50 w-2 h-2 rounded-full bg-green-600"
                  ></span>
                ),
            )}
            <Avatar>
              <AvatarImage src={member.User?.image || ""} alt="user" />
              <AvatarFallback>
                <LucideUser />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <h3>{`${member.User?.firstname || "Unknown"} ${member.User?.lastname || "User"}`}</h3>
            <p className="text-sm text-themeTextGray">
              No active chat found...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
