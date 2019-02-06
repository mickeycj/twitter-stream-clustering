import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = 'http://localhost:8000/';
const CLUSTERING_URL = BACKEND_URL + 'clustering/';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {

  constructor(private http: HttpClient) { }

  getClusters() {
    return this.http.get(CLUSTERING_URL);
  }
}
