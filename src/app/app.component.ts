import { Component } from '@angular/core';

import { ClusteringService } from './shared/services/clustering.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Twitter Stream Clustering';
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  constructor(private clusteringService: ClusteringService) { }

  ngOnInit() {
    this.getClusters();
    setInterval(() => this.getClusters(), 5000);
  }

  private getClusters() {
    this.clusteringService.getClusters().subscribe((response: Response) => {
      this.clusteringService.storeClustering(response);
    });
  }

}
