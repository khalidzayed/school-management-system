'use client';
import { useEffect, useState } from 'react';
import { getStudyMaterials, getSubjects } from '@/lib/api';

interface StudyMaterial {
  id: number;
  title: string;
  file_path: string;
  uploaded_at: string;
  class: { id: number; name: string };
  subject: { id: number; name: string };
  uploaded_by: { id: number; department: string };
}

interface Subject {
  id: number;
  name: string;
}

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        setError('فشل في جلب المواد الدراسية');
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const data = await getStudyMaterials(selectedSubject || undefined);
        setMaterials(data);
      } catch (err) {
        setError('فشل في جلب المواد الدراسية');
      }
    };
    fetchMaterials();
  }, [selectedSubject]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">المواد الدراسية</h1>
      <div className="mb-4">
        <label className="block">تصفية حسب المادة</label>
        <select
          value={selectedSubject || ''}
          onChange={(e) => setSelectedSubject(Number(e.target.value) || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">جميع المواد</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material.id} className="p-2 border-b">
            <a href={material.file_path} target="_blank" className="text-blue-500 underline">
              {material.title}
            </a> - الصف: {material.class.name}, المادة: {material.subject.name}, تم الرفع بواسطة: {material.uploaded_by.department}
          </li>
        ))}
      </ul>
    </div>
  );
}