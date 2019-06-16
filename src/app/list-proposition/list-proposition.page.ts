import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list-proposition',
  templateUrl: './list-proposition.page.html',
  styleUrls: ['./list-proposition.page.scss'],
})
export class ListPropositionPage implements OnInit {

  items: Array<any>;
  myGroups: any;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
    this.myGroupsList().subscribe(data => {
 
      this.myGroups = data.map(e => {
        return {
          id: e.payload.doc.id,
          Name: e.payload.doc.data()['name'],
          Description: e.payload.doc.data()['description'],
          Location: e.payload.doc.data()['location'],
          Nb_People: e.payload.doc.data()['nb_people'],
          Nb_Proposal: e.payload.doc.data()['nb_proposal'],
          User: e.payload.doc.data()['user'],
        };
      })
      console.log(this.myGroups);
 
    });
  }

  async getData(){
    const loading = await this.loadingCtrl.create({
      message: 'Veuillez patienter...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      })
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  myGroupsList() {
    return this.firestore.collection('group').snapshotChanges();
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

}
