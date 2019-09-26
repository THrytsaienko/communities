import React from 'react';
import moment from 'moment';
import axios from 'axios';
import './ticketItem.scss';
import PROXY from "../../utils/utils";
import spinner from '../../assets/images/spinner.gif';

class TicketItem extends React.Component {
    constructor(){
        super();

        this.state = {
            comments: [],
            commentsCount: 0,
            questions: [],
            createdDate: null,
            opened: false,
            loading: true
        };

        this.openDetails = this.openDetails.bind(this);
    };

    openDetails(){
        const { parentId } = this.props.ticket;
        this.setState({
            opened: !this.state.opened
        });
        if(parentId != null){
            axios.get(`${PROXY}http://68.183.241.169/v0.1/communities/?parentId=${parentId}`, {
                headers: {
                    "parentId": parentId
                }
            })
                .then(resp => {
                    console.log(resp)
                    this.setState({
                        questions: resp.data['hydra:member'],
                        loading: false
                    });
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            this.setState({
                loading: false
            });
        }
    };

    componentDidMount() {
        const { parentId, mediaType, createdAt } = this.props.ticket;
        const createdDate = moment(new Date(createdAt)).format("DD.MM.YYYY");
        this.setState({createdDate});
        if(parentId != null){
            axios.get(`${PROXY}http://68.183.241.169/v0.1/communities/?parentId=${parentId}&mediaType=${mediaType}`)
                .then(resp => {
                    this.setState({
                        comments: resp.data['hydra:member'],
                        commentsCount: resp.data['hydra:totalItems']
                    });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    render(){
        const { ticket, number } = this.props;
        const { commentsCount, comments, questions, createdDate, loading } = this.state;
        return (
            <div onClick={this.openDetails} className='ticket'>
                <div className='ticket__container'>
                    <p className='ticket__count'>{number}</p>
                    <div className='ticket__content'>
                        <div className='ticket__block'>
                            <p className='ticket__title'>{ticket.title}</p>
                            <p className='ticket__date'>{createdDate}</p>
                        </div>

                        <div className='ticket__block'>
                            <p className='ticket__comments'>{commentsCount} comments</p>
                        </div>
                    </div>
                </div>
                {
                    !this.state.opened ?
                        null
                        :
                        <div className='ticket__details'>
                            <p className='ticket__text'>{ticket.content}</p>
                            {
                                commentsCount === 0 ?
                                    <p className='ticket__subtitle ticket__subtitle--empty'>There are no comments</p>
                                    :
                                    <p className='ticket__subtitle'>Comments:</p>
                            }
                            {
                                comments.map(comment => <p className='ticket__text' key={comment.id}>{comment.content}</p>)
                            }
                            <div>
                                {
                                    loading ?
                                        (<div className='ticket__spinner'>
                                            <img className='ticket__image' src={spinner} alt='Spinner' />
                                        </div>)
                                        :
                                        (<div>
                                                {
                                                    questions.length === 0 ?
                                                        <p className='ticket__subtitle ticket__subtitle--empty'>There are no questions </p>
                                                        :
                                                        <p className='ticket__subtitle'>All questions for this community: </p>
                                                }
                                                {
                                                    questions.map(question => <p className='ticket__text' key={question.id}>{question.title}</p>)
                                                }
                                        </div>
                                        )
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
};
export default TicketItem;
