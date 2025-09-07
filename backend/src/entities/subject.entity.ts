// backend/src/entities/subject.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Class } from './class.entity';
import { Teacher } from './teacher.entity';
import { StudyMaterial } from './study-material.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.subjects, { nullable: false })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Teacher, (teacher) => teacher.subjects, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => StudyMaterial, (studyMaterial) => studyMaterial.subject)
  studyMaterials: StudyMaterial[];
}