import { BadgeDollarSign, CalendarCheck, Handshake } from "lucide-react";
import React from "react";

const Services = () => {
  const services = [
    {
      title: "Donations",
      description:
        "Support our mission by making donations to help us expand our waste management initiatives.",
      icon: <BadgeDollarSign className="size-10 text-green-700" />,
    },
    {
      title: "Pickup Scheduling",
      description:
        "Schedule convenient waste pickup times to ensure efficient collection and recycling.",
      icon: <CalendarCheck className="size-10 text-green-700" />,
    },
    {
      title: "Business Partnerships",
      description:
        "Collaborate with us for school partnerships and other business opportunities in waste management.",
      icon: <Handshake className="size-10 text-green-700" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-[24px] md:text-[33px] lg:text-[48px] font-black text-center mb-10">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
