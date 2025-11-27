import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentListComponent } from './app/components/student-list/student-list.component';
import { StudentFormComponent } from './app/components/student-form/student-form.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule.forRoot([
        { path: '', component: StudentListComponent },
        { path: 'add', component: StudentFormComponent }
      ])
    )
  ]
}).catch((err: any) => console.error(err));
