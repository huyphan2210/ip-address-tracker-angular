import { Component, OnInit } from "@angular/core";

@Component({
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html',
    selector: 'footer'
})
export class Footer implements OnInit {
  challenger = "Huy Phan";
  challengerProfile = "https://github.com/huyphan2210";

    ngOnInit(): void {
        console.log(this.challenger)
    }
}