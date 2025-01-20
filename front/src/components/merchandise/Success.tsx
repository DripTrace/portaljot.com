"use client";

import { useRouter } from 'next/navigation';
import ContentComponent from '@/components/merchandise/ContentComponent';
import { CheckCircleIcon } from 'lucide-react';

export interface ISuccessProps {}

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will fins a plethora of custom graphic designs attatched to high quality merchandise.';

export default function Success(props: ISuccessProps) {
  const router = useRouter();

  return (
    <ContentComponent title="Profile" description={`${title} - ${subtitle}`}>
      <div className="bg-gray-100 h-screen">
        <main className="max-w-screen-lg mx-auto">
          <div className="flex flex-col p-10 bg-white">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 h-10" />
              <h1 className="text-3xl">
                Thank you, your order has been confirmed!
              </h1>
            </div>
            <p>
              Thank you for shopping with us. We&apos;ll send a conformation once
              your item has shipped, if you would like to check the status of
              your order(s) please press the link below.
            </p>
            <button
              onClick={() => router.push('/merchandise/orders')}
              className="button mt-8"
            >
              Go to my orders
            </button>
          </div>
        </main>
      </div>
    </ContentComponent>
  );
}
