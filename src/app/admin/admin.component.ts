import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  candidates = [];
  createCandidates = {
    id: '',
    username: '',
    name: '',
    role: '',
    phone: '',
    date: Date.now(),
  };
  showform = false;
  usedUsername = false;
  usedPhone = false;

  editCandidateId = '';
  submitted = false;
  indexPost = '';
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'phone',
    'role',
    'action',
  ];
  angForm: FormGroup;
  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: [''],
      username: ['', Validators.required],
      phone: [''],
      role: [''],
    });
  }
  ngOnInit(): void {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);

      this.candidates = data;
    });
  }

  saveCandidate() {
    const data = {
      id: '',
      username: this.createCandidates.username,
      name: this.createCandidates.name,
      role: this.createCandidates.role,
      phone: this.createCandidates.phone,
      date: Date.now(),
    };
    this.candidateId(data.username, data.phone);

    if (this.editCandidateId) {
      if (
        data.username == '' ||
        data.phone == '' ||
        data.role == '' ||
        data.name == ''
      ) {
        Swal.fire('Sorry! dont leave fields empty!');
      } else {
        console.log(this.editCandidateId);

        this.apiService.updateCandidate(this.editCandidateId, data).subscribe(
          (response) => {
            this.candidates = this.candidates.filter(
              (item) => item.id !== this.editCandidateId
            );
            this.candidates.push(response);
            this.candidates = [...this.candidates];
            this.submitted = true;
            this.angForm.reset();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      if (
        data.username == '' ||
        data.phone == '' ||
        data.role == '' ||
        data.name == ''
      ) {
        Swal.fire('Please, dont leave fields empty');
      } else {
        if (this.usedUsername || this.usedPhone) {
          if (this.usedUsername) {
            Swal.fire('Please, this username already exists.');
            this.createCandidates.username = '';
          }

          if (this.usedPhone) {
            Swal.fire('Please, this phone already exists.');
            this.createCandidates.phone = '';
          }
        } else {
          console.log(this.usedPhone);
          this.apiService.createCandidate(data).subscribe(
            (response) => {
              console.log(response);
              this.candidates.push(response);
              this.candidates = [...this.candidates];
              this.submitted = true;
              this.angForm.reset();
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    }

    console.log(data);
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteCandidate(id).subscribe((response) => {
          this.candidates = this.candidates.filter((item) => item.id !== id);
          Swal.fire('Deleted!', 'Your candidate has been deleted.', 'success');
        });
      }
    });
  }

  updateCandidate(id, data, index) {
    this.showform = true;
    this.indexPost = index;
    this.editCandidateId = id;
    this.createCandidates.name = data.name;
    this.createCandidates.username = data.username;
    this.createCandidates.phone = data.phone;
    this.createCandidates.role = data.role;

    console.log(this.createCandidates);
  }

  candidateId(username, phone) {
    this.apiService.get().subscribe((data: any[]) => {
      this.usedUsername = data.some((data) => data.username == username);
      this.usedPhone = data.some((data) => data.phone == phone);
    });
  }

  showforms(info) {
    this.showform = info;
  }
}
