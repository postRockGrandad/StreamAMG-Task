import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticDataService } from '../static-data.service';
import { TimelineData } from '../timeline/timeline.component';

@Component({
  selector: 'app-fight-card-desktop',
  templateUrl: './fight-card-desktop.component.html',
  styleUrls: ['./fight-card-desktop.component.scss']
})
export class FightCardDesktopComponent implements OnInit, OnDestroy {
  //clean up subscriptions 
  susbcriptions: Array<Subscription>;
  dataLoaded: boolean;
  titleComponents: Array<string>;
  timelineData: Array<TimelineData>;  
  description: {
    dateTime: string,
    location: string
  };

  constructor(
    private data: StaticDataService
  ) { 
    this.dataLoaded = false;
    this.susbcriptions = [];
    this.titleComponents = [];
    this.timelineData = [];
    this.description = {
      dateTime: "",
      location: ""
    };
  }

  ngOnInit(): void {
    this.loadStaticData();
  }

  ngOnDestroy(): void {
    //clean up subscriptions on destroy
    //- prevent memory leaks from lingering subs
    this.susbcriptions.forEach(sub =>{
      sub && sub.unsubscribe();
    });
    this.susbcriptions = [];
  }

  loadStaticData(): void {
    let staticDataSub = this.data.getStaticData().subscribe({
      next: (data) => {
        this.titleComponents = data.title;
        let descriptionComponents = data.description.split("PM");
        this.description.dateTime = descriptionComponents[0] + "PM";
        this.description.location = descriptionComponents[1];

        data.matches.forEach((matchConf: any) => {
          this.timelineData.push({time: matchConf.time, fighters: matchConf.fighters, image: matchConf.image})
        });
      },
      error: (e) => {
        //in a live system where real HTTP/API errors may be returned, would also set error binding property
        console.error(e);
      },
      complete: () => {
        //could also unpack data via async pipe in binding to avoid need for this control flag
        this.dataLoaded = true;
      } 
    });

    this.susbcriptions.push(staticDataSub);
  }
}
