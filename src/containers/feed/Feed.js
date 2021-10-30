import React, { Component } from 'react';
import queryString from 'query-string'; //parses a query string like ?page=2
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import './Feed.css';

const ROOT_API = 'https://api.stackexchange.com/2.2/questions';
export default class Feed extends Component {
    // the state for this component extends props handed down by react-router..
    // ..this allows us access to sections of the url that we can use to fetch data
    constructor(props){ 
        super(props);
        const query = queryString.parse(props.location.search); // ?page=2 query will be {"page": "2"}
        this.state = {
            data: [],
            page: (query.page) ? parseInt(query.page, 10) : 1,
            loading: true,
            error: ''
        }
    }
    // This function fetches the data from the API, updates state
    async fetchAPI(page){
        try{
            const data = await fetch(
                `${ROOT_API}?order=desc&sort=activity&tagged=reactjs&site=stackoverflow${(page) ? `&page=${page}` : ''}`
                )

            const dataJSON = await data.json();
            if(dataJSON){
                this.setState({data: dataJSON,loading: false,});
            } 
        }catch(error){
            this.setState({loading:false, error:error.message});
        }
    }

    // After component mounts, fetch the data and update state with the data 
    componentDidMount(){
        const {page} = this.state;
        this.fetchAPI(page);
    }
    // If user presses next or previous bbutton the props.location.search will change
    // We want to refressh state with the new data when location.search changes
    componentDidUpdate(prevProps){
        if(prevProps.location.search !== this.props.location.search){
            const query=queryString.parse(this.props.location.search)
            this.setState({page:parseInt(query.page, 10)}, ()=>
                this.fetchAPI(this.state.page),
            );
        }
    }


    // display the data
    render(){
        const {data, page, loading, error} = this.state;
        const { match } = this.props;
        if(loading || error){
            return <div className="alert">{loading ? '...Loading': error}</div>
        }
        return(
            <div className="feedwrapper"> 
                {data.items.map(item=>
                    <Link 
                        key={item.question_id}
                        to = {`/questions/${item.question_id}`}>
                        <Card
                            key = {item.question_id} 
                            data = {item}
                        />
                    </Link>
                )}
                <div className="paginationbar">
                    {/* {page > 1 && <a href={`${match.url}?page=${page-1}`}>Previous</a>}
                    {data.has_more && <a href={`${match.url}?page=${page+1}`}>Next</a>} */}

                    {page > 1 && <Link to={`${match.url}?page=${page-1}`}>Previous</Link>}
                    {data.has_more && <Link to={`${match.url}?page=${page+1}`}>Next</Link>}
                </div>
            </div>
        );
    }
}