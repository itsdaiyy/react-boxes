import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function HeaderAvatar({ currentMember }) {
  return (
    <Avatar>
      <AvatarImage
        src={currentMember?.user_metadata?.avatar_url}
        alt="@shadcn"
      />
      <AvatarFallback delayMs={600}>
        {currentMember?.user_metadata?.display_name}
      </AvatarFallback>
    </Avatar>
  );
}

export default HeaderAvatar;
