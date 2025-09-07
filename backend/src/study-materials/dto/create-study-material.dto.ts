export class CreateStudyMaterialDto {
  class_id: number;
  subject_id: number;
  title: string;
  uploaded_by: number;
  file_path?: string; // اختياري لأنه سيتم تعيينه بواسطة Multer
}