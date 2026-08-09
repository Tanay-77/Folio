import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tanay®',
  description: 'Creative Portfolio',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f3f3f3] text-black" suppressHydrationWarning>{children}</body>
    </html>
  );
}
