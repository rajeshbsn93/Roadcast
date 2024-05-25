import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ContactEntity, ListService } from '../services/list.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,MatButtonModule,MatDialogModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
    private listService:ListService,
    @Inject(MAT_DIALOG_DATA) public data: ContactEntity,
    private dialog:MatDialog
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      id:[null]
    });
  }

  ngOnInit(): void {
    console.log('data',this.data)
    if (this.data) {
      this.contactForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // this.save.emit(this.contactForm.value);
      if(this.data){
        this.listService.updateContact(this.contactForm.value);
        this.dialog.closeAll();
      }else{
        this.listService.addContact(this.contactForm.value)
        this.dialog.closeAll()
      }

    }
  }
}
