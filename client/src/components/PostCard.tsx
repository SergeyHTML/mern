import React, {useCallback, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import {AuthContext} from "../context/AuthContext";
import {useDispatch} from "react-redux";
import {deletePost} from "../redux/actions";

export interface PostProps {
    _id: string;
    title: string;
    text: string;
    author: string;
    owner: string;
    data: Date;
}

const useStyles = makeStyles({
    root: {
        "height": '100%',
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
    },
    media: {
        height: 140,
    },
    shortText: {
        maxHeight: 100,
        overflow: 'hidden',
        '&>*:not(:first-child)': {
            display: 'none',
        }
    }
});

interface PostCardProps {
    post: PostProps;
}

const PostCard: React.FC<PostCardProps> = (props) => {
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();
    const {post} = props;

    const handleDelete = useCallback(() => {
        dispatch(deletePost(post._id, auth.token))
    }, [post._id, auth.token, dispatch])

    return (
        <Card className={classes.root}>
            {/*<CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
            />*/}
            <CardContent>
                <Typography variant="h5">
                    {post.title}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    author: {post.author}, date: {new Date(post.data).toLocaleDateString()}
                </Typography>
                <div className={classes.shortText}>
                    {ReactHtmlParser(post.text)}
                </div>

            </CardContent>
            <CardActions>
                <Button size="small" color="primary" component={Link} to={`/post/${post._id}`}>
                    Learn More
                </Button>
                {post.owner === auth.userId &&
                (
                    <>
                        <Button size="small" color="default" component={Link} to={`/post/${post._id}`}>
                            Edit
                        </Button>
                        <Button size="small" color="secondary" onClick={handleDelete}>
                            Delete
                        </Button>
                    </>
                )
                }
            </CardActions>
        </Card>
    );
}

export default PostCard
