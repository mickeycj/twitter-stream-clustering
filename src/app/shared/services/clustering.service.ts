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
    const clusters = clustering['clusters'];
    if (clusters) {
      let maxSize = 0;
      clusters.forEach((cluster: any) => {
        const size = cluster['size'];
        if (size > maxSize) {
          maxSize = size;
        }
      });
      const ratio = maxSize / (118 * 0.8);
      clusters.forEach((cluster: any) => cluster['size'] = Math.ceil(cluster['size'] / ratio));
    }
    this._clustering.next(clustering);
  }
  
}
