import { Component, OnInit } from '@angular/core';
import { Hex, Board,
         get_neighbors, offset_hexes,
         generate_points, hex_to_letter } from '../hex';

@Component({
  selector: 'app-board-test',
  templateUrl: './board-test.component.html',
  styleUrls: ['./board-test.component.css']
})
export class BoardTestComponent implements OnInit {

  hexes: Hex[] = [];
  board: Board;
  debug_string: string = "";

  ngOnInit(){
     this.board = {
         x_size: 1500,
         y_size: 1300,
         columns: 15,
         rows: 15,
         size: 50
     };
     this.set_hexes();
  }

  set_hexes(){
     let new_hexes: Hex[] = [];
     for(let x = 1; x < this.board.columns + 1; x++){
         for(let y = 1; y < this.board.rows + 1; y++){
             new_hexes.push(offset_hexes(x, y, this.board.size));
         }
     }
     if(new_hexes.length > 0){
         let point_hex = generate_points(new_hexes[0], this.board.size);
         for(let hex of new_hexes){
             hex.point_string = point_hex.point_string;
             hex.points = point_hex.points;
         }
     }
     this.hexes = new_hexes;
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
