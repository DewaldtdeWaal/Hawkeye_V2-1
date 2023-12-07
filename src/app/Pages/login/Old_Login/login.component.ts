import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from 'src/app/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  defaultQuestion:any = "Pet"
  signupForm: FormGroup = {} as FormGroup

  forbiddenpasswords=['1234','0000',"4321","2023"]

  constructor (private router:Router, private auth:UserAuthenticationService)
  {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl('',[Validators.required,Validators.email],this.ForbiddenEmails.bind(this))
     ,'password': new FormControl(null,[Validators.required, this.ForbiddenPasswords.bind(this)])
   });
  }

  OnSubmit()
  {
    this.auth.login(this.signupForm.value.email,this.signupForm.value.password, "/App")
    this.signupForm.reset()
  }

  ForbiddenPasswords(control: FormControl):{[s:string]:boolean} // this is a custom validator
  {
    if(this.forbiddenpasswords.indexOf(control.value) > -1)
      return {'passwordIsForbidden':true}

    return null;
  }

  ForbiddenEmails(control: FormControl): Promise<any> | Observable<any>
  {
    const promise = new Promise((resolve,reject) => {
      setTimeout(() => {  if(control.value == 'brandon@gmail.com')
                            reject({'emailIsForbidden':true})
                          else
                            resolve (null)
    },1500);
    })
    

    return promise;
  }
}
