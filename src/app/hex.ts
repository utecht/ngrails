export interface Point {
    x: number;
    y: number;
}

export interface Hex {
    x: number;
    y: number;
    point_string?: string;
    points?: Point[];
    center: Point;
    origin: Point;
    color?: string;
}

export interface Board {
    x_size: number;
    y_size: number;
    columns: number;
    rows: number;
    size: number;
}

export function hex_to_letter(hex: Hex): string{
    let letter = String.fromCharCode(64 + hex.y);
    let num = hex.x * 2;
    if(hex.y % 2 != 0){
        num = num - 1;
    }
    return letter + num;
}

export function get_neighbors(hex: Hex, hexes: Hex[]): Hex[]{
    let ret: Hex[] = [];
    for(let h of hexes){
        if(hex.y % 2 == 0){
            if(
                (h.x + 1 === hex.x && h.y === hex.y) ||
                (h.x - 1 === hex.x && h.y === hex.y) ||
                (h.x - 1 === hex.x && h.y - 1 === hex.y) ||
                (h.x - 1 === hex.x && h.y + 1 === hex.y) ||
                (h.x  === hex.x && h.y + 1 === hex.y) ||
                (h.x  === hex.x && h.y - 1 === hex.y)
                ){
                   ret.push(h);
               }

        } else {
            if(
                (h.x + 1 === hex.x && h.y === hex.y) ||
                (h.x - 1 === hex.x && h.y === hex.y) ||
                (h.x + 1 === hex.x && h.y - 1 === hex.y) ||
                (h.x + 1 === hex.x && h.y + 1 === hex.y) ||
                (h.x  === hex.x && h.y + 1 === hex.y) ||
                (h.x  === hex.x && h.y - 1 === hex.y)
                ){
                   ret.push(h);
               }
        }
    }
    return ret;
}

export function offset_hexes(x:number, y:number, board: Board): Hex{
    let height: number = board.size * 2;
    let width: number = (Math.sqrt(3) / 2) * height;
    let center: Point = {x: width / 2,
                         y: height / 2};
    let origin: Point = {x: x * width,
                         y: y * (height * .75)};
    // offset even rows
    if(y % 2 == 0){
        origin.x = origin.x + (width /2 );
    }
    let hex: Hex = {
        x: x,
        y: y,
        center: center,
        origin: origin,
    };
    return hex;
}

export function generate_points(hex: Hex, board: Board): Hex{
    let points: Point[] = [];
    for(let i = 0; i < 6; i++){
        points.push(hex_corner(hex.center, board.size, i));
    }
    let point_string: string = points.map(point_to_string).join(' ');
    hex.points = points;
    hex.point_string = point_string;
    return hex;
}

function point_to_string(point: Point): string{
    return point.x + ',' + point.y;
}

function hex_corner(center: Point, size: number, i: number): Point{
    let angle_deg: number = 60 * i + 30;
    let angle_rad: number = Math.PI / 180 * angle_deg;
    let point: Point = {x: center.x + size * Math.cos(angle_rad),
                        y: center.y + size * Math.sin(angle_rad)}
    return point;
}
