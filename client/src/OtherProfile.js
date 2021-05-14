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
        axios.get(`/other-user/${id}`).then(({ data }) => {
            console.log("data: ", data);
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                imgUrl: data.img_url,
                bio: data.bio,
            });
        });
    }

    render() {
        return (
            <>
                <h1>User-Id is </h1>
                <img src={this.state.imgUrl} />
                <h2>
                    {this.state.firstName} {this.state.lastName}
                </h2>
                <p>{this.state.bio}</p>
            </>
        );
    }
}
