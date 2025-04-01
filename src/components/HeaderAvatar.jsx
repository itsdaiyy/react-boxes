import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function HeaderAvatar({ currentMember }) {
  return (
    <Avatar>
      <AvatarImage
        src={currentMember?.user_metadata?.avatar_url}
        alt={currentMember?.user_metadata?.display_name}
        className="object-cover"
      />
      <AvatarFallback delayMs={600}>
        {currentMember?.user_metadata?.display_name}
      </AvatarFallback>
    </Avatar>
  );
}

export default HeaderAvatar;
