import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

const BACKEND_URL = 'http://localhost:8000/';
const CLUSTERING_URL = BACKEND_URL + 'clustering/';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {

  private _clustering = new BehaviorSubject<any>({});
  clustering = this._clustering.asObservable();

  constructor(private http: HttpClient) { }

  getClusters() {
    return this.http.get(CLUSTERING_URL);
  }

  storeClustering(clustering: any) {
    console.log('Stored data: ' + clustering)
    this._clustering.next(clustering);
  }
  
}
