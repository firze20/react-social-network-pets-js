import React from 'react';
import { fetchUserData, cancelFetch } from '../services/dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {

  constructor(props) {
        super(props);

        this.state = {
            userData: null
        }
    };

    componentDidMount() {
      this.loadUserData();
    }

    componentWillUnmount() {
        cancelFetch(this.fetchID);
    }

    componentDidUpdate(prevProps) {
        if(this.props.username !== prevProps.username) {
          cancelFetch(this.fetchID);
          this.loadUserData();
        }
    }

    loadUserData() {
        this.setState({
            userData: null
        });

        this.fetchID = fetchUserData(this.props.username, (userData) => {
          console.log(userData)
            this.setState({
                userData
            });
        });

        console.log(this.fetchID);
    }
  render() {
    let isLoading = this.state.userData === null ? true : false;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

     const name = isLoading ? 'Loading...' : this.state.userData.name;

        const bio = isLoading ? 'Loading...' : this.state.userData.bio;

        const friends = isLoading ? [] : this.state.userData.friends

        const profileImage = isLoading ? <p>Is Loading</p> : <img src={this.state.userData.profilePictureUrl} alt="" />

    return (
      <div className={className}>
        <div className="profile-picture">
          {profileImage}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}