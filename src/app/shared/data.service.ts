import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  //Addstudent
  addStuden(student: Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Student').add(student);
  }

  //Get All Student
  getAllStudents() {
    return this.afs.collection('/Student').snapshotChanges();
  }

  //Delete a Student
  deleteStudent(student:Student) {
    return this.afs.doc('/Student/'+student.id).delete();
  }

 //Update a Student
  updateStudent(student:Student) {
    this.deleteStudent(student)
    this.addStuden(student)
  }


}
