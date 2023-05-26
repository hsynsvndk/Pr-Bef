import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider,GithubAuthProvider,FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //Login Method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');

        if (res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        }else{
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }

  //Register Method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res:any) => {
        alert('Registration Successful')
        this.router.navigate(['/login']);
        this.sendEmailForVerification(res.user)
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }


  //Signout Method
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }


  //ForgotPassword Method
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert("Something went wrong");
      }
    );
  }



  // email verification

  sendEmailForVerification(user:any){
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['/verify-email'])
    }),(err:any) => {
      alert("Something went wrong, Not able to send mail to your email. ");
    }
  }


  //Google Sign Method
  googleSignIn() {
    this.fireauth.signInWithPopup(new GoogleAuthProvider).then((res) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token',JSON.stringify(res.user?.uid));
      },(err) => {
        alert(err.message);
      }
    );
  }


}
