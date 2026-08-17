import type { Metadata } from "next";
import { Suspense } from "react";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <AboutContent />
    </Suspense>
  );
}
