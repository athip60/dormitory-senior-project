import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  roles: string[];
  data_notify: string[];
  count_unread: number = 0;
  isBadgeHidden: boolean = false
  isLoggedIn: boolean = false;
  showNotification: boolean;
  name: string;
  surname: string;
  email: string;
  opened = true;
  change = 'side';
  routePageTo = ''
  pathShowToolBar = {
    'หน้าหลัก': 'หน้าหลัก',
    'home': 'หน้าหลัก',
    'user-data': 'ข้อมูลผู้เข้าพัก',
    'lease-agreement': 'สัญญาเช่า',
    'room': 'ผังห้องพัก',
    'bill': 'สร้างใบแจ้งชำระเงิน',
    'income': 'ข้อมูลรายรับ-รายจ่าย',
    'blog-post': 'โพสต์บล็อก',
    'private-post': 'โพสต์ส่วนตัว',
  }
  watcher: Subscription;

  constructor(
    mediaObserver: MediaObserver,
    public router: Router,
    public dialogService: DialogService,
    public notifyService: NotifyService,
    public tokenStorageService: TokenStorageService
  ) {
    this.opened = true;
    this.change = 'side';
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.opened = false;
        this.change = 'over';
      } else if (change.mqAlias === 'sm') {
        this.opened = false;
        this.change = 'over';
      } else if (change.mqAlias === 'md') {
        this.opened = true;
        this.change = 'side';
      }
      else {
        this.opened = true;
        this.change = 'side';
      }
    });

  }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.name = user.name;
      this.surname = user.surname;
      this.email = user.email;
      this.notifyService.findNoti(user.accessToken, user.id).subscribe(response => {
        this.data_notify = response
        response.forEach(data => {
          if (data.status === 'unread') {
            this.count_unread += 1
          }
        });
        if (this.count_unread === 0) {
          console.log(this.count_unread);
          this.isBadgeHidden = true
        }
      })
    }

  }

  openNotification(state: boolean) {
    this.showNotification = state;
    this.count_unread = 0
    this.isBadgeHidden = true
    const user = this.tokenStorageService.getUser();
    this.notifyService.updateNoti(user.accessToken, user.id).subscribe(response => {
    })
  }

  logout(): void {
    this.dialogService.openDialogConfirm('ออกจากระบบ', 'คุณต้องการออกจากระบบหรือไม่?').afterClosed().subscribe(res => {
      if (res === "true") {
        this.tokenStorageService.signOut();
        this.router.navigate(['/auth/login'])
      }
    })
  }

  routePathTo(path) {
    this.routePageTo = this.pathShowToolBar[`${path}`]
  }
}
