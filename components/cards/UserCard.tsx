"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface Params {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Params) {
    const router = useRouter();
  
    return (
    <article className="user-card">
      <div className="user-card_avatar ">
        <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button className="user-card_btn" onClick={() => router.push(`/profile/${id}`)}>
            View
      </Button>
    </article>
  );
}

export default UserCard;
