import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private modalService: NgbModal) {
  }
  title = 'Polos Luciana';

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
