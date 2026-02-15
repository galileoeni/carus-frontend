import { useState } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

export default function WasteSelector() {
  const [selected, setSelected] = useState<string>("plastic");

  const handleSelect = (type: string) => {
    setSelected(type);
  };

  const Button = ({
    type,
    label,
    icon,
    bg,
    circle,
    baseWidth = "w-[90px] md:w-[110px]",
    activeWidth = "w-[100px] md:w-[120px]",
  }: {
    type: string;
    label: string;
    icon: string;
    bg: string;
    circle: string;
    baseWidth: string;
    activeWidth: string;
  }) => (
    <button
      disabled
      onClick={() => handleSelect(type)}
      className={`flex items-center gap-2 rounded-3xl py-2 px-2 transition-all duration-200 disabled:cursor-not-allowed
            ${selected === type ? activeWidth : baseWidth}
                ${bg}
            `}
    >
      <div className="flex items-center gap-2">
        <div
          className={`relative w-6 h-6 rounded-full flex items-center justify-center overflow-hidden ${circle}`}
        >
          <Image src={icon} alt={label} fill className="object-contain p-1" />
        </div>

        <p className="text-[9px] md:text-sm">{label}</p>
        <div>
          {selected === type && <FaCheck className="text-sm text-grey-90" />}
        </div>
      </div>
    </button>
  );

  return (
    <div className="bg-[#F3F3F3] grid grid-cols-3 lg:w-2/3 md:grid-cols-4 xl:w-full xl:grid-cols-7 gap-y-4 gap-x-3 xl:gap-1 p-2 md:p-5 rounded-xl">
      {/* Plastic */}
      <Button
        type="plastic"
        label="plastic"
        icon="/plastic.svg"
        bg="bg-[#FFF7D4]"
        circle="bg-[#FFE168]"
        baseWidth="w-[90px] md:w-[90px]"
        activeWidth="w-[100px] md:w-[100px]"
      ></Button>

      {/* Paper */}
      <Button
        type="paper"
        label="paper"
        icon="/paper.svg"
        bg="bg-[#EEFAFF]"
        circle="bg-[#C9EFFF]"
        baseWidth="w-[90px] md:w-[90px]"
        activeWidth="w-[100px] md:w-[100px]"
      ></Button>

      {/* E-waste */}
      <Button
        type="E-waste"
        label="E-waste"
        icon="/e-waste.png"
        bg="bg-[#FFF1E3]"
        circle="bg-[#FFDFBE]"
        baseWidth="w-[90px] md:w-[105px]"
        activeWidth="w-[102px] md:w-[120px]"
      ></Button>

      {/* Organic */}
      <Button
        type="Organic"
        label="Organic"
        icon="/organic.svg"
        bg="bg-[#FFEBE9]"
        circle="bg-[#FFD5D1]"
        baseWidth="w-[90px] md:w-[100px]"
        activeWidth="w-[100px] md:w-[110px]"
      ></Button>

      {/*Metal */}
      <Button
        type="Metal"
        label="Metal"
        icon="/metal.svg"
        bg="bg-[#ECEAE9]"
        circle="bg-[#D7D7D7]"
        baseWidth="w-[90px] md:w-[90px]"
        activeWidth="w-[100px] md:w-[100px]"
      ></Button>

      {/* Glass */}
      <Button
        type="Glass"
        label="Glass"
        icon="/glass.svg"
        bg="bg-[#E5FFF3]"
        circle="bg-[#AEF0D0]"
        baseWidth="w-[90px] md:w-[90px]"
        activeWidth="w-[95px] md:w-[100px]"
      ></Button>

      {/* Mixed Waste */}
      <Button
        type="Mixed Waste"
        label="Mixed Waste"
        icon="/mixed-waste.svg"
        bg="bg-[#C2FFF4]"
        circle="bg-[#49FFDD]"
        baseWidth="w-[110px] md:w-[135px]"
        activeWidth="w-[130px] md:w-[150px]"
      ></Button>
    </div>
  );
}
