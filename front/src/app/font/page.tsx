// src/app/font/page.tsx
"use client";
import { FontChooser } from "@/components/font/FontChooser";

export default function FontPage() {
    return (
        <div className="container mx-auto p-4">
            <FontChooser
                onFontSelect={(font, weight) => {
                    console.log("Selected font:", font, "weight:", weight);
                }}
            />
        </div>
    );
}
