import type {Metadata} from 'next';
import './globals.css';
import { Loader } from '@/components/navigation/Loader';

export const metadata: Metadata = {
  title: 'Tanay®',
  description: 'Creative Portfolio',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f3f3f3] text-black" suppressHydrationWarning>
        <Loader />
        {children}
      </body>
    </html>
  );
}
