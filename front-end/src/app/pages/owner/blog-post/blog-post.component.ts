import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  form: any = {};
  user_data: any = []
  post_data: any = []
  userLogin: number
  token: string;
  constructor(
    public tokenStorage: TokenStorageService,
    public authService: AuthService,
    public dialogService: DialogService,
    public blogService: BlogService,
    public commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.token = this.tokenStorage.getToken()
    const user = this.tokenStorage.getUser();
    this.userLogin = parseInt(user.id)
    this.authService.findGuestAll(this.token).subscribe(response => {
      this.user_data = response;
    })
    this.blogService.findAll(this.token).subscribe(response => {
      this.post_data = response
      for (let index = 0; index < this.post_data.length; index++) {
        this.authService.findById(this.post_data[index].user_post, this.token).subscribe(response => {
          this.post_data[index]['name_user_post'] = response.name + ' ' + response.surname
        })
        if (this.post_data[index].send_from) {
          this.authService.findById(this.post_data[index].send_from, this.token).subscribe(response => {
            if (response) {
              this.post_data[index]['name_user_send_from'] = response.name + ' ' + response.surname
            }
            else {
              this.post_data[index]['name_user_send_from'] = 'ผู้ใช้งาน'
            }
          })
        }
        else {
          this.post_data[index]['name_user_send_from'] = 'ทั้งหมด'
        }
      }
    });
  }
  onSubmit() {
    this.dialogService.openDialogConfirm('ยืนยันโพสต์', 'ยืนยันข้อมูลใช่หรือไม่?').afterClosed().subscribe(res => {
      if (res === "true") {
        const user = this.tokenStorage.getUser();
        this.form['user_post'] = parseInt(user.id)
        if (this.form.send_from) {
          this.form.send_from = parseInt(this.form.send_from)
        }
        this.blogService.createPost(this.token, this.form).subscribe(response => {
          this.reloadPage()
        })
      }
    })
  }

  viewComment(id: number) {
    this.dialogService.openDialogViewComment(this.token, id, this.userLogin).afterClosed().subscribe(res => { })
  }

  updatePost(data: any) {
    this.dialogService.openDialogEditPost(this.token, data).afterClosed().subscribe(res => {
      if (res === true) {
        this.reloadPage()
      }
    })
  }

  delete(id: number) {
    this.dialogService.openDialogConfirm('ยืนยันโพสต์', 'ยืนยันข้อมูลใช่หรือไม่?').afterClosed().subscribe(res => {
      if (res === "true") {
        this.blogService.deletePost(this.token, id).subscribe(deletePost => {
          this.commentService.deleteCommentAll(this.token, id).subscribe(deleteComment => {
            if (deleteComment.status === true) {
              this.reloadPage()
            }
          })
        })
      }
    })
  }

  reloadPage(): void {
    // โหลดหน้า
    window.location.reload();
  }
}
