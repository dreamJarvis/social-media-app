import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

export default function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const { data: { getPost }={}} = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      postId: postId          //TODO why do we need variables ??
    }
  });

  function deletePostCallback(){
    props.history.push('/');
  }

  let postMarkup;
  if(!getPost){
    postMarkup = <p  className='loading'></p>
  }else{
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size="small"
              float="right"
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>

              <hr/>

              {/* Buttons */}
              <Card.Content>
                {/* like button */}
                <LikeButton user={user} post={{id, likeCount, likes}}/>
                
                {/* comment button */}
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={
                    () => console.log('Comment on Post!')
                  }
                >
                  <Button basic color='blue'>
                    <Icon name='comments'/>
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>

                {/* delete post button */}
                {
                  user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/>
                }
                
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    return postMarkup;
  }

  return (
    <div>
      
    </div>
  )
}

const FETCH_POSTS_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;
