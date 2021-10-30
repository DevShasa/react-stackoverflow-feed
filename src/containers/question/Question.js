import React, { Component } from 'react';
import "./Question.css";
import Card from '../../components/card/Card'

const ROOT_API = 'https://api.stackexchange.com/2.2/';

export default class Question extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            loading: true,
            error: ''
        }
    }
    // check for the id parameter and fetch the corresponding question
    // from the stack-overslow api 
    async componentDidMount(){
        // Extract match object from props, match is provided by the route component as...
        // .. a higher order component 
        const { match } = this.props 
        try {
            const data = await fetch(`${ROOT_API}questions/${match.params.id}?site=stackoverflow`,);
            const dataJSON = await data.json();

            if(dataJSON){
                this.setState({
                    data: dataJSON,
                    loading: false,
                });
            }
        } catch(error){
            this.setState({
                loading: true, 
                error: error.message,
            })
        }
    }

    render(){
        const { data, loading, error } = this.state;
        if(loading || error){
            return( 
                <div className="alert">
                    { loading ? 'Loading...': error}
                </div>);
        }
        console.log(data)
        return(
            <div className="question">
                <Card 
                    key = {data.items[0].question_id}
                    data = {data.items[0]}
                />
            </div>
        );
    }
}
