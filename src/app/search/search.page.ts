import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchGroupPage implements OnInit {
  sampleArr = [];
  resultArr = [];
  ref = firebase.database().ref('group');
  items: Array<any>;
  myGroups: any;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {
  }

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
      });
      console.log(this.myGroups);

    });
  }

  myGroupsList() {
    return this.firestore.collection('group').snapshotChanges();
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Veuillez patienter...'
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData['data'].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  search(event) {
    const searchKey: string = event.target.value;
    const firstLetter = searchKey.toUpperCase();
    if (searchKey.length === 0) {
      this.sampleArr = [];
      this.resultArr = [];
    }
    if (this.sampleArr.length === 0) {
      this.firestore.collection('group', ref => ref.where('name', '==', firstLetter)).snapshotChanges()
        .subscribe(data => {
          data.forEach(childData => {
            this.sampleArr.push(childData.payload.doc.data());
            console.log(this.sampleArr.push(childData.payload.doc.data()['description']));

          });
        });
    } else {
      this.resultArr = [];
      this.sampleArr.forEach(val => {
        const name: string = val['description'];
        if (name.toUpperCase().startsWith(searchKey.toUpperCase())) {
          if (true) {
            this.resultArr.push(val);
            console.log(this.resultArr.push(val));
          }
        }
      });
    }
  }
}

