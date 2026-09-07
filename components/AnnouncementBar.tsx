"use client";

import { useLanguage } from "@/lib/i18n";

export default function AnnouncementBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-obsidian text-cream text-xs md:text-sm tracking-wide py-2 text-center">
      {t("announcement.bar")}
    </div>
  );
}
