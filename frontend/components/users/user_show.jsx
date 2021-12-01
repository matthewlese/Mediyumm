import React from "react"
import { withRouter } from "react-router"
import UserRecipesIndexItem from "../recipe/user_recipes_index_item"
import { Link } from "react-router-dom"


class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      follow :{
        follower_id: this.props.currentUserId,
        followed_user_id: this.props.userId
      }
    }
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId)
  }

  myRecipes() {
    const recipes = this.props.user.recipes || []
    return(
      <ul className='users-recipes-list'>
        {
          recipes.map((recipe, i) => 
            <UserRecipesIndexItem key={i} recipe={recipe} className='users-recipes-list-item'/>
          )
        }
      </ul>
    )
  }

  toggleFollow() {
    let {followers, currentUserId, receivedFollows} = this.props
    let following = Boolean(followers[currentUserId])
    if (following) {
      let followToDelete = Object.values(receivedFollows).filter(follow => follow.follower_id === 1)[0]
      this.props.deleteFollow(followToDelete)
        .then(this.setState({
          following: false
        }))
    } else {
      this.props.createFollow(this.state.follow)
        .then(this.setState({
          following: true
        }))
    }
  }

  displayFollowButton() {
    let {followers, userId, currentUserId} = this.props
    let buttonText = followers[currentUserId] ? 'Following' : 'Follow'
    return (
      <button className='green-button' onClick={() => this.toggleFollow()}>{buttonText}</button>
    )
  }

  followerCount() {
    let {followers} = this.props
    let followersCount = Object.values(followers).length
    return(
      <div className='followerCount'>{`${followersCount} Followers`}</div>
    )
  }

  isSelf() {
    let {userId, currentUserId} = this.props
    return userId === currentUserId ? null : this.displayFollowButton()
  }

  render() {
    let { user, userId } = this.props
    if (!user) {
      return null
    }
    return(
      <div className='user-show'>
        <div className='user-show-header'>
          <h2 className='user-title'>{user.name}</h2>
          {this.followerCount()}
          {this.isSelf()}
          <Link to='/feed'>Feed</Link>
        </div>
        <br />
        {this.myRecipes()}
      </div>
    )
  }
}

export default withRouter(UserShow)