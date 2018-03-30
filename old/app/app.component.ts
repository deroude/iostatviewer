import { ParseService } from './services/parse.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'iostat-app',
  templateUrl: '../templates/app.component.html',
})
export class AppComponent {

  title: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private parseService: ParseService) { }

  @HostListener('window:beforeunload') beforeUnloadHander() {
    // return confirm("noo");
  }


  fileChanged($event): void {
    this.parseService.loading.next();
    this.title="Loading...";
    //get file
    //need to cast html tag
    //reference： http://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
    var file = (<HTMLInputElement>document.getElementById("file")).files[0];

    //new fileReader
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    //try to read file, this part does not work at all, need a solution
    fileReader.onloadend = (e) => {
      this.parseService.parse(fileReader.result);
      this.title = this.parseService.title;
      this.parseService.trigger.next();
    };
  }


}

