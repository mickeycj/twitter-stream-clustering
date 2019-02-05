import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:8000/';
const CLUSTERING_URL = BACKEND_URL + 'clustering/';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {

  constructor(private http: HttpClient) { }

  getClusters(from: number, to: number) {
    return this.http.post(
      CLUSTERING_URL,
      {
        'from_idx': from,
        'to_idx': to
      }
    );
  }
}
