import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class CommentsModal extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSignout() {
    this.props.signOut()
    this.props.hideModal()
  }

  redirectToStoryForm() {
    this.props.hideModal()
    this.props.history.push('/stories/new')
  }

  redirectToFeed() {
    this.props.hideModal()
    this.props.history.push('/feed')
  }

  render() {
    let { modal, hideModal, signOut } = this.props
    return !modal ? null : (
      <ul className='dropdown-list'>
        <li className='write-story'>
          <Link to='/stories/new' onClick={() => this.redirectToStoryForm()}>Write a story</Link>
        </li>
        <li>
          <Link to='/feed' onClick={() => this.redirectToFeed()}>Stories</Link>
        </li>
        <li className='sign-out'>
          <Link to='/' onClick={() => this.handleSignout()}>Sign Out</Link>
        </li>
      </ul>
    )
  }
}

export default withRouter(CommentsModal)