import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ParseService } from './services/parse.service';
import fontawesome from '@fortawesome/fontawesome';
import { faUpload } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private parseService: ParseService) { }

  @HostListener('window:beforeunload') beforeUnloadHander() {
    // return confirm("noo");
  }

  ngOnInit(): void {
    fontawesome.library.add(faUpload);
  }

  fileChanged($event): void {
    this.parseService.loading.next();
    this.title = "Loading...";
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