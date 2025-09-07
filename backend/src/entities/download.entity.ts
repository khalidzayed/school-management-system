import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { StudyMaterial } from './study-material.entity';
import { Student } from './student.entity';

@Entity('downloads')
export class Download {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudyMaterial, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'material_id' })
  material: StudyMaterial;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  downloaded_at: Date;
}