import { Component, OnInit } from '@angular/core';
import { CommonService } from './shared/service/common.service';
import { SpaceXModel, YearModel } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  spaceXApi: string = "https://api.spaceXdata.com/v3/launches?limit=100";
  launchFilterApi: string = "&launch_success=";
  landingFilterApi: string = "&land_success=";
  yearFilterApi: string = "&launch_year=";
  
  spaceXList: Array<SpaceXModel>;
  public showOverlay = false;
  parameters = {
    Year: -1,
    Launch: -1,
    Land: -1
  };
  yearList: YearModel[] = [
    { "value": 2006, "isActive": false }, { "value": 2007, "isActive": false },
    { "value": 2008, "isActive": false }, { "value": 2009, "isActive": false },
    { "value": 2010, "isActive": false }, { "value": 2011, "isActive": false },
    { "value": 2012, "isActive": false }, { "value": 2013, "isActive": false },
    { "value": 2014, "isActive": false }, { "value": 2015, "isActive": false },
    { "value": 2016, "isActive": false }, { "value": 2017, "isActive": false },
    { "value": 2018, "isActive": false }, { "value": 2019, "isActive": false },
    { "value": 2020, "isActive": false }];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.spaceXList = [];
    this.getData(this.spaceXApi);
  }

  getData(url: string) {
    this.showOverlay = true;
    this.commonService.getData(url).subscribe(
      (data: SpaceXModel[]) => { this.spaceXList = data; this.showOverlay = false },
      error => this.showOverlay = false
    )
  }

  yearFilter(year: YearModel) {
    const activate: boolean = year.isActive;
    this.yearList.map(x => x.isActive = false);
    year.isActive = !activate;
    this.parameters.Year = year.isActive ? year.value : -1;
    this.makeFilter();
  }

  makeFilter() {
    let filterApi: string = this.spaceXApi;
    if (this.parameters.Year > 0) {
      filterApi = filterApi + this.yearFilterApi + this.parameters.Year;
    }
    if (this.parameters.Launch >= 0) {
      filterApi = filterApi + this.launchFilterApi + (this.parameters.Launch ? true : false);
    }
    if (this.parameters.Land >= 0) {
      filterApi = filterApi + this.landingFilterApi + (this.parameters.Land ? true : false);
    }
    this.getData(filterApi);
  }
}
