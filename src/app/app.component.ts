import { Component, OnInit } from '@angular/core';
import { Hex, Board,
         get_neighbors,
         generate_points, hex_to_letter } from './hex';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hexes: Hex[] = [];
  board: Board;
  debug_string: string = "";

  ngOnInit(){
     this.board = {
         x_size: 1000,
         y_size: 1000,
         columns: 15,
         rows: 15
     };
     this.set_hexes();
  }

  set_hexes(){
     this.hexes = [];
     for(let x = 1; x < this.board.columns + 1; x++){
         for(let y = 1; y < this.board.rows + 1; y++){
             this.hexes.push(generate_points(x, y, this.board));
         }
     }
  }

  to_letter(hex: Hex): string{
      return hex_to_letter(hex);
  }

  debug(hex: Hex){
      //this.debug_string=JSON.stringify(hex);
      for(let h of this.hexes){
          h.color = "";
      }
      hex.color = "#ffffff";
      for(let h2 of get_neighbors(hex, this.hexes)){
          h2.color = "#555";
      }
      this.debug_string=hex_to_letter(hex);
  }
}
