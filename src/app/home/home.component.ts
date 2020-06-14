import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  angForm: FormGroup;
  posts = [];
  candidates: string[] = [];
  mentionConfig = {};

  myControl = new FormControl();
  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      content: [''],
    });
  }
  onClickSubmit(content) {
    alert('Your Email is : ' + content);
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((data: any[]) => {
      console.log(data);
      this.posts = data;
    });

    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      this.candidates = data;
      console.log(this.candidates);
      this.mentionConfig = {
        mentions: [
          {
            items: this.candidates,
            triggerChar: '@',
            maxItems: 10,
            labelKey: 'username',
          },
          {
            items: this.candidates,
            triggerChar: '#',
            maxItems: 10,
            labelKey: 'phone',
          },
        ],
      };
    });
  }

  deleteItem(post) {
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
        this.apiService.deletePost(post.id).subscribe((response) => {
          this.posts = this.posts.filter((item) => item.id !== post.id);
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }

  editPost(post) {
    console.log(post);
  }
}
