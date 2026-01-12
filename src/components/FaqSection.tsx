


import { useState } from 'react';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';

const faqData = [
  {
    question: 'Do you sell individual PC components?',
    answer:
      'Yes. We operate as a full PC parts store, selling processors, graphics cards (GPUs), RAM, storage devices, PC cabinets, power supplies, and cooling solutions.',
  },
  {
    question: 'Is after-sales support available?',
    answer:
      'Yes. We provide reliable after-sales support, including technical assistance, upgrade guidance, and warranty support for all PC builds and components purchased from us.',
  },
  {
    question: 'Can I build a gaming PC online?',
    answer:
      'Yes. You can build a gaming PC online by choosing your preferred processor, graphics card, RAM, storage, and other PC components based on your budget and gaming needs. Many gaming PC shops also offer expert assistance to help you select compatible parts, assemble the system, and deliver a fully tested gaming PC to your location',
  },
  {
    question: 'Which PC is best for playing GTA 5 smoothly?',
    answer:
      'For smooth GTA 5 gameplay, a gaming PC with a modern quad-core or higher processor, at least 16GB RAM, an SSD for faster loading, and a dedicated graphics card is recommended. The exact configuration depends on whether you play at 1080p, higher resolutions, or with graphics settings set to high or ultra.',
  },
  {
    question: 'What is the price of a full gaming PC set?',
    answer:
      'The price of a full gaming PC set varies based on performance level, components, and usage. A complete setup usually includes the CPU, monitor, keyboard, mouse, and other essentials. Entry-level gaming PC sets are suitable for casual gaming, while mid-range and high-end setups are designed for demanding games, streaming, and future upgrade',
  },
  {
    question: 'What is the best PC for gaming?',
    answer:
      'The best PC for gaming depends on the types of games you play, your preferred resolution, and your budget. A well-balanced gaming PC includes a powerful processor, a suitable graphics card, sufficient RAM, fast storage, and proper cooling. Custom-built gaming PCs often offer better performance, upgrade flexibility, and value compared to generic pre-built systems.',
  },
  {
    question: 'Can I buy PC components online from FTDC ?',
    answer:
      'Yes. FTDC Hardware offers a wide range of genuine PC components online, including processors, graphics cards, RAM, storage, power supplies, and other essential PC hardware. All components are selected for compatibility and performance, and our team can also assist with configuration, upgrades, and complete PC builds to ensure you get the right parts for your needs.',
  },
];


export default function  FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 ">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-100 mt-3">
            Everything you need to know about <b>FT Digital Computer</b> and our services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-700 rounded-xl p-5 transition-all duration-300 bg-black shadow-sm hover:shadow-md ${
                activeIndex === index ? 'border-orange-500 bg-orange-40' : ''
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <h5
                  className={`text-lg font-semibold ${
                    activeIndex === index
                      ? 'text-gray-100'
                      : 'text-white hover:text-orange-500'
                  }`}
                >
                  {faq.question}
                </h5>
                {activeIndex === index ? (
                  <HiMinusSm className="text-orange-500 text-2xl transition-all" />
                ) : (
                  <HiPlusSm className="text-gray-100 text-2xl transition-all" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? 'max-h-40 mt-3' : 'max-h-0'
                }`}
              >
                <p className="text-gray-100 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
