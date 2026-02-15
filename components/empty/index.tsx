import Image from "next/image";

export const Empty = ({
  description = "No data found!",
  type,
}: {
  description: string;
  type?: string;
}) => {
  return (
    <>
      <div>
        {type === "bill" ? (
          <Image
            src="/empty-bill.png"
            width={271}
            height={270}
            alt="Empty Bill Icon"
            className="w-28 grayscale"
          />
        ) : (
          <Image
            src="/icon.png"
            width={194}
            height={200}
            alt="Carus Logo"
            className="w-20 grayscale"
          />
        )}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  );
};
