import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export default function BookCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://www.centrmag.ru/catalog/ev_27_5_22_2_3d_p.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="Добавить в избранное">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Забронировать"
          // onClick={dialog.handleClickOpen()}
            >
          <BookmarkAddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
