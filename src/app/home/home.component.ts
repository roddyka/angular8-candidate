import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  createPosts = {
    id: '',
    username: 'ADMIN',
    title: 'Message to Candidate',
    content: '',
  };
  editPostId = '';
  submitted = false;
  angForm: FormGroup;
  posts = [];
  candidates: string[] = [];
  mentionConfig = {};
  indexPost = '';
  myControl = new FormControl();
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public sanitizer: DomSanitizer
  ) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      content: [''],
    });
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
            mentionSelect: this.formatter,
            labelKey: 'username',
          },
          {
            items: this.candidates,
            triggerChar: '#',
            maxItems: 10,
            mentionSelect: this.formatterPhone,
            labelKey: 'phone',
          },
        ],
      };
    });
  }

  formatter(selection): string {
    return (
      "<employee id='" +
      selection.id +
      "'>@" +
      selection.username +
      '</employee>'
    );
  }

  formatterPhone(selection): string {
    return (
      "<employee id='" + selection.id + "'>#" + selection.phone + '</employee>'
    );
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

  onClickSubmit(content) {
    this.savePost();
  }

  savePost() {
    const data = {
      id: '',
      username: 'ADMIN',
      title: 'Message to Candidate',
      content: this.createPosts.content,
      date: Date.now(),
    };
    if (this.editPostId) {
      if (!data.content) {
        Swal.fire('Sorry! You need write your message!');
      } else {
        this.apiService.updatePost(this.editPostId, data).subscribe(
          (response) => {
            this.posts = this.posts.filter(
              (item) => item.id !== this.editPostId
            );
            this.posts.push(response);
            this.createPosts.content = '';
            this.editPostId = '';
            this.submitted = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      if (!data.content) {
        Swal.fire('Sorry! You need write your message!');
      } else {
        this.apiService.createPost(data).subscribe(
          (response) => {
            console.log(response);
            this.posts.push(response);
            this.submitted = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }

    console.log(data);
  }

  updatePosts(id, content, index) {
    this.indexPost = index;
    this.editPostId = id;
    this.createPosts.content = content;
  }

  public user(id) {
    console.log(id);
  }

  click(evt) {
    const href = evt.target.getAttribute('id');
    if (href) {
      evt.preventDefault();
      console.log(href);
      const ipAPI = 'http://localhost:3000/candidates/' + href;

      Swal.queue([
        {
          title: 'Look this candidate?',
          confirmButtonText: 'Show information about the candidate',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return fetch(ipAPI)
              .then((response) => response.json())
              .then((data) =>
                Swal.insertQueueStep({
                  title: data.username,
                  html: `<div class="infoUser" style='text-align:left'><p>Name: ${data.name}</p><p>Role: ${data.role}</p><p>Phone: ${data.phone}</p></div>`,
                })
              )
              .catch(() => {
                Swal.insertQueueStep({
                  icon: 'error',
                  title: 'Unable to get your public IP',
                });
              });
          },
        },
      ]);
    }
  }
}
