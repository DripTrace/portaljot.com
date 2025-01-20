"use client";

import { Bell } from "@/icons";
import GlassSheet from "../glass-sheet";

export const Notification = () => {
  return (
    <GlassSheet
      trigger={
        <span className="cursor-pointer">
          <Bell />
        </span>
      }
    >
      {/* <div>yo</div> */}
      NOTIFICATIONS LIVE HERE
    </GlassSheet>
  );
};

// "use client";

// import { Bell } from "@/icons";
// import type { FC } from "react";
// import GlassSheet from "../glass-sheet";

// interface NotificationProps {
//   //   children: ReactNode; // Define children prop
// }

// const Notification: FC<NotificationProps> = ({}) => {
//   return (
//     <GlassSheet
//       trigger={
//         <span className="cursor-pointer">
//           <Bell />
//         </span>
//       }
//     >
//       {/* {children} */}
//       PLACE NOTIFIACTIONS HERE
//     </GlassSheet>
//   );
// };

// export default Notification;
