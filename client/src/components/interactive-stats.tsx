import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Ship, Home, Star } from "lucide-react";

interface CountUpProps {
  end: number;
  duration: number;
  startAnimation: boolean;
}

function CountUp({ end, duration, startAnimation }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [end, duration, startAnimation]);

  return <span>{count.toLocaleString()}</span>;
}

export default function InteractiveStats() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    {
      icon: Home,
      value: 150,
      label: "Guest Houses",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      icon: Plane,
      value: 25,
      label: "Flight Routes",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      icon: Ship,
      value: 80,
      label: "Ferry Routes",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      icon: Star,
      value: 4.8,
      label: "Average Rating",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      decimal: true
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Niyali?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for authentic Maldivian experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`text-center transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              data-testid={`stat-card-${index}`}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 mx-auto rounded-full ${stat.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 hover:rotate-12`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.decimal ? (
                    <>
                      <CountUp end={Math.floor(stat.value)} duration={2000} startAnimation={inView} />
                      <span>.{(stat.value % 1).toFixed(1).slice(2)}</span>
                    </>
                  ) : (
                    <>
                      <CountUp end={stat.value} duration={2000} startAnimation={inView} />
                      <span>+</span>
                    </>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}