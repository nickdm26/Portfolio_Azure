import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'

import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import MazeCell from './MazeCell.js';

var mazeHeight = 42;
var mazeWidth = 55;
var maze_stack2;
var maze_solver;
var EndPoint;

const max_mazeHeight = 45;
const max_mazeWidth = 70;

class Point {
    constructor(X_pos, Y_pos) {
        this.X = X_pos;
        this.Y = Y_pos;
    }
}

class Maze extends Component {
    constructor(props) {
        super(props);
                
        this.ResizeMaze();

        this.state = {
            maze_cell_array: this.BuildArray(),
            created: false,
        };

        maze_stack2 = [];
        maze_solver = [];
        EndPoint = new Point(mazeWidth - 1, mazeHeight - 1);
    }

    test(){
        maze_stack2.push(1);
        console.log(maze_stack2.pop())
    }

    ResizeMaze(){
        var width = window.innerWidth - 40;
        var height = window.innerHeight - 130;
        
        mazeWidth = Math.floor((width - 20) / 20);
        mazeHeight = Math.floor((height - 20) / 20);
        if(mazeWidth > max_mazeWidth){
            mazeWidth = max_mazeWidth;
        }

        if(mazeHeight > max_mazeHeight){
            mazeHeight = max_mazeHeight;
        }

        console.log("Size: " + mazeWidth + " x " + mazeHeight);
    }


    BuildArray() {
        const maze_cell_array = new Array(mazeWidth);
        for (let i = 0; i < mazeWidth; i++) {
            maze_cell_array[i] = [];
            for (let k = 0; k < mazeHeight; k++) {
                var tempMazeCell = new MazeCell(i, k);
                maze_cell_array[i].push(tempMazeCell);
            }
        }

        return maze_cell_array;
    }

    createMaze = () => {
        const { maze_cell_array } = this.state;
        let maze = [];

        for (let i = 0; i < mazeWidth; i++) {
            for (let k = 0; k < mazeHeight; k++) {
                maze.push(maze_cell_array[i][k].Output());
            }
        }

        return maze;
    }

    ResetMaze() {
        const { maze_cell_array } = this.state;

        for (let i = 0; i < mazeWidth; i++) {
            for (let k = 0; k < mazeHeight; k++) {
                maze_cell_array[i][k].Reset();
            }
        }
        this.setState(maze_cell_array);
    }

    Create() {
        this.ResetMaze();
        //var {maze_stack} = this.state;
        //var {maze_cell_array} = this.state;

        var CurrentCell = new Point(0, 0);
        maze_stack2.push(CurrentCell);
        //console.log(maze_stack2);
        this.RecursiveCreate(CurrentCell);
        this.setState({created: true});
    }

    RecursiveCreate(CurrentCell) {
        this.forceUpdate();
        var { maze_cell_array } = this.state;

        if (maze_stack2.length !== 0) {     //While there are unvisted Cells
            var Neighbours = this.CellUnVistedNeighbours(CurrentCell);

            if (Neighbours.length !== 0) {
                var randomNeighbour = Math.floor(Math.random() * Neighbours.length);
                var ChosenCell = Neighbours[randomNeighbour];
                maze_stack2.push(ChosenCell);

                this.RemoveWallBetween(CurrentCell, ChosenCell);
                CurrentCell = ChosenCell;
                maze_cell_array[CurrentCell.X][CurrentCell.Y].Visted = true;
            }
            else {
                CurrentCell = maze_stack2.pop();
            }
            this.RecursiveCreate(CurrentCell);
        }
    }


    /*
    RemoveWallBetween is used to remove the wall between the Current Cell and the chosen cell
    if statements used to figure out how the two cells are neighbouring each other.
    Once done it sets teh Booleans representing the walls to false between the Cells
    */
    RemoveWallBetween(Current, Chosen) {
        var { maze_cell_array } = this.state;
        if (Current.X < Chosen.X) {       //Current | Chosen 
            maze_cell_array[Current.X][Current.Y].RightWall = false;
            maze_cell_array[Chosen.X][Chosen.Y].LeftWall = false;
        }
        if (Current.X > Chosen.X) {       //Chosen | Current
            maze_cell_array[Current.X][Current.Y].LeftWall = false;
            maze_cell_array[Chosen.X][Chosen.Y].RightWall = false;
        }
        // Current
        if (Current.Y < Chosen.Y) {       // -------
            // Chosen
            maze_cell_array[Current.X][Current.Y].BottomWall = false;
            maze_cell_array[Chosen.X][Chosen.Y].TopWall = false;
        }
        // Chosen        
        if (Current.Y > Chosen.Y) {       // -------
            // Current
            maze_cell_array[Current.X][Current.Y].TopWall = false;
            maze_cell_array[Chosen.X][Chosen.Y].BottomWall = false;
        }
    }

