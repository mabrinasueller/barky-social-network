import { Component } from "react";
import axios from "axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log("id: ", id);
        axios
            .get(`/other-user/${id}`)
            .then(({ data }) => {
                console.log("data: ", data);
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    imgUrl: data.img_url,
                    bio: data.bio,
                });
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    }

    render() {
        return (
            <>
                <h1>User-Id is </h1>
                <img src={this.state.imgUrl} />
                <h3>
                    {this.state.firstName} {this.state.lastName}
                </h3>
                <p>{this.state.bio}</p>
            </>
        );
    }
}
