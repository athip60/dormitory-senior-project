import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LeaseService } from 'src/app/shared/services/lease.service';

@Component({
  selector: 'app-add-update-img',
  templateUrl: './add-update-img.component.html',
  styleUrls: ['./add-update-img.component.scss']
})
export class AddUpdateImgComponent implements OnInit {
  progressBar = false;
  image1: string;
  image2: string;
  image3: string;
  url1: string = "../../../assets/images/not-loadimg.jpg";
  url2: string = "../../../assets/images/not-loadimg.jpg";
  url3: string = "../../../assets/images/not-loadimg.jpg";
  form: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AddUpdateImgComponent>,
    public dialogService: DialogService,
    public leaseService: LeaseService
  ) { }

  ngOnInit(): void {
    if (this.data.data.photo_1 != null && this.data.data.photo_2 != null && this.data.data.photo_3 != null) {
      this.url1 = `../../../assets/uploads/lease/${this.data.data.photo_1}`
      this.url2 = `../../../assets/uploads/lease/${this.data.data.photo_2}`
      this.url3 = `../../../assets/uploads/lease/${this.data.data.photo_3}`
    }
    this.form = {
      id: this.data.data.id,
      status: this.data.data.status,
      photo_1: this.data.data.photo_1,
      photo_2: this.data.data.photo_2,
      photo_3: this.data.data.photo_3
    }
  }

  selectImage1(event) {
    if (event.target.files.length > 0) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url1 = event.target.result
      }
      const file = event.target.files[0];
      this.image1 = file;
    }
  }
  selectImage2(event) {
    if (event.target.files.length > 0) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url2 = event.target.result
      }
      const file = event.target.files[0];
      this.image2 = file;
    }
  }

  selectImage3(event) {
    if (event.target.files.length > 0) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url3 = event.target.result
      }
      const file = event.target.files[0];
      this.image3 = file;
    }
  }

  onSubmit() {
    this.progressBar = true;
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    formData1.append('file', this.image1);
    formData2.append('file', this.image2);
    formData3.append('file', this.image3);
    this.leaseService.postPhotoLease1(this.data.token, formData1, this.data.data.room_number + '_1').subscribe((file) => {
      this.leaseService.uploadPhotoLease1(this.data.token, file, this.data.data.id).subscribe((res) => {
      })
    })
    this.leaseService.postPhotoLease2(this.data.token, formData1, this.data.data.room_number + '_2').subscribe((file) => {
      this.leaseService.uploadPhotoLease2(this.data.token, file, this.data.data.id).subscribe((res) => {
      })
    })
    this.leaseService.postPhotoLease3(this.data.token, formData1, this.data.data.room_number + '_3').subscribe((file) => {
      this.leaseService.uploadPhotoLease3(this.data.token, file, this.data.data.id).subscribe((res) => {
      })
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }
}
