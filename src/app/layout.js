import { Prompt } from 'next/font/google';
const prompt = Prompt({ subsets: ['thai', 'latin'], weight: ['300', '400', '700', '900'] });

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}