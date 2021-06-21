import React, { Component } from 'react';

import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import { getMergeSortAnimations } from './sortingAlgorthims.js';

const bar_color = 'lightcoral';
var array_size = 1000;
var max_arrayNumber = 800;


const ANIMATION_SPEED_MS = 1;
//const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';


class SortingVisualiser extends Component {
    constructor(props) {
        super(props);

        var div_width = window.innerWidth - 40
        array_size = div_width;

        this.state = {
            sorting_array: [],
            testarray: [],
        };
    }

    BuildArray() {
        array_size = window.innerWidth - 60;
        max_arrayNumber = window.innerHeight - 160;
        /*
        if(window.innerHeight < 800){
            max_arrayNumber = 600;
        }
        */
        const sorting_array = [];
        for (let i = 0; i < array_size; i++) {
            sorting_array.push(Math.floor(Math.random() * max_arrayNumber));
        }
        this.setState({ sorting_array });
    }

    resetColor() {
        const array_bars = document.getElementsByClassName("array_bar");
        for (let i = 0; i < array_bars.length; i++) {
            array_bars[i].style.backgroundColor = bar_color;
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.sorting_array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array_bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {

                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    mergeSortStart() {
        const sorting_array = this.state.sorting_array;
        this.mergeSort2(sorting_array);

    }

    mergeSort2(array) {
        var sorting_array = array;
        var left = [];
        var right = [];
        var result = [];

        if (sorting_array.length <= 1) {
            return result;
        }

        var midPoint = sorting_array.length / 2;
        //left = midPoint;

        if (sorting_array.length % 2 == 0) {
            midPoint = midPoint
        } else {
            midPoint = midPoint + 1;
        }

        //Left array
        for (let i = 0; i < midPoint; i++) {
            left.push(sorting_array[i]);
        }

        //right array
        for (let i = midPoint; i < sorting_array.length; i++) {
            right.push(sorting_array[i]);
        }

        left = this.mergeSort2(left);
        right = this.mergeSort2(right);
        result = this.merge(left, right);

    }

    merge(left, right) {
        //var totalLength = left.length + right.length;
        var result = [];
        var indexLeft = 0;
        var indexRight = 0;
        var indexResult = 0;

        while (indexLeft < left.length || indexRight < right.length) {
            if (indexLeft < left.length && indexRight < right.length) {
                if (left[indexLeft] <= right[indexRight]) {
                    result.push(left[indexLeft]);
                    indexLeft++;
                }
                else {
                    result.push(right[indexRight]);
                    indexRight++;
                }
            }else if(indexLeft < left.length){
                result.push(left[indexLeft]);
                indexLeft++;
            }else if(indexRight < right.length){
                result.push(right[indexRight]);
                indexRight++;
            }
        }
        return result;
    }

    BubbleSort() {
        const sorting_array = this.state.sorting_array;
        //var temp, i, j;
        let len = sorting_array.length;
        const array_bars = document.getElementsByClassName("array_bar");
        var count = 0;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                if (sorting_array[j] > sorting_array[j + 1]) {
                    let tmp = sorting_array[j];
                    sorting_array[j] = sorting_array[j + 1];
                    sorting_array[j + 1] = tmp;
                    count++;

                    setTimeout(() => {

                        let tmparray_bar = array_bars[j].style.height;
                        let tmparray_bar_value = array_bars[j].innerHTML;

                        array_bars[j].style.height = array_bars[j + 1].style.height;
                        array_bars[j + 1].style.height = tmparray_bar;

                        array_bars[j].innerHTML = array_bars[j + 1].innerHTML;
                        array_bars[j + 1].innerHTML = tmparray_bar_value;
                    }, i * ANIMATION_SPEED_MS);
                }
            }
        }
    }

    SelectionSort() {
        //console.log("Selection");
        const sorting_array = this.state.sorting_array;
        const array_bars = document.getElementsByClassName("array_bar");
        const swap_array = [];

        for (let i = 0; i < sorting_array.length - 1; i++) {
            var min_index = i;
            for (let k = i + 1; k < sorting_array.length; k++) {
                if (sorting_array[k] < sorting_array[min_index]) {
                    min_index = k;
                }
            }
            swap_array.push([min_index, i]);
            var temp = sorting_array[min_index];
            sorting_array[min_index] = sorting_array[i];
            sorting_array[i] = temp;


        }

        for (let i = 0; i < swap_array.length; i++) {
            setTimeout(() => {
                //let temp_array_bar = array_bars[min_index].style.height;
                //let temp_array_bar_value = array_bars[min_index].innerHTML;
                var min = swap_array[i][0];
                var k = swap_array[i][1];
                //console.log(min);

                let temp_array_bar = array_bars[min].style.height;
                array_bars[min].style.height = array_bars[k].style.height;
                array_bars[k].style.height = temp_array_bar;
            }, i * ANIMATION_SPEED_MS);
        }
        //console.log("finshed");
        //console.log("Selection Sort Swaps: " + swap_array.length);
    }

    StartQuickSort() {
        const sorting_array = this.state.sorting_array;
        const swap_array = [];
        const array_bars = document.getElementsByClassName("array_bar");

        this.QuickSort(sorting_array, 0, sorting_array.length - 1, swap_array);
        //this.setState(sorting_array);

        for (let i = 0; i < swap_array.length; i++) {
            setTimeout(() => {
                //let temp_array_bar = array_bars[min_index].style.height;
                //let temp_array_bar_value = array_bars[min_index].innerHTML;
                var min = swap_array[i][0];
                var k = swap_array[i][1];

                let temp_array_bar = array_bars[min].style.height;
                array_bars[min].style.height = array_bars[k].style.height;
                array_bars[k].style.height = temp_array_bar;
            }, i * ANIMATION_SPEED_MS);
        }
        //console.log("Quick Sort swaps: " + swap_array.length);
    }

    QuickSort(array, low, high, swap_array) {
        if (low < high) {
            var index = this.QuickSortPartition(array, low, high, swap_array);

            this.QuickSort(array, low, index - 1, swap_array);
            this.QuickSort(array, index + 1, high, swap_array);
        }
    }

    QuickSortPartition(array, low, high, swap_array) {
        var pivot = array[high];
        var i = (low - 1);
        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                swap_array.push([i, j]);
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        swap_array.push([i + 1, high])
        var temp1 = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp1;
        return i + 1;
    }

    InsertionSort() {
        const sorting_array = this.state.sorting_array;
        const swap_array = [];
        const array_bars = document.getElementsByClassName("array_bar");

        var len = sorting_array.length;
        for (let i = 1; i < len; ++i) {
            var key = sorting_array[i];
            //var keyindex = i;
            var j = i - 1;

            while (j >= 0 && sorting_array[j] > key) {
                swap_array.push([j + 1, j]);
                sorting_array[j + 1] = sorting_array[j];
                j = j - 1;
            }
            //swap_array.push([j+ 1, i]);
            sorting_array[j + 1] = key;
        }

        for (let i = 0; i < swap_array.length; i++) {
            setTimeout(() => {
                //let temp_array_bar = array_bars[min_index].style.height;
                //let temp_array_bar_value = array_bars[min_index].innerHTML;
                var min = swap_array[i][0];
                var k = swap_array[i][1];

                let temp_array_bar = array_bars[min].style.height;
                array_bars[min].style.height = array_bars[k].style.height;
                array_bars[k].style.height = temp_array_bar;
            }, i * ANIMATION_SPEED_MS);
        }
        //console.log("Insertion Sort swaps: " + swap_array.length);
    }

    check() {
        const sorting_array = this.state.sorting_array;
        var isSorted = true;
        for (let i = 0; i < sorting_array.length; i++) {
            if (sorting_array[i] > sorting_array[i + 1]) {
                isSorted = false;
            }
        }
        console.log("Is it sorted: " + isSorted);
    }

    componentDidMount() {
        this.BuildArray();
    }

    render() {
        const { sorting_array } = this.state;


        //   <Button variant="primary" onClick={() => this.mergeSort()}>Merge Sort</Button>
        // <Button variant="primary" onClick={() => this.mergeSortStart()}>Test</Button>

        return (
            <>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.BuildArray() & this.resetColor()}>New Array</Button>
                    <Button variant="primary" onClick={() => this.BubbleSort()}>Bubble Sort</Button>
                    <Button variant="primary" onClick={() => this.SelectionSort()}>Selection Sort</Button>
                    <Button variant="primary" onClick={() => this.StartQuickSort()}>QuickSort</Button>
                    <Button variant="primary" onClick={() => this.InsertionSort()}>Insertion Sort</Button>
                    
                </ButtonToolbar>

                <div className="array_container">
                    {sorting_array.map((value, index) => (
                        <div className="array_bar"
                            key={index}
                            style={{
                                backgroundColor: bar_color,
                                height: `${value}px`,
                            }}>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    randomNumber() {
        return Math.floor(Math.random() * 1000)
    }
}

export default SortingVisualiser