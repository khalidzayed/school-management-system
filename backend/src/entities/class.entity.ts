import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subject } from './subject.entity';
import { StudyMaterial } from './study-material.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Subject, (subject) => subject.class)
  subjects: Subject[];

  @OneToMany(() => StudyMaterial, (studyMaterial) => studyMaterial.class)
  studyMaterials: StudyMaterial[];
}