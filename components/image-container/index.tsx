import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ImageContainerProps {
  image?: string;
  size?: number;
  isPending?: boolean;
  alt?: string;
}

function getSafeImage(image?: string) {
  if (!image) return "/avatar.png";
  try {
    return image;
  } catch {
    return "/avatar.png";
  }
}

export default function ImageContainer({
  image,
  size = 56,
  isPending,
  alt,
}: ImageContainerProps) {
  return (
    <div
      className="rounded-full overflow-hidden border-2 border-gray-300"
      style={{ width: size, height: size }}
    >
      {isPending ? (
        <div
          className={`w-full h-full bg-grey-10 animate-pulse rounded-full`}
        ></div>
      ) : (
        <>
          <Avatar className="size-full">
            <AvatarImage
              src={getSafeImage(image)}
              alt="Profile picture"
              className="object-cover w-full h-full"
            />
            <AvatarFallback>{alt?.slice(0, 3)}</AvatarFallback>
          </Avatar>
        </>
      )}
    </div>
  );
}
