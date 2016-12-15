import { Component, OnInit } from '@angular/core';
import { Hex, get_neighbors, offset_hexes,
         generate_points, hex_to_letter, hex_side } from '../hex';

@Component({
  selector: 'app-tile-test',
  templateUrl: './tile-test.component.html',
  styleUrls: ['./tile-test.component.css']
})
export class TileTestComponent implements OnInit {
  hex: Hex;
  size: number = 50;
  side_a: number = 0;
  side_b: number = 3;
  side_a2: number = 1;
  side_b2: number = 4;
  city: boolean = false;

  constructor() { }

  ngOnInit() {
      this.redraw();
  }

  redraw(){
      this.hex = offset_hexes(1, 1, this.size);
      generate_points(this.hex, this.size);
  }

  generate_path(side_a, side_b){
      let a = hex_side(this.hex.center, this.size, side_a);
      let b = hex_side(this.hex.center, this.size, side_b);
      let curve = `${this.hex.center.x} ${this.hex.center.y}`
      return `M ${a.x} ${a.y} Q ${curve}, ${b.x} ${b.y}`
  }

}
