import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent implements AfterViewInit {
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser()
  }

  displayedColumns: string[] = ['username', 'name', 'role', 'gender', 'email', 'status', 'action'];
  dataSource: any

  userList: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }


  LoadUser() {
    this.service.getAllUsers().subscribe((res: any) => {
      this.userList = res
      this.dataSource = new MatTableDataSource(this.userList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateUser(id: any) {
    const popup =this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        id
      }
    })
    popup.afterClosed().subscribe(() => {
      this.LoadUser()
    })
  }

  deleteUser(id: any) {
    this.service.deleteUser(id)
    console.log(`Bye-bye ${id}`)
  }
}
