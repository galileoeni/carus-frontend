import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src={"/assets/loader.gif"}
        alt="Loading..."
        width={1080}
        height={1080}
        className="flex w-auto aspect-square h-full max-h-svh object-center"
        unoptimized
      />
    </div>
  );
}

export const LoadingComponent = ({
  description = "Loading...",
}: {
  description: string;
}) => {
  return (
    <>
      <div>
        <Image
          src={"/assets/carus-loader.gif"}
          alt="Loading..."
          width={353}
          height={349}
          className="w-20"
          unoptimized
        />
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  );
};
