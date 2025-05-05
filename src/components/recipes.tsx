import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));
type Recipe = {
  Id: number;
  Name: string;
  Instructions: string[];
  Difficulty: number;
  Duration: number;
  Description: string;
  UserId: number;
  CategoryId: number;
  Img: string;
  Intrident: {
    Id:number;
    Name: number;
    Count: number;
    Type: string;
  }[]
};
const RecipeReviewCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getRecipes = async () => {
    try {
      var res = await axios.get("http://localhost:8080/api/recipe")
      setRecipes(res.data)
      console.log(res.data);
      console.log(recipes);    
      console.log("here");
      
    }
    catch (err) {
      console.error(err,"err2");

    }
  }
  useEffect(() => {
   getRecipes();   
  }, []); // ריק => רץ פעם אחת בעליית הקומפוננט

  // שלב 2: שליחת עדכון לשרת כאשר המתכונים משתנים
  /// useEffect(() => {
  //   if (recipes.length === 0) return; // לא לשמור אם אין מתכונים

  //   getRecipes();

  // }, [recipes]); // רץ כל שינוי במערך

  return (
    <>
    <h1>📖 מתכונים</h1>
  
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
      {recipes.map(r => (
        <Card key={r.Id} sx={{ borderRadius: 4, boxShadow: 3, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={r.Img}
            alt={r.Name}
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              {r.Name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', height: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {r.Description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', paddingX: 2 }}>
            <div>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                אופן ההכנה
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {/* {r.Method} נניח שיש לך שדה כזה במסד נתונים */}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  </>
  
  );
}
export default RecipeReviewCard;