import { Component, OnInit } from '@angular/core';
import { Hex, get_neighbors, offset_hexes,
         generate_points, hex_to_letter } from '../hex';

@Component({
  selector: 'app-tile-test',
  templateUrl: './tile-test.component.html',
  styleUrls: ['./tile-test.component.css']
})
export class TileTestComponent implements OnInit {
  hex: Hex;
  size: number;

  constructor() { }

  ngOnInit() {
      this.size = 50;
      this.hex = offset_hexes(1, 1, this.size);
      generate_points(this.hex, this.size);
  }

}
