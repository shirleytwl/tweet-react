class Default extends React.Component {
    render(){
        return(
            <section>
                <Navbar/>
                <Content/>
            </section>
        )
    }
}
class Navbar extends React.Component {
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Tweedr</a>
            </nav>
        )
    }
}

class Content extends React.Component {
    render(){
        return (
            <div className="container">
                <Tweets></Tweets>
            </div>
        )
    }
}
class Tweets extends React.Component {
    render() {
        let tweetsDisplay = tweets.map( (tweet, index) => {
            return <Tweet tweet={tweet} key={index}></Tweet>
        });
        return (
            <div className="row">
                <div className="col-10 offset-1">
                    {tweetsDisplay}
                </div>
            </div>
        )
    }
}
class Tweet extends React.Component {
    render() {
        let tweet = this.props.tweet;
        let tweetDate = new Date(tweet.created_at);
        let diffMs = (new Date - tweetDate);
        let diffDays = Math.floor(diffMs / 86400000); // days
        let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
        let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let dateString;

        if (diffDays > 0) {
            dateString = `${months[tweetDate.getMonth()]} ${tweetDate.getDate()} `;
        }
        else {
            if (diffHrs > 0) {
                dateString = diffHrs + "h";
            }
            else {
                dateString = diffMins + " m";
            }
        }

        return (
            <div className="card my-3">
                <div className="row no-gutters">
                    <div className="col-md-2 p-3">
                        <img src={tweet.user.profile_image_url} className="img-fluid"/>
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <div className="tweet-info">
                                <span className="card-title">{tweet.user.name}</span>
                                <span className="tweet-handler">@{tweet.user.screen_name}</span>
                                ·
                                <span className="tweet-time">{dateString}</span>
                            </div>
                            <TweetMessage tweet={tweet}/>
                            <TweetBar tweet={tweet}></TweetBar>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class TweetMessage extends React.Component {
    render() {
        let tweet = this.props.tweet;
        let text = tweet.text;

        if (tweet.entities.urls.length) {
        }
        return (
            <p className="card-text">{text}</p>
        )
    }
}
class TweetBar extends React.Component {
    render(){
        let tweet = this.props.tweet;
        return (
            <div className="row">
                <div className="col-4">
                    <p>Retweets: {tweet.retweet_count}</p>
                </div>
                <div className="col-4">
                    <p>Favourites: {tweet.favorite_count}</p>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Default/>,
    document.getElementById('root')
);