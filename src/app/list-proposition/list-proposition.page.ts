import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-list-proposition',
  templateUrl: './list-proposition.page.html',
  styleUrls: ['./list-proposition.page.scss'],
})
export class ListPropositionPage implements OnInit {

  myPropositions: any;
  paramId: string;
  titreGroup: string;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
  }

  ngOnInit() {
    this.paramId = this.route.snapshot.params.id;

    this.getDataGroup().subscribe(data => {
      data.map(e => {
        if(e.payload.doc.id == this.paramId){
          this.titreGroup = e.payload.doc.data()['name'];
        }
      });
    });

    this.myPropositionsList().subscribe(data => {
      this.myPropositions = data.map(e => {
        return {
          id: e.payload.doc.id,
          Down: e.payload.doc.data()['down'],
          Proposer: e.payload.doc.data()['proposer'],
          Title: e.payload.doc.data()['title'],
          Up: e.payload.doc.data()['up'],
          Id: e.payload.doc.data()['id'],
          IdGroup: e.payload.doc.data()['idGroup']
        };
      });
    });
  }

  getDataGroup(){
    return this.firestore.collection('group').snapshotChanges();
  }

  myPropositionsList() {
    return this.firestore.collection('propositions').snapshotChanges();
  }

  addUp(id, dataUp){
    this.firestore.collection("propositions").doc(id).set({ up: ++dataUp }, { merge: true });
  }

  addDown(id, dataDown){
    return this.firestore.collection("propositions").doc(id).set({ down: ++dataDown }, { merge: true });
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
  }

}
