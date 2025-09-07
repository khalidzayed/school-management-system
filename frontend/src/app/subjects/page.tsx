'use client';
import { useEffect, useState } from 'react';
import { getSubjects } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Subject {
  id: number;
  name: string;
  code: string;
  class: { id: number; name: string };
  teacher: { id: number; department: string } | null;
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        setError('فشل في جلب المواد');
      }
    };
    fetchSubjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">المواد الدراسية</h1>
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        تسجيل الخروج
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {subjects.map((subject) => (
          <li key={subject.id} className="p-2 border-b">
            {subject.name} ({subject.code}) - الصف: {subject.class.name}
            {subject.teacher && `, المعلم: ${subject.teacher.department}`}
          </li>
        ))}
      </ul>
      <Link href="/study-materials" className="text-blue-500 underline mt-4 block">
        عرض  ملفات المواد الدراسية
      </Link>
    </div>
  );
}