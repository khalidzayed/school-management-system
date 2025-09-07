import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyMaterial } from '../entities/study-material.entity';
import { CreateStudyMaterialDto } from './dto/create-study-material.dto';
import { Class } from '../entities/class.entity';
import { Subject } from '../entities/subject.entity';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class StudyMaterialsService {
  constructor(
    @InjectRepository(StudyMaterial)
    private studyMaterialsRepository: Repository<StudyMaterial>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async findAll(subjectId?: number): Promise<StudyMaterial[]> {
    const query = this.studyMaterialsRepository
      .createQueryBuilder('studyMaterial')
      .leftJoinAndSelect('studyMaterial.class', 'class_id')
      .leftJoinAndSelect('studyMaterial.subject', 'subject_id')
      .leftJoinAndSelect('studyMaterial.uploaded_by', 'uploaded_by');
    if (subjectId) {
      query.where('studyMaterial.subject_id = :subjectId', { subjectId });
    }
    return query.getMany();
  }

  async findOne(id: number): Promise<StudyMaterial | null> {
    return this.studyMaterialsRepository.findOne({
      where: { id },
      relations: ['class_id', 'subject_id', 'uploaded_by'],
    });
  }

  async create(createStudyMaterialDto: CreateStudyMaterialDto): Promise<StudyMaterial> {
    const studyMaterial = new StudyMaterial();
    const classEntity = await this.classRepository.findOne({ where: { id: createStudyMaterialDto.class_id } });
    const subjectEntity = await this.subjectRepository.findOne({ where: { id: createStudyMaterialDto.subject_id } });
    const teacherEntity = await this.teacherRepository.findOne({ where: { id: createStudyMaterialDto.uploaded_by } });

    if (!classEntity) {
      throw new BadRequestException(`Class with id ${createStudyMaterialDto.class_id} not found`);
    }
    if (!subjectEntity) {
      throw new BadRequestException(`Subject with id ${createStudyMaterialDto.subject_id} not found`);
    }
    if (!teacherEntity) {
      throw new BadRequestException(`Teacher with id ${createStudyMaterialDto.uploaded_by} not found`);
    }

    studyMaterial.class = classEntity;
    studyMaterial.subject = subjectEntity;
    studyMaterial.uploaded_by = teacherEntity;
    studyMaterial.title = createStudyMaterialDto.title;
    studyMaterial.file_path = createStudyMaterialDto.file_path || '/uploads/default.pdf';

    return this.studyMaterialsRepository.save(studyMaterial);
  }

  async remove(id: number): Promise<void> {
    await this.studyMaterialsRepository.delete(id);
  }
}