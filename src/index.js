import React from 'react';
import reactDom from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);        
    }
    
    render() {
        return <button className='square' onClick={()=>this.props.onclick()}>{this.props.name}</button>;
    }
}

class Board extends React.Component {
     

    generate_Square(i) {
        return <Square name={this.props.squar[i]} onclick={()=>this.props.handleClick(i)}/>
    }
//
    render() {
        
        return (
            <div>
                
             
            <div className='board-row'>
            {this.generate_Square(0)}
            {this.generate_Square(1)}
            {this.generate_Square(2)}
            </div>
            <div className='board-row'>
            {this.generate_Square(3)}
            {this.generate_Square(4)}
            {this.generate_Square(5)}
            </div>
            <div className='board-row'>
            {this.generate_Square(6)}
            {this.generate_Square(7)}
            {this.generate_Square(8)}
            </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares : new Array(9).fill(null),
                        isX:true}],
            squar_arr: new Array(9).fill(null),
            isX: true,
           
            
            

        };
    }

    //win index in array [[0,1,2],[0,3,6],[0,4,8],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[1,4,7],[2,4,6]]
    check_Winner(names) {
        const winner_index_arr = [[0,1,2],[0,3,6],[2,4,6],[0,4,8],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[1,4,7]];
        for(let i=0; i<winner_index_arr.length; i++) {
            let [a,b,c] = winner_index_arr[i];
            if(names[a]&&names[a] === names[b]&& names[a] === names[c]){
                return true;
            }
        }
    }

    handleClick(i) {
        let names = this.state.squar_arr.slice();
        if(this.state.squar_arr[i] != null|| this.check_Winner(names)) {
            return;
        }
        this.state.isX?names[i] = 'X':names[i] = 'O';
       
         
         this.setState({
             history: [...this.state.history,{squares: names,isX: this.state.isX}],
             squar_arr: names,
             isX: !this.state.isX,
             
         });
     }

     handleClick_His(index) {
        const his_arr = this.state.history.slice(0,index+1);
        this.setState({
            history: [...his_arr],
            squar_arr: this.state.history[index].squares,
            isX: !this.state.history[index].isX,
        });
     }

    create_His(index) {
       
        return <button key={index} onClick={()=>this.handleClick_His(index)}>{index}</button>
    }

    render_His() {
       let arr = this.state.history.map((item,index)=>this.create_His(index));
        return(
            <div>
            <div>{arr}</div>
            </div>
            
        );
    }
   

    render() {
        let status ;
        if(this.check_Winner(this.state.squar_arr)) {
            status = this.state.isX?'O is winner':'X is winner';
        } else if(!this.state.squar_arr.includes(null)){
            status = 'Drawn';
        } else {
           status = this.state.isX?"X Turn":"O Turn";
        }
        return (
            <div>
          
           

        <h3>{status}</h3>
        <Board squar={this.state.squar_arr} handleClick={(i)=>this.handleClick(i)} test={this.state.test}/>
        
        
        <div> {this.render_His()}</div>
        
        </div>
        );
    }
}
reactDom.render(<Game/>,document.getElementById('root'));