import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link href="/login">تسجيل الدخول</Link>
            </li>
            <li>
              <Link href="/subjects">المواد الدراسية</Link>
            </li>
            <li>
              <Link href="/study-materials">ملفات المواد الدراسية</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}