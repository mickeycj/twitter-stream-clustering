declare var require: any;

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Subscription } from 'rxjs';

import { ClusteringService } from '../shared/services/clustering.service';

import { Atom } from './../shared/models/atom.model';

const p5 = require('p5');

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  private sketchId = 'sketch-detail';

  private clusterId: number;

  private atom: Atom;
  
  private colorIndex: number;

  private atomSubscription: Subscription;
  
  private clusterSubscription: Subscription;

  cluster: any;

  heightLarge: number;
  heightSmall: number;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private clusteringService: ClusteringService
  ) {
    this.iconRegistry.addSvgIcon(
      'likes',
      this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/like.svg')
    );
    this.iconRegistry.addSvgIcon(
      'retweets',
      this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/retweet.svg')
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.clusterId = params.get('id');
      this.clusterSubscription = this.clusteringService.clustering.subscribe((response: Response) => {
        this.cluster = response['clusters'][this.clusterId - 1];
        if (!this.colorIndex) {
          this.colorIndex = this.clusterId - 1;
        }
      })
    });

    this.createCanvas();
  }

  private createCanvas() {
    new p5((sketch: any) => {
      
      const width = sketch.windowWidth * 0.4;
      const height = sketch.windowWidth * 0.45;
      const framerate = 60;
      const gray = '#383838';
      const brown = '#D4CECD'
      const colors = ['#94525e', '#6f5e5b', '#403f69', '#a4ae9e', '#b79147', '#b34f3d', '#6b81a9', '#ab83ae'];
      const diameter = width * 0.3;

      sketch.setup = () => {
        this.heightLarge = height;
        this.heightSmall = this.heightLarge - 148;

        sketch.createCanvas(width, height);
        sketch.frameRate(framerate);
        
        sketch.ellipseMode(sketch.CENTER);
        sketch.rectMode(sketch.CENTER);
        sketch.angleMode(sketch.DEGREES);

        sketch.textSize(20);
        sketch.textFont('Nunito');
        sketch.textAlign(sketch.CENTER, sketch.CENTER);

        this.atomSubscription = this.clusteringService.clustering.subscribe((response: Response) => {
          if (response['clusters']) {
            const cluster = response['clusters'][this.clusterId - 1];
            if (cluster) {
              if (!this.atom) {
                this.atom = new Atom(cluster['id'], cluster['hashtag'], width / 2, height / 2, diameter, cluster['size'], colors[this.colorIndex], sketch);
              } else {
                this.colorIndex = (this.colorIndex + 1) % 8;

                this.atom.hashtag = cluster['hashtag'];
                this.atom.numElectrons = cluster['size'];
                this.atom.updateColor(colors[this.colorIndex]);
              }
            }
          }
        });
      };

      sketch.draw = () => {
        sketch.background(brown);

        if (this.atom) {
          this.atom.draw(sketch);
        }
      };
    }, this.sketchId);
  }

  ngOnDestroy() {
    this.atomSubscription.unsubscribe();
    this.clusterSubscription.unsubscribe();
  }

}