    CellUnVistedNeighbours(pos) {
        var Left = new Point(pos.X - 1, pos.Y);
        var Right = new Point(pos.X + 1, pos.Y);
        var Top = new Point(pos.X, pos.Y - 1);
        var Bottom = new Point(pos.X, pos.Y + 1);   //Points of neighbouring Cells

        var UnvistedNeighbours = [];            //Array of UnVistedNeighbours
        var { maze_cell_array } = this.state;

        if (Left.X >= 0) {       //If in bounds
            if (maze_cell_array[Left.X][Left.Y].Visted !== true) {  //If not visited
                UnvistedNeighbours.push(Left);          //Add Neighbouring Cell Point to array
            }
        }
        if (Right.X < mazeWidth) {        //If in bounds
            if (maze_cell_array[Right.X][Right.Y].Visted !== true) {    //if not visited
                UnvistedNeighbours.push(Right);         //Add Neighbouring Cell Point to array
            }
        }
        if (Top.Y >= 0) {                //If in bounds
            if (maze_cell_array[Top.X][Top.Y].Visted !== true) {    //if not visited
                UnvistedNeighbours.push(Top);           //Add Neighbouring Cell Point to array
            }
        }
        if (Bottom.Y < mazeHeight) {       //If in bounds
            if (maze_cell_array[Bottom.X][Bottom.Y].Visted !== true) {  //if not visited
                UnvistedNeighbours.push(Bottom);        //Add Neighbouring Cell Point to array
            }
        }

        return UnvistedNeighbours;      //return the array of unvistedNeighbours
    }

    SolveMaze() {
        var { maze_cell_array } = this.state;
        if(!this.state.created){
            console.log("Maze Not created");
        }else{
            maze_cell_array[0][0].StartFinsh = true;
            maze_cell_array[EndPoint.X][EndPoint.Y].StartFinsh = true;
    
            var current = new Point(0, 0);
            maze_solver = [];
    
            for (let i = 0; i < mazeWidth; i++) {
                for (let k = 0; k < mazeHeight; k++) {
                    maze_cell_array[i][k].Visted = false;
                    maze_cell_array[i][k].Path = false;
                    maze_cell_array[i][k].BackTracked = false;
                }
            }
    
            maze_solver.push(current);
            this.forceUpdate();
    
            this.RecursiveSolver(current);
        }

        
    }

    RecursiveSolver(currentCell) {
        var { maze_cell_array } = this.state;

        if (!(currentCell.X === EndPoint.X && currentCell.Y === EndPoint.Y)) {
            var Neighbours = this.CellUnVistedNeighboursANDLegalMoves(currentCell);
            if (Neighbours.length !== 0) {
                var randomNeighbour = Math.floor(Math.random() * Neighbours.length);
                var ChosenCell = Neighbours[randomNeighbour];
                maze_solver.push(currentCell);
                currentCell = ChosenCell;
                maze_cell_array[currentCell.X][currentCell.Y].Visted = true;
                maze_cell_array[currentCell.X][currentCell.Y].Path = true;
            }
            else {
                maze_cell_array[currentCell.X][currentCell.Y].Path = false;
                maze_cell_array[currentCell.X][currentCell.Y].BackTracked = true;
                currentCell = maze_solver.pop();
            }

            setTimeout(() => {
                this.forceUpdate();
            }, 2);


            this.RecursiveSolver(currentCell);
            //this.forceUpdate();
        }
    }

    CellUnVistedNeighboursANDLegalMoves(pos) {
        var { maze_cell_array } = this.state;

        var Left = new Point(pos.X - 1, pos.Y);
        var Right = new Point(pos.X + 1, pos.Y);
        var Top = new Point(pos.X, pos.Y - 1);
        var Bottom = new Point(pos.X, pos.Y + 1);   //Points of neighbouring Cells

        var UnvistedNeighbours = [];            //Array of UnVistedNeighbours

        if (Left.X >= 0) {       //If in bounds
            if (maze_cell_array[Left.X][Left.Y].Visted !== true) {  //If not visited
                if (maze_cell_array[pos.X][pos.Y].LeftWall === false) {
                    UnvistedNeighbours.push(Left);          //Add Neighbouring Cell Point to array
                }
            }
        }
        if (Right.X < mazeWidth) {        //If in bounds
            if (maze_cell_array[Right.X][Right.Y].Visted !== true) {    //if not visited
                if (maze_cell_array[pos.X][pos.Y].RightWall === false) {
                    UnvistedNeighbours.push(Right);         //Add Neighbouring Cell Point to array
                }
            }
        }
        if (Top.Y >= 0) {                //If in bounds
            if (maze_cell_array[Top.X][Top.Y].Visted !== true) {    //if not visited
                if (maze_cell_array[pos.X][pos.Y].TopWall === false) {
                    UnvistedNeighbours.push(Top);           //Add Neighbouring Cell Point to array
                }
            }
        }
        if (Bottom.Y < mazeHeight) {       //If in bounds
            if (maze_cell_array[Bottom.X][Bottom.Y].Visted !== true) {  //if not visited
                if (maze_cell_array[pos.X][pos.Y].BottomWall === false) {
                    UnvistedNeighbours.push(Bottom);        //Add Neighbouring Cell Point to array
                }
            }
        }

        return UnvistedNeighbours;      //return the array of unvistedNeighbours
    }

    render() {
        var ttt = "repeat(" + mazeWidth + ", 20px)";

        return (
            <>
                <div className="maze_control_container">
                    <ButtonToolbar>
                        <Button variant="primary" onClick={() => this.Create()}>Create</Button>
                        <Button variant="primary" onClick={() => this.SolveMaze()}>Solve</Button>
                    </ButtonToolbar>
                </div>
                <div className="maze">
                    <div className="maze_container" style={{
                        gridTemplateColumns: `${ttt}`,
                    }}>
                        {this.createMaze()}

                    </div>
                </div>

            </>
        );
    }
}

export default Maze