import React, { Component } from "react";

export default function ProfilePic({ firstName, lastName, imgUrl }) {
    console.log("props in Xmpl:", firstName, lastName, imgUrl);
    return (
        <div>
            <h2>
                Good to see you, {firstName} {lastName}
            </h2>
            <img className="profile-picture" src={imgUrl} />
        </div>
    );
}
