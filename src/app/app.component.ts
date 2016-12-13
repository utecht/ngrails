import { Component, OnInit } from '@angular/core';
import { Hex, Board, generate_points } from './hex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  hexes: Hex[] = [];
  board: Board;
  debug_string: string = "";

  ngOnInit(){
     this.board = {
         x_size: 1000,
         y_size: 1000,
         columns: 60,
         rows: 15
     };
     for(let x = 0; x < this.board.columns; x++){
         for(let y = 0; y < this.board.rows; y++){
             this.hexes.push(generate_points(x, y, this.board));
         }
     }
  }

  debug(hex: Hex){
      this.debug_string=JSON.stringify(hex);
  }
}
