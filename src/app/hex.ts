export interface Point {
    x: number;
    y: number;
}

export interface Hex {
    x: number;
    y: number;
    width: number;
    height: number;
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
    let letter_len = Math.ceil(hex.y / 26);
    let running_num = hex.y - 1;
    let letter: string = "";
    for(let i = 0; i < letter_len; i++){
        letter += String.fromCharCode(65 + (running_num % 26));
        running_num -= 26;
    }
    let num = hex.x * 2;
    if(hex.y % 2 != 0){
        num -= 1;
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

export function offset_hexes(x:number, y:number, size: number): Hex{
    let height: number = size * 2;
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
        width: width,
        height: height,
        center: center,
        origin: origin,
    };
    return hex;
}

export function generate_points(hex: Hex, size: number): Hex{
    let points: Point[] = [];
    for(let i = 0; i < 6; i++){
        points.push(hex_corner(hex.center, size, i));
    }
    let point_string: string = points.map(point_to_string).join(' ');
    hex.points = points;
    hex.point_string = point_string;
    return hex;
}

function point_to_string(point: Point): string{
    return point.x + ',' + point.y;
}

function hex_side(center: Point, size: number, i: number): Point{
    let angle_deg: number = 60 * i;
    let angle_rad: number = Math.PI / 180 * angle_deg;
    size = Math.sqrt(Math.pow(size, 2) - Math.pow((size / 2), 2))
    let point: Point = {x: center.x + size * Math.cos(angle_rad),
                        y: center.y + size * Math.sin(angle_rad)}
    return point;
}

function hex_corner(center: Point, size: number, i: number): Point{
    let angle_deg: number = 60 * i + 30;
    let angle_rad: number = Math.PI / 180 * angle_deg;
    let point: Point = {x: center.x + size * Math.cos(angle_rad),
                        y: center.y + size * Math.sin(angle_rad)}
    return point;
}
