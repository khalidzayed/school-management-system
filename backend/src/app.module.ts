import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { TeachersModule } from './teachers/teachers.module';
import { ParentsModule } from './parents/parents.module';
import { SubjectsModule } from './subjects/subjects.module';
import { ExamsModule } from './exams/exams.module';
import { GradesModule } from './grades/grades.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TimetableModule } from './timetable/timetable.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { MessagesModule } from './messages/messages.module';
import { StudyMaterialsModule } from './study-materials/study-materials.module';
import { DownloadsModule } from './downloads/downloads.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'school_management',
      autoLoadEntities: true,
      synchronize: false, // للتطوير فقط
    }),
    UsersModule,
    StudentsModule,
    ClassesModule,
    TeachersModule,
    ParentsModule,
    SubjectsModule,
    ExamsModule,
    GradesModule,
    AttendanceModule,
    TimetableModule,
    AnnouncementsModule,
    MessagesModule,
    StudyMaterialsModule,
    DownloadsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}