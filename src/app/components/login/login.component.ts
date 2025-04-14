import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl } from '@angular/forms';
import { ReversePipe } from '../../pipes/reverse.pipe';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,ReversePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
loginForm=true

  practiceForm=new FormGroup({
    n: new FormControl(''),
    e: new FormControl('')

  })

  handleSubmit(){
    let name=
    this.practiceForm.value.n;
     let email=this.practiceForm.value.e;
     let credentials={
      name:name,
      email:email
      }

localStorage.setItem("credentials",JSON.stringify(credentials)
); 
   alert(credentials)
  }


}
