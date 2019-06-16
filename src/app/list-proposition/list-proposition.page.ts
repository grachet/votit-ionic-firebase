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
  myPropositions: any;
  group: any;

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

    this.myPropositionsList().subscribe(data => {
      this.myPropositions = data.map(e => {
        // if(this.route.params._value.id == e.payload.doc.id){
          return {
            id: e.payload.doc.id,
            Down: e.payload.doc.data()['down'],
            Proposer: e.payload.doc.data()['proposer'],
            Title: e.payload.doc.data()['title'],
            Up: e.payload.doc.data()['up'],
            Id: e.payload.doc.data()['id']
          };
        // }
      })
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

  myPropositionsList() {
    return this.firestore.collection('propositions').snapshotChanges();
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
