"use client";

import Link from "next/link";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { mockServices } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categoryInfo = {
  licensing: {
    en: { title: "Licensing", description: "Register and manage driver licenses and vehicle documentation." },
    fil: { title: "Pagpaparehistro", description: "Magparehistro at pamahalaan ang driver licenses at vehicle documentation." },
  },
  violations: {
    en: { title: "Violations & Fines", description: "Check traffic violations and pay outstanding fines online." },
    fil: { title: "Paglabag & Multa", description: "I-check ang traffic violations at magbayad ng outstanding fines online." },
  },
  assistance: {
    en: { title: "Assistance & Support", description: "Get help with towing, impound, and roadside emergencies." },
    fil: { title: "Tulong at Suporta", description: "Makakuha ng tulong sa towing, impound, at roadside emergencies." },
  },
  permits: {
    en: { title: "Permits & Authorizations", description: "Apply for special permits and event authorizations." },
    fil: { title: "Permit & Pahintulot", description: "Mag-apply para sa special permits at event authorizations." },
  },
};

export default function ServicesPage() {
  const { language } = useSettingsStore();

  // Group services by category
  const groupedServices = {
    licensing: mockServices.filter((s) => s.category === "licensing"),
    violations: mockServices.filter((s) => s.category === "violations"),
    assistance: mockServices.filter((s) => s.category === "assistance"),
    permits: mockServices.filter((s) => s.category === "permits"),
  };

  const categories = ["licensing", "violations", "assistance", "permits"] as const;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 mb-3">
          {language === "en" ? "Citizen Services" : "Serbisyo para sa Mamamayan"}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {language === "en"
            ? "Access MMDA services online, from licensing to permit applications."
            : "Palakasin ang access sa MMDA services online, mula licensing hanggang permit applications."}
        </p>
      </div>

      {/* Service Categories */}
      <div className="space-y-20">
        {categories.map((category) => {
          const services = groupedServices[category];
          const info = categoryInfo[category];
          const label = info[language as "en" | "fil"];

          return (
            <section key={category} className="border-t border-gray-200 dark:border-gray-700 pt-12">
              {/* Category Header */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">{label.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{label.description}</p>
              </div>

              {/* Service Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                  <Link key={service.id} href={service.href}>
                    <Card className="h-full hover:shadow-md dark:hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                      <div className="p-6 flex flex-col h-full">
                        {/* Service Title */}
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
                          {language === "en" ? service.title : service.titleFil}
                        </h3>

                        {/* Service Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm grow">
                          {language === "en" ? service.description : service.descriptionFil}
                        </p>

                        {/* Arrow/Link indicator */}
                        <div className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                          {language === "en" ? "Learn more" : "Matuto pa"}
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Category CTA Button */}
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                {language === "en" ? `View all ${label.title}` : `Tingnan ang lahat ng ${label.title}`}
              </Button>
            </section>
          );
        })}
      </div>
    </main>
  );
}
