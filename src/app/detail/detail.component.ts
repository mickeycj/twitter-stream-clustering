import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';

import { ClusteringService } from '../shared/services/clustering.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  cluster: any;

  constructor(private route: ActivatedRoute, private clusteringService: ClusteringService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      const cluster_id = params.get('id');
      this.subscription = this.clusteringService.clustering.subscribe((response: Response) => {
        this.cluster = response['clusters'][cluster_id];
        console.log(this.cluster['hashtag']);
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
