import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { Constants } from '../Constants.models';
import { LoadingController } from '@ionic/angular';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor{

    constructor(
        private loadCtrl: LoadingController
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = localStorage.getItem('token');

        if(token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Api-Key': Constants.USER_API_KEY,
                    'X-Token': token
                }
            })
        }

        if(!token) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Api-Key': Constants.USER_API_KEY
                },
                responseType: 'json'
            });
        }

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if(event instanceof HttpResponse) {
                    console.log('event--->', event);
                    this.presentToast();
                }
                // loader will dismissed if complete
                // this.hideLoader();
                finalize(async() => {
                    this.loadCtrl.dismiss();
                })
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                alert(error.error.message);
                // loader will dismissed when complete error
                // this.hideLoader();
                return throwError(error);
            }));
    }

    async presentToast(){
        const load = await this.loadCtrl.create({
            spinner: null,
            message: `<img src="../assets/spin.gif" class="spiner">`,
        }).then((res) => {
            res.present();

            res.onDidDismiss().then(() => {
                console.log('Loader dismiss')
            });
        });
        this.hideLoader();
    }

    hideLoader() {
       this.loadCtrl.dismiss();
    }

    
}