import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class RecipesIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      imageFile: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push(`/recipes/${this.props.recipe.id}`)
  }

  redirectToShow() {
    let {recipe} = this.props
    console.log('in redirect', this.props)
    this.props.history.push(`/users/${recipe.author.id}`)
  }

  authorPhoto(author) {
    return author.photoUrl ? author.photoUrl : null //'https://mediyum-dev.s3.us-west-1.amazonaws.com/placeholder_user_image.png'
  }
  

render() {
    let {recipe} = this.props
    let {author} = this.props.recipe
    if (!recipe || !author) {
      return null
    }
    return(
      <li className='recipe-list-item'>
        <div className='recipe-info-wrapper'>
          <Link to={`/users/${author.id}`} className='author-link-wrapper'>
            <img className='author-photo' src={this.authorPhoto(author)} alt="img" />
            <div className='author-name'>{author.name}</div>
          </Link>
          <h3 onClick={() => this.handleClick()} className='recipe-item-title'>
            {this.props.recipe.title}
          </h3>
        </div>
      </li>
    )
  }
}

export default withRouter(RecipesIndexItem)