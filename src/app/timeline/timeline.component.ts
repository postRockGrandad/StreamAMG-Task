import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export interface TimelineData {
  time: string,
  fighters: Array<{name: string, surname: string}>,
  image: string
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input('timelineData') timelineData: Array<TimelineData>;
  fightImageSrc: string;
  selectedFightRow: TimelineData;
  imageTransitionFinished: boolean;

  constructor() { 
  }

  ngOnInit(): void {
    //first onInit call is before bindings have values from parent
    //- actual init behaviour in onChanges, under firstChange check (when bindings received from parent) 
  }

  ngOnChanges(changes: SimpleChanges): void {
    //set initial fight selection on first change
    //- i.e. initial binding value passed in by parent component
    if(changes['timelineData']?.firstChange){
      this.selectedFightRow = this.timelineData[0];
      this.imageTransitionEnd();
    }
  }

  selectFight(row: TimelineData): void {
    if(row !== this.selectedFightRow){
      this.imageTransitionFinished = false;
      this.selectedFightRow = row;
    }
  }

  imageTransitionEnd(): void {
    this.imageTransitionFinished = true;
    this.fightImageSrc = "./assets/images/" + this.selectedFightRow.image;
  }
}
