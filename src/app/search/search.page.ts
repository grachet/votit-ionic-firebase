import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

import {LoadingController, NavController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Rx';



@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchGroupPage implements OnInit {
  searchterm: string;
  startAt = new Subject();
  endAt = new Subject();
  clubs;
  startobs = this.startAt.asObservable();
  endobs = this.endAt.asObservable();

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    Observable.combineLatest(this.startobs, this.endobs).subscribe(value => {
      this.firequery(value[0], value[1]).subscribe((clubs) => {
        this.clubs = clubs;
        console.log(clubs);
      });
    });
  }

  search($event) {
    const q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }

  firequery(start, end) {
    return this.afs.collection('group', ref => ref.limit(10).orderBy('name').startAt(start).endAt(end)).valueChanges();
  }

}

