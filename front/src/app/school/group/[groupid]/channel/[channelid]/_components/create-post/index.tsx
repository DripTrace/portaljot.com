"use client";

import { PostContent } from "@/components/global/post-content";
import { SimpleModal } from "@/components/global/simple-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useChannelPage } from "@/hooks/channels";
import { PostCard } from "../post-feed/post-card";

type Props = { userImage: string; channelid: string; username: string };

const CreateNewPost = ({ channelid, userImage, username }: Props) => {
  const { data, mutation } = useChannelPage(channelid);
  const { name } = data as { name: string };

  return (
    <>
      <SimpleModal
        trigger={
          <span className="z-40">
            <Card className="border-themeGray cursor-pointer first-letter:rounded-2xl overflow-hidden z-40">
              <CardContent className="p-3 bg-[#1A1A1D] flex gap-x-6 items-center z-40">
                <Avatar className="cursor-pointer z-40">
                  <AvatarImage src={userImage} alt="user" className="z-40" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <CardDescription className="text-themeTextGray z-40">
                  Type / to add elements to your post...
                </CardDescription>
              </CardContent>
            </Card>
          </span>
        }
      >
        <div className="flex gap-x-3 z-40">
          <Avatar className="cursor-pointer z-40">
            <AvatarImage src={userImage} alt="user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col z-40">
            <p className="text-themeTextGray text-sm capitalize z-40">
              {username}
            </p>
            <p className="text-sm captialize text-themeTextGray z-40">
              Posting in{" "}
              <span className="font-bold capitalize text-themeTextWhite z-40">
                {name}
              </span>
            </p>
          </div>
        </div>
        <PostContent channelid={channelid} />
      </SimpleModal>
      {mutation.length > 0 &&
        mutation[0].status === "pending" &&
        mutation[0].state && (
          <PostCard
            channelname={name}
            userimage={userImage}
            username={username}
            html={mutation[0].state.htmlcontent}
            title={mutation[0].state.title}
            likes={0}
            comments={0}
            postid={mutation[0].state.postid}
            optimisitc
          />
        )}
    </>
  );
};

export default CreateNewPost;
