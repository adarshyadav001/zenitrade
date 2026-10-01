import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; import { FormsModule } from '@angular/forms'; import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn=(req,next)=>{const t=localStorage.getItem('zt_token');return next(t?req.clone({setHeaders:{Authorization:`Bearer ${t}`}}):req)};
type Stock={symbol:string;companyName:string;sector:string;currentPrice:number;previousClose:number};
@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.component.html',styleUrl:'./app.component.css'})
export class AppComponent { private http=inject(HttpClient); api='http://localhost:8080/api'; token=localStorage.getItem('zt_token'); page='home'; isLogin=true; name=''; email=''; password=''; error=''; stocks:Stock[]=[]; indices:any[]=[]; portfolio:any; wallet:any; query=''; selected?:Stock; quantity=1; side='BUY'; fundsAmount=10000; fundsMethod='UPI';
 constructor(){if(this.token)this.load();}
 auth(){this.error='';const body=this.isLogin?{email:this.email,password:this.password}:{name:this.name,email:this.email,password:this.password};this.http.post<any>(`${this.api}/auth/${this.isLogin?'login':'register'}`,body).subscribe({next:r=>{localStorage.setItem('zt_token',r.token);this.token=r.token;this.name=r.name;this.load();},error:e=>this.error=typeof e.error==='string'?e.error:'Please check your details'});}
 load(){this.http.get<Stock[]>(`${this.api}/market/stocks`).subscribe(x=>this.stocks=x);this.http.get<any[]>(`${this.api}/market/indices`).subscribe(x=>this.indices=x);this.refreshPortfolio();this.refreshWallet();}
 refreshPortfolio(){this.http.get<any>(`${this.api}/portfolio`).subscribe(x=>this.portfolio=x)} refreshWallet(){this.http.get<any>(`${this.api}/wallet`).subscribe(x=>this.wallet=x)}
 setPage(p:string){this.page=p;if(p==='funds')this.refreshWallet();if(p==='holdings'||p==='positions')this.refreshPortfolio();}
 filtered(){const q=this.query.toLowerCase();return this.stocks.filter(s=>s.symbol.toLowerCase().includes(q)||s.companyName.toLowerCase().includes(q));}
 change(s:Stock){return ((s.currentPrice-s.previousClose)/s.previousClose)*100} money(n:number){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(n||0)}
 trade(){if(!this.selected)return;this.http.post(`${this.api}/trades`,{symbol:this.selected.symbol,quantity:+this.quantity,side:this.side,productType:'DELIVERY'}).subscribe({next:()=>{this.selected=undefined;this.refreshPortfolio();this.refreshWallet();alert('Paper order placed successfully. ₹20 brokerage applied.');},error:e=>alert(typeof e.error==='string'?e.error:'Order could not be placed')});}
 funds(type:string){this.http.post(`${this.api}/wallet`,{type,method:this.fundsMethod,amount:+this.fundsAmount}).subscribe({next:()=>{this.refreshWallet();this.refreshPortfolio();},error:e=>alert(typeof e.error==='string'?e.error:'Could not process demo funds')});}
 logout(){localStorage.removeItem('zt_token');this.token=null;this.page='home';}
}
