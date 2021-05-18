import { Component } from "react";
import axios from "axios";
import FriendButton from "./FriendButton";
import { Link } from "react-router-dom";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        // console.log("id: ", id);
        try {
            const { data } = await axios.get(`/other-user/${id}`);
            this.setState({
                firstName: data.first_name,
                lastName: data.last_name,
                imgUrl: data.img_url,
                bio: data.bio,
            });
        } catch (error) {
            console.log("error: ", error);
            this.props.history.push("/");
        }
    }

    render() {
        const { firstName, lastName, imgUrl, bio } = this.state;
        return (
            <>
                {/* <h1>User-Id is {this.props.match.params.id}</h1> */}
                <Link to={"/users"}>Back to search</Link>
                <img src={imgUrl} alt={`${firstName} ${lastName}`} />
                <h3>
                    {firstName} {lastName}
                </h3>
                <p>{bio}</p>
                <FriendButton id={this.props.match.params.id} />
            </>
        );
    }
}
