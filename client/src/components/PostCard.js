import React from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({post :{ body, createdAt, id, username, likeCount, commentCount, likes, comments }}) {

  const likePost = ()=>{
    console.log('like post !!');
  }

  const commentOnPost = ()=>{
    console.log('commentd !!');
  }

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>
            <strong>{body}</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* like button  */}
          <Button as='div' labelPosition='right' onClick={likePost}>
            <Button color='teal' basic>
              <Icon name='heart' />
            </Button>
            <Label basic color='teal' pointing='left'>
              {likeCount}
            </Label>
          </Button>

          {/* Comment button */}
          <Button as='div' labelPosition='right' onClick={commentOnPost}>
            <Button color='blue' basic>
              <Icon name='comments'/>
            </Button>
            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </div>
  )
}

export default PostCard;