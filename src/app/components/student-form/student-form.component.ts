import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService, Student } from '../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  studentId?: number; // <-- declare the property

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute // <-- to read route params for editing
  ) {}

  ngOnInit(): void {
    // Read student ID from route if editing
    this.studentId = this.route.snapshot.params['id'];

    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, Validators.required]
    });

    // If editing, load the student data
    if (this.studentId) {
      this.studentService.getById(this.studentId).subscribe((student: Student) => {
        this.studentForm.patchValue(student);
      });
    }
  }

  submit() {
    if (this.studentForm.valid) {
      const student: Student = this.studentForm.value;

      if (this.studentId) {
        // update existing student
        this.studentService.update(this.studentId, student).subscribe(() => {
          alert('Student updated successfully!');
          this.router.navigate(['/']);
        });
      } else {
        // create new student
        this.studentService.create(student).subscribe(() => {
          alert('Student added successfully!');
          this.router.navigate(['/']);
        });
      }
    }
  }
}
