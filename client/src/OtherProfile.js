import { Component } from "react";
import axios from "axios";

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
        return (
            <>
                <h1>User-Id is {this.props.match.params.id}</h1>
                <img
                    src={this.state.imgUrl}
                    alt={`${this.state.firstName} ${this.state.lastName}`}
                />
                <h3>
                    {this.state.firstName} {this.state.lastName}
                </h3>
                <p>{this.state.bio}</p>
            </>
        );
    }
}
