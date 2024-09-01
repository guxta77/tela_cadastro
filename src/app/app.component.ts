import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { firestore } from './firebase-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor() {}
}
