import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ContactEntity, ListService } from '../services/list.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-pro-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contacts: MatTableDataSource<ContactEntity> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator!:MatPaginator
  @ViewChild(MatSort) sort!:MatSort

  constructor(private listService: ListService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.listService.getContacts().subscribe(data => {
      // this.contacts.data = data;
      this.contacts.data = data;
      this.contacts.paginator = this.paginator
      this.contacts.sort = this.sort

    });
  }
  addEdit(data:any){
    let dialogRef
    if(data){
      console.log('edit')  
      dialogRef = this.dialog.open(AddEditComponent,{
        width:'900px',
        data:data,
        autoFocus:false
      })
    }else{
      console.log('add') 
      dialogRef = this.dialog.open(AddEditComponent,{
        width:'900px',
        data:data,
        autoFocus: false
      })     
    }
    dialogRef?.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteContact(rowData: ContactEntity) {
    const deleteMeaage = {message:'Do you realy want to delete this record? This process cannot be undone.',title:'Delete Confirmation'}
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      width:'350px',
      data:deleteMeaage
    })
    // alert('Contact deleted successfully!');
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.listService.deleteContact(rowData.id);
      }
    })
    
  }
}
