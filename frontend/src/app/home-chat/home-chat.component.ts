import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.css']
})
export class HomeChatComponent {
  constructor(
    private route: ActivatedRoute
  ) {}

  selectedConversationId: number = 0;



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.selectedConversationId = params.get('id'); // Le + convertit la chaîne en nombre
    });
  }

}
