import React from 'react';

//const CellSize = 20;

//const CellColor = 'lightcoral';
const startFinshColor = 'red';

/*
const StartFinshColor = "blue";
const WallColor = 'black';
*/

class MazeCell{
    constructor(Xpos, Ypos){
        this.X = Xpos;
        this.Y = Ypos;

        this.TopWall = true;
        this.LeftWall = true;
        this.BottomWall = true;
        this.RightWall = true;
        this.Visted = false;

        this.StartFinsh = false;
        this.Path = false;
        this.BackTracked = false;

        //console.log("constructor,  Xpos: " + Xpos + " Ypos: " + Ypos);
    }

    Reset(){
        this.TopWall = true;
        this.LeftWall = true;
        this.BottomWall = true;
        this.RightWall = true;
        this.Visted = false;

        this.StartFinsh = false;
        this.Path = false;
        this.BackTracked = false;
    }

    Output(){
        const X = this.X;
        const Y = this.Y;
        const TopWall = this.TopWall;
        const LeftWall = this.LeftWall;
        const BottomWall = this.BottomWall;
        const RightWall = this.RightWall;
        
        //console.log("Xpos: " + X + " Ypos: " + Y);

        var uniquekey = X + "_" + Y;
        //console.log(uniquekey);
        const solid = "solid";
        const unset = "unset";

        var border_Top = unset;
        var border_Left = unset;
        var border_Bottom = unset;
        var border_Right = unset;

        var background_color = "white";

        if(TopWall){
            border_Top = solid;
        }
        if(LeftWall){
            border_Left = solid;
        }
        if(BottomWall){
            border_Bottom = solid;
        }
        if(RightWall){
            border_Right = solid;
        }     

        if(this.StartFinsh){
            background_color = startFinshColor;
        }else if(this.Path){
            background_color = "Green";
        }else if(this.BackTracked){
            background_color = "Grey";
        }else{
            background_color = "White";
        }
        

        /*
        if(this.Visted){
            background_color = "blue";
        }
        */
       
        return(
            <>
            <div className="maze_cell"
                key={uniquekey}
                id={uniquekey}
                style={{
                backgroundColor: `${background_color}`,
                borderTopStyle: `${border_Top}`,
                borderLeftStyle: `${border_Left}`,
                borderBottomStyle: `${border_Bottom}`,
                borderRightStyle: `${border_Right}`,
                position: "relative",
                gridRow: `${Y+1}`,
                gridColumn: `${X+1}`,
                
                }}>
            </div>
            </>
        );        
    }   
}

export default MazeCell