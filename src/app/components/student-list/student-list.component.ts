import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- needed for *ngFor, *ngIf

@Component({
  selector: 'app-student-list',
  standalone: true,              // <-- make it standalone
  imports: [CommonModule],       // <-- import CommonModule for structural directives
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  deleteStudent(id?: number) {
    if (!id) return;
    this.studentService.delete(id).subscribe(() => {
      this.loadStudents();
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/edit', id]);
  }

  addStudent() {
    this.router.navigate(['/add']);
  }
}
