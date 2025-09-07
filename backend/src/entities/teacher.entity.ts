import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subject } from './subject.entity';
import { StudyMaterial } from './study-material.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];

  @OneToMany(() => StudyMaterial, (studyMaterial) => studyMaterial.uploaded_by)
  studyMaterials: StudyMaterial[];
}