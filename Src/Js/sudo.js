import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css"
import {Modal} from "bootstrap"
import scss from "../Scss/sudo.scss"

import { createApp } from 'vue'
const WinModal = new Modal('#Win');

createApp({
    data() {
        return {
            square: [
                [5, 3, 4, 6, 7, 8, 9, 1, 2],
                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                [3, 4, 5, 2, 8, 6, 1, 7, 9]
            ],
            AnsSquare:[
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            ShuffleNum: 40,
            Randing:false,
            RowCount: [...new Array(9)].map((arr) => {
                return new Array(10).fill(0);
            }),
            ColCount: [...new Array(9)].map((arr) => {
                return new Array(10).fill(0);
            }),
            SquareCount: [...new Array(9)].map((arr) => {
                return new Array(10).fill(0);
            })
        }
    },

    created(){
        for(let i =0;i<9;i++){
            for(let j = 0;j<9;j++){
                this.UpdateCount( i,j,"",this.square[i][j] );
            }
        }
    },
    methods: {
        IsRepeat(i,j){
            let num = this.square[i][j];

            let Row = this.RowCount[i][num] > 1;
            let Col = this.ColCount[j][num] > 1;
            let Square = this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)][num] > 1;

            // let Row = this.RowCount[i].some((num) => {
            //     return num > 1;
            // });                        
            // let Col = this.ColCount[j].some((num) => {
            //     return num > 1;
            // });                        
            // let Square = this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)].some((num) => {
            //     return num > 1;
            // });
            return Row || Col || Square;
        },
        SudoChange(i,j,k,after_num){
            let new_i = (i-1)*3 + (((k-1)/3) | 0 ) 
            let new_j = (j-1)*3 + ((k-1)%3) 
            let before_num = this.square[new_i][new_j];
            this.UpdateCount(new_i,new_j,before_num,after_num);
            this.square[new_i][new_j] = after_num;


            for(let i = 0 ;i<9;i++){
                for(let num = 1;num<10;num++){
                    if( 
                        this.RowCount[i][num]!=1 || 
                        this.ColCount[i][num]!=1 ||
                        this.SquareCount[i][num]!=1
                    ){
                        return;
                    }
                }
            }
            WinModal.show();
        },
        UpdateCount(i,j,before_num,after_num) {
            if( after_num !="" ){
                this.RowCount[i][after_num]++;
                this.ColCount[j][after_num]++;
                this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)][after_num]++;
            }
            if( before_num !="" ){
                this.RowCount[i][before_num]--;
                this.ColCount[j][before_num]--;
                this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)][before_num]--;
            }
        },
        DFSGenerate (i , j){
            if( i == 9 ){
                return true;
            }
            if( this.square[i][j]=='' ){
                for( let num = 1;num<10;num++ ){
                    //檢查是否有重複，不能使用isRepeat，因為用途不同
                    if( 
                        this.RowCount[i][num]!=0 || 
                        this.ColCount[j][num]!=0 || 
                        this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)][num]!=0
                    ){
                        continue;
                    }
                    this.square[i][j] = num;
                    this.UpdateCount(i,j,"",num);
                    if( this.DFSGenerate(i+ parseInt( (j+1)/9) , (j+1)%9 ) ){
                        return true;
                    }
                    this.square[i][j] = "";
                    this.UpdateCount(i,j,num,"");
                }

                return false;
            }
            else{
                return this.DFSGenerate(i+ parseInt( (j+1)/9) , (j+1)%9 );
            }
        },
        CaculateAns(){
            for(let i =0;i<9;i++){
                for(let j=0;j<9;j++){
                    if( this.AnsSquare[i][j] ){
                        this.UpdateCount(i,j,this.square[i][j],"");
                        this.square[i][j]="";

                    }
                }
            }
            this.DFSAns(0,0);
        },
        DFSAns( i , j ){
            if( i == 9 ){
                return true;
            }
            if( this.AnsSquare[i][j] ){
                for( let num = 1;num<10;num++ ){
                    //檢查是否有重複，不能使用isRepeat，因為用途不同
                    if( 
                        this.RowCount[i][num]!=0 || 
                        this.ColCount[j][num]!=0 || 
                        this.SquareCount[parseInt(i / 3) * 3 + parseInt(j / 3)][num]!=0
                    ){
                        continue;
                    }
                    this.square[i][j] = num;
                    this.UpdateCount(i,j,"",num);
                    if( this.DFSGenerate(i+ parseInt( (j+1)/9) , (j+1)%9 ) ){
                        return true;
                    }
                    this.square[i][j] = "";
                    this.UpdateCount(i,j,num,"");
                }
                return false;
            }
            else{
                return this.DFSGenerate(i+ parseInt( (j+1)/9) , (j+1)%9 );
            }
        },
        Randon() {
            let num = this.ShuffleNum;
            let GenerateRepeat = true;
            let OriginNumArray = [1,2,3,4,5,6,7,8,9]
            let GenerateCount = 0;
            this.Randing = true; // 顯示轉圈效果



            this.$nextTick( () => {
                setTimeout(()=>{
                    while( GenerateRepeat ){
                        //清空Count
                        this.RowCount = [...new Array(9)].map((arr) => {
                            return new Array(10).fill(0);
                        }),
                        this.ColCount = [...new Array(9)].map((arr) => {
                            return new Array(10).fill(0);
                        }),
                        this.SquareCount = [...new Array(9)].map((arr) => {
                            return new Array(10).fill(0);
                        })

                        //清空square
                        this.square = [...new Array(9)].map(( arr )=>{
                            return new Array(9).fill("");
                        })

                        for(let i =0;i<3;i++){
                            let RandonNumArray = _.shuffle(OriginNumArray);
                            for(let j = 0;j<9;j++){
                                this.square[ i*3 + parseInt(j/3) ][ i*3 + (j%3) ] = RandonNumArray[j];
                                this.UpdateCount( 
                                    i*3 + parseInt(j/3) , //i
                                    i*3 + (j%3) , //j
                                    "", //before_num
                                    RandonNumArray[j] //after_num
                                );
                            }
                        }
                        GenerateRepeat = !(this.DFSGenerate(0,0));
                    }
                    this.AnsSquare = [...new Array(9)].map(()=>{
                        return new Array(9).fill(0);
                    })
                    let ShuffleNum = this.ShuffleNum;
                    while( ShuffleNum!=81 ){
                        let rand_i = Math.round(Math.random()*8);
                        let rand_j = Math.round(Math.random()*8);
                        if( this.AnsSquare[rand_i][rand_j]==1 ){
                            continue;
                        }
                        this.AnsSquare[rand_i][rand_j] = 1;
                        let num = this.square[rand_i][rand_j];
                        this.UpdateCount(rand_i,rand_j,num , "");
                        this.square[rand_i][rand_j] = "";
                        ShuffleNum++;
                    }

                    this.Randing = false; // 關閉轉圈效果
                    
                })


            })
        }
    }
}).mount("#app");
