export class MathAssignment {

    public ua1:boolean;
    public ua2:boolean;
    public ua3:boolean;
    public ua4:boolean;
    public score:number;
    public username:string;
    constructor(public name:string, public points:number, public problem:string, 
    public sol1:String, public sol2:String, public sol3:String, public sol4:String,
    public a1:boolean, public a2:boolean, public a3:boolean, public a4:boolean) {
        this.ua1 = false;
        this.ua2 = false;
        this.ua3 = false;
        this.ua4 = false;
    }


    public getscore() {
        if (this.ua1 === this.a1 && this.ua2 === this.a2 && this.ua3 === this.a3 && this.ua4 === this.a4) {
            this.score = this.points;
        } else {
            this.score = 0;
        }
        return this.score;
    }

}